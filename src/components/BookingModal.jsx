import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useBooking } from '../context/BookingContext';
import { SALON_INFO } from '../data/salonData';

const BookingModal = () => {
  const { isOpen, closeBooking, initialService } = useBooking();
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: 'Ramtek',
    service: initialService || '',
    date: '',
    time: ''
  });

  // Sync initialService when it changes (if modal opened via a specific package)
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Animate in
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(modalRef.current, 
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleClose = () => {
    // Animate out
    gsap.to(modalRef.current, { y: 30, opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: closeBooking });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const buildWhatsAppMessage = () => {
    const { name, phone, location, service, date, time } = formData;
    let message = `Hi! I would like to book an appointment.\n\n`;
    if (name) message += `*Name:* ${name}\n`;
    if (phone) message += `*Phone:* ${phone}\n`;
    message += `*Location:* ${location} Branch\n`;
    if (service) message += `*Service/Package:* ${service}\n`;
    if (date) message += `*Preferred Date:* ${date}\n`;
    if (time) message += `*Preferred Time:* ${time}\n`;
    
    return encodeURIComponent(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://wa.me/${SALON_INFO.whatsapp}?text=${buildWhatsAppMessage()}`;
    window.open(url, '_blank');
    handleClose();
    // Reset form after a slight delay
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        location: 'Ramtek',
        service: '',
        date: '',
        time: ''
      });
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
        className="relative w-full max-w-lg bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-2xl shadow-2xl shadow-[#D4AF37]/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#D4AF37]/10 bg-[#111]">
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 font-sans">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold ml-1">Your Name *</label>
              <input 
                type="text" 
                name="name" 
                required
                value={formData.name} 
                onChange={handleChange}
                className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder:text-gray-600"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold ml-1">Mobile Number *</label>
              <input 
                type="tel" 
                name="phone" 
                required
                value={formData.phone} 
                onChange={handleChange}
                className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder:text-gray-600"
                placeholder="+91..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold ml-1">Select Branch *</label>
            <div className="grid grid-cols-2 gap-3">
               <label className={`cursor-pointer border rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                 formData.location === 'Ramtek' 
                   ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' 
                   : 'bg-[#111] border-[#333] text-gray-400 hover:border-gray-500'
               }`}>
                 <input type="radio" name="location" value="Ramtek" className="hidden" onChange={handleChange} checked={formData.location === 'Ramtek'} />
                 Ramtek
               </label>
               <label className={`cursor-pointer border rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                 formData.location === 'Nagardhan' 
                   ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' 
                   : 'bg-[#111] border-[#333] text-gray-400 hover:border-gray-500'
               }`}>
                 <input type="radio" name="location" value="Nagardhan" className="hidden" onChange={handleChange} checked={formData.location === 'Nagardhan'} />
                 Nagardhan
               </label>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold ml-1">Service / Package Required *</label>
            <input 
              type="text" 
              name="service" 
              required
              value={formData.service} 
              onChange={handleChange}
              className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder:text-gray-600"
              placeholder="e.g. Haircut, The Royal Grooming, Tattoo..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold ml-1">Preferred Date</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange}
                className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all [color-scheme:dark]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold ml-1">Preferred Time</label>
              <input 
                type="time" 
                name="time" 
                value={formData.time} 
                onChange={handleChange}
                className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="pt-4">
             <button 
               type="submit"
               className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-black font-bold font-space px-6 py-4 rounded-xl text-sm sm:text-base hover:bg-[#1EBE5D] transition-all hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] tracking-wider"
             >
               <FaWhatsapp size={20} /> SEND BOOKING TO WHATSAPP
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
