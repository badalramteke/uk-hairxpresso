import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { X, ChevronDown, AlertCircle, Clock } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useBooking } from '../context/BookingContext';
import { SALON_INFO, BOOKABLE_SERVICES } from '../data/salonData';

// ─── Security: Booking Window Logic ───────────────────────────
// Customers can ONLY book for tomorrow.
// Booking window opens at 9:00 PM today → closes at end of tomorrow.
// Example: At 9 PM Friday, you can book for Saturday.
//          Before 9 PM Friday, you cannot book for Saturday yet.

function getBookingWindow() {
  const now = new Date();
  const hour = now.getHours();

  // Tomorrow's date
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Format as YYYY-MM-DD
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // Today's date
  const todayStr = now.toISOString().split('T')[0];

  // Is booking window currently open? (after 9 PM today)
  const isWindowOpen = hour >= 21;

  return {
    bookableDate: tomorrowStr,
    todayDate: todayStr,
    isWindowOpen,
    openTime: '9:00 PM',
    currentHour: hour,
  };
}

// ─── Security: Rate Limiter ───────────────────────────────────
// Prevent spam submissions (max 3 per 10 minutes)
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS = 3;

function checkRateLimit() {
  try {
    const key = 'ukh_booking_timestamps';
    const raw = sessionStorage.getItem(key);
    const timestamps = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    // Remove old entries
    const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
    if (recent.length >= MAX_SUBMISSIONS) {
      return false; // rate limited
    }
    recent.push(now);
    sessionStorage.setItem(key, JSON.stringify(recent));
    return true;
  } catch {
    return true; // fail open — don't block if sessionStorage fails
  }
}

const BookingModal = () => {
  const { isOpen, closeBooking, initialService } = useBooking();
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: initialService || '',
    date: '',
    time: ''
  });

  const [errors, setErrors] = useState({});
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const dropdownRef = useRef(null);

  const bookingWindow = useMemo(() => getBookingWindow(), [isOpen]);

  // Sync initialService when it changes (if modal opened via a specific package)
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Auto-set the date to tomorrow
      setFormData(prev => ({
        ...prev,
        date: bookingWindow.bookableDate,
      }));
      // Animate in
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(modalRef.current, 
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, bookingWindow.bookableDate]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowServiceDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, { y: 30, opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: closeBooking });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const selectService = (serviceName) => {
    setFormData(prev => ({ ...prev, service: serviceName }));
    setShowServiceDropdown(false);
    if (errors.service) {
      setErrors(prev => ({ ...prev, service: '' }));
    }
  };

  // ─── Security: Sanitize input — strip HTML tags, control chars, limit length ───
  const sanitize = (str) => str.replace(/<[^>]*>/g, '').replace(/[\x00-\x1F\x7F]/g, '').replace(/[{}()[\]<>]/g, '').trim().slice(0, 200);

  // ─── Security: Validate all form fields ───
  const validate = () => {
    const newErrors = {};

    // Name validation
    const cleanName = sanitize(formData.name);
    if (!cleanName || cleanName.length < 2) {
      newErrors.name = 'Please enter a valid name';
    }
    if (/[<>{}()[\]]/.test(formData.name)) {
      newErrors.name = 'Name contains invalid characters';
    }

    // Phone validation — only digits, +, spaces, dashes
    const phoneClean = formData.phone.replace(/[^\d+\-\s]/g, '');
    if (phoneClean.length < 10 || phoneClean.length > 15) {
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = 'Please select a service or package';
    }

    // Date validation — must be tomorrow
    if (formData.date !== bookingWindow.bookableDate) {
      newErrors.date = 'Booking is only available for tomorrow';
    }

    // Booking window validation — must be after 9 PM
    if (!bookingWindow.isWindowOpen) {
      newErrors.date = `Booking opens at ${bookingWindow.openTime} today`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildWhatsAppMessage = () => {
    const name = sanitize(formData.name);
    const phone = sanitize(formData.phone);
    const service = sanitize(formData.service);
    const { date, time } = formData;
    let message = `Hi! I would like to book an appointment.\n\n`;
    if (name) message += `*Name:* ${name}\n`;
    if (phone) message += `*Phone:* ${phone}\n`;
    message += `*Branch:* Ramtek\n`;
    if (service) message += `*Service/Package:* ${service}\n`;
    if (date) message += `*Preferred Date:* ${date}\n`;
    if (time) message += `*Preferred Time:* ${time}\n`;
    
    return encodeURIComponent(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Security: Rate limit check
    if (!checkRateLimit()) {
      setRateLimited(true);
      return;
    }

    // Validate
    if (!validate()) return;

    const url = `https://wa.me/${SALON_INFO.whatsapp}?text=${buildWhatsAppMessage()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    handleClose();
    // Reset form after a slight delay
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        service: '',
        date: '',
        time: ''
      });
      setErrors({});
      setRateLimited(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
        onClick={handleClose}
      />

      {/* Modal */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-lg bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-2xl shadow-2xl shadow-[#D4AF37]/10 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#D4AF37]/10 bg-[#111] sticky top-0 z-10">
          <div>
            <h3 className="text-xl sm:text-2xl font-cormorant font-bold text-white">Book Appointment</h3>
            <p className="text-xs sm:text-sm text-gray-400 font-sans mt-1">Fill details to send via WhatsApp</p>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Booking Window Notice */}
        <div className={`mx-5 sm:mx-6 mt-4 px-4 py-3 rounded-xl border text-xs font-sans flex items-start gap-2.5 ${
          bookingWindow.isWindowOpen
            ? 'bg-[#D4AF37]/5 border-[#D4AF37]/20 text-[#D4AF37]'
            : 'bg-red-500/5 border-red-500/20 text-red-400'
        }`}>
          <Clock size={14} className="mt-0.5 shrink-0" />
          <div>
            {bookingWindow.isWindowOpen ? (
              <p>✅ Booking window is open! You are booking for <strong>tomorrow ({bookingWindow.bookableDate})</strong>.</p>
            ) : (
              <p>⏳ Booking for tomorrow opens at <strong>9:00 PM tonight</strong>. Please come back after 9 PM to book your appointment. Walk-ins are always welcome!</p>
            )}
          </div>
        </div>

        {/* Rate Limit Warning */}
        {rateLimited && (
          <div className="mx-5 sm:mx-6 mt-3 px-4 py-3 rounded-xl border bg-red-500/5 border-red-500/20 text-red-400 text-xs font-sans flex items-start gap-2.5">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <p>Too many booking attempts. Please wait 10 minutes before trying again.</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 font-sans" autoComplete="off">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold ml-1">Your Name *</label>
              <input 
                type="text" 
                name="name" 
                required
                value={formData.name} 
                onChange={handleChange}
                className={`w-full bg-[#111] border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder:text-gray-600 ${
                  errors.name ? 'border-red-500' : 'border-[#333]'
                }`}
                placeholder="Your full name"
                maxLength={100}
                autoComplete="off"
              />
              {errors.name && <p className="text-red-400 text-[10px] ml-1">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold ml-1">Mobile Number *</label>
              <input 
                type="tel" 
                name="phone" 
                required
                value={formData.phone} 
                onChange={handleChange}
                className={`w-full bg-[#111] border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder:text-gray-600 ${
                  errors.phone ? 'border-red-500' : 'border-[#333]'
                }`}
                placeholder="+91..."
                maxLength={15}
                pattern="[0-9+\-\s]{10,15}"
                autoComplete="off"
              />
              {errors.phone && <p className="text-red-400 text-[10px] ml-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Branch — Single (Ramtek only) */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold ml-1">Branch</label>
            <div className="flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37] rounded-xl py-3 px-4">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="text-sm font-semibold text-[#D4AF37]">📍 Ramtek Branch</span>
              <span className="ml-auto text-[10px] text-[#D4AF37]/60 font-space uppercase tracking-wider">Only Branch</span>
            </div>
          </div>

          {/* Service / Package Dropdown */}
          <div className="space-y-1.5 relative" ref={dropdownRef}>
            <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold ml-1">Service / Package *</label>
            <button
              type="button"
              onClick={() => setShowServiceDropdown(!showServiceDropdown)}
              className={`w-full bg-[#111] border rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between transition-all focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 ${
                errors.service ? 'border-red-500' : 'border-[#333]'
              } ${formData.service ? 'text-white' : 'text-gray-600'}`}
            >
              <span className="truncate">{formData.service || 'Select a service or package...'}</span>
              <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 shrink-0 ml-2 ${showServiceDropdown ? 'rotate-180' : ''}`} />
            </button>
            {errors.service && <p className="text-red-400 text-[10px] ml-1">{errors.service}</p>}

            {/* Dropdown */}
            {showServiceDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#111] border border-[#D4AF37]/20 rounded-xl shadow-2xl shadow-black/50 z-50 max-h-64 overflow-y-auto"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#D4AF37 #111' }}>
                {BOOKABLE_SERVICES.map((group) => (
                  <div key={group.group}>
                    <p className="px-4 py-2 text-[10px] font-space font-bold uppercase tracking-widest text-[#D4AF37] bg-[#0a0a0a] sticky top-0 border-b border-[#D4AF37]/10">
                      {group.group}
                    </p>
                    {group.items.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => selectService(item)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] ${
                          formData.service === item ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-gray-400'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold ml-1">Date (Tomorrow)</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange}
                min={bookingWindow.bookableDate}
                max={bookingWindow.bookableDate}
                className={`w-full bg-[#111] border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all [color-scheme:dark] ${
                  errors.date ? 'border-red-500' : 'border-[#333]'
                }`}
                disabled={!bookingWindow.isWindowOpen}
              />
              {errors.date && <p className="text-red-400 text-[10px] ml-1">{errors.date}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold ml-1">Preferred Time</label>
              <input 
                type="time" 
                name="time" 
                value={formData.time} 
                onChange={handleChange}
                min="09:00"
                max="21:00"
                className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all [color-scheme:dark]"
                disabled={!bookingWindow.isWindowOpen}
              />
              <p className="text-gray-600 text-[9px] ml-1">Salon hours: 9 AM – 9 PM</p>
            </div>
          </div>

          <div className="pt-4">
             <button 
               type="submit"
               disabled={!bookingWindow.isWindowOpen || rateLimited}
               className={`w-full flex items-center justify-center gap-2 font-bold font-space px-6 py-4 rounded-xl text-sm sm:text-base transition-all tracking-wider ${
                 bookingWindow.isWindowOpen && !rateLimited
                   ? 'bg-[#25D366] text-black hover:bg-[#1EBE5D] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] cursor-pointer'
                   : 'bg-gray-700 text-gray-400 cursor-not-allowed'
               }`}
             >
               <FaWhatsapp size={20} />
               {bookingWindow.isWindowOpen ? 'SEND BOOKING TO WHATSAPP' : `BOOKING OPENS AT 9 PM`}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
