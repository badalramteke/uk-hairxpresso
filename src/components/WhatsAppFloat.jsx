import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaWhatsapp } from 'react-icons/fa';
import { X } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const WhatsAppFloat = () => {
  const { openBooking } = useBooking();
  const [showPopup, setShowPopup] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  // Button entrance — delayed bounce
  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current,
        { scale: 0, rotation: -90 },
        { scale: 1, rotation: 0, duration: 0.7, delay: 3, ease: 'back.out(2)' }
      );
    }
  }, []);

  // Auto show popup after 5s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setShowPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  // Popup animation
  useEffect(() => {
    if (showPopup && popupRef.current) {
      gsap.fromTo(popupRef.current,
        { scale: 0.7, opacity: 0, y: 20, transformOrigin: 'bottom right' },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.8)' }
      );
    }
  }, [showPopup]);

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (popupRef.current) {
      gsap.to(popupRef.current, {
        scale: 0.7, opacity: 0, y: 10, duration: 0.3, ease: 'power3.in',
        onComplete: () => { setShowPopup(false); setDismissed(true); }
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      {/* Popup */}
      {showPopup && (
        <div ref={popupRef}
          className="bg-[#111111] border border-[#D4AF37]/25 rounded-2xl p-4 shadow-2xl shadow-black/50 w-64 relative"
          style={{ opacity: 0 }}>
          <button onClick={handleDismiss}
            className="absolute top-2 right-2 text-gray-500 hover:text-white transition-colors p-1" aria-label="Close popup">
            <X size={14} />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <FaWhatsapp size={20} className="text-[#25D366]" />
            </div>
            <div>
              <p className="text-white text-sm font-bold font-dm">UK HairXpresso</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <p className="text-green-400 text-[10px] font-dm">Replies instantly</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-xl rounded-tl-sm p-3 mb-3 border border-[#222]">
            <p className="text-gray-400 text-sm font-dm leading-relaxed">
              Hi! Ready for a fresh look? Book now and get <span className="text-[#D4AF37] font-semibold">premium grooming</span> at Ramtek's best salon! ✂️
            </p>
            <p className="text-gray-700 text-[10px] mt-1.5 text-right font-dm">Just now</p>
          </div>

          <button onClick={() => { handleDismiss({preventDefault:()=>{}, stopPropagation:()=>{}}); openBooking(); }}
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-black font-bold py-2.5 rounded-xl text-sm hover:bg-[#1EBE5D] transition-all duration-300 font-dm">
            <FaWhatsapp size={16} /> Book Your Slot
          </button>
        </div>
      )}

      {/* Float Button */}
      <button ref={buttonRef} onClick={() => openBooking()}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl whatsapp-pulse cursor-pointer
                   hover:scale-110 transition-transform duration-300"
        style={{ transform: 'scale(0)' }} aria-label="Book via WhatsApp">
        <FaWhatsapp size={28} className="text-white" />
      </button>
    </div>
  );
};

export default WhatsAppFloat;
