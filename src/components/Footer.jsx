import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, Heart } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaGoogle } from 'react-icons/fa';
import { SALON_INFO } from '../data/salonData';
import { splitChars, mStart, isMobile } from '../utils/gsapAnimations';
import { useBooking } from '../context/BookingContext';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const ref = useRef(null);
  const { openBooking } = useBooking();
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: 'Services & Packages', href: '#services' },
    { label: 'Offers & Discounts', href: '#offers' },
    { label: 'Photo Gallery', href: '#gallery' },
    { label: 'Our Team', href: '#team' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA banner
      gsap.fromTo('.footer-cta', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.footer-cta', start: mStart(), once: true } });

      // CTA title — char-by-char on desktop, block on mobile
      if (isMobile()) {
        gsap.set('.ft-cta-char', { opacity: 1, y: 0, rotateX: 0 });
      } else {
        gsap.fromTo('.ft-cta-char', { y: 20, opacity: 0, rotateX: -20 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.015, duration: 0.35, ease: 'power2.out',
          scrollTrigger: { trigger: '.footer-cta', start: mStart(), once: true } });
      }

      // CTA button
      gsap.fromTo('.ft-cta-btn', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, delay: 0.15, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.footer-cta', start: mStart(), once: true } });

      // Footer columns
      ScrollTrigger.batch('.footer-col', {
        start: mStart(), once: true,
        onEnter: (batch) => gsap.fromTo(batch, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out' })
      });

      // Social icons
      ScrollTrigger.batch('.social-icon', {
        start: mStart(), once: true,
        onEnter: (batch) => gsap.fromTo(batch, { scale: 0 }, { scale: 1, stagger: 0.05, duration: 0.3, ease: 'back.out(1.5)' })
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer ref={ref} className="bg-[#050505] border-t border-[#D4AF37]/10">
      {/* Pre-footer CTA */}
      <div className="footer-cta" style={{ opacity: 0, background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)' }}>
        <div className="max-w-4xl mx-auto text-center py-12 px-4">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-cormorant font-bold text-black mb-3" style={{ perspective: '600px' }}>
            {splitChars('Ready for a Premium Look?', 'ft-cta-char')}
          </h3>
          <p className="text-black/60 mb-6">Book your appointment now via WhatsApp — it's quick and easy!</p>
          <button onClick={() => openBooking()}
            className="ft-cta-btn inline-flex items-center gap-3 bg-black text-[#D4AF37] font-bold px-8 py-4 rounded-full hover:bg-[#111] hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all font-space text-sm tracking-widest"
            style={{ opacity: 0 }}>
            <FaWhatsapp size={20} /> BOOK NOW ON WHATSAPP
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="footer-col" style={{ opacity: 0 }}>
            <img src="/images/logo_and_name.jpg" alt="UK HairXpresso" className="h-14 w-auto object-contain mb-4 rounded-lg" />
            <p className="text-gray-500 text-sm leading-relaxed mb-5">Premium Unisex Salon in Ramtek, Maharashtra. Where style meets luxury.</p>
            <div className="flex items-center gap-3">
              <a href={SALON_INFO.instagramUrl} target="_blank" rel="noopener noreferrer"
                className="social-icon w-9 h-9 rounded-full bg-[#111] border border-[#D4AF37]/15 flex items-center justify-center text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37]/60 transition-all"
                style={{ transform: 'scale(0)' }}><FaInstagram size={16} /></a>
              <button onClick={() => openBooking()}
                className="social-icon w-9 h-9 rounded-full bg-[#111] border border-[#D4AF37]/15 flex items-center justify-center text-gray-500 hover:text-[#25D366] hover:border-green-500/40 transition-all"
                style={{ transform: 'scale(0)' }}><FaWhatsapp size={16} /></button>
              <a href={SALON_INFO.googleReviewUrl} target="_blank" rel="noopener noreferrer"
                className="social-icon w-9 h-9 rounded-full bg-[#111] border border-[#D4AF37]/15 flex items-center justify-center text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37]/60 transition-all"
                style={{ transform: 'scale(0)' }}><FaGoogle size={14} /></a>
            </div>
          </div>

          <div className="footer-col" style={{ opacity: 0 }}>
            <h4 className="text-white font-bold font-cormorant text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}><a href={l.href} onClick={(e) => handleClick(e, l.href)}
                  className="text-gray-500 hover:text-[#D4AF37] text-sm transition-colors relative after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-0 after:h-px after:bg-[#D4AF37] after:transition-all hover:after:w-full">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col" style={{ opacity: 0 }}>
            <h4 className="text-white font-bold font-cormorant text-lg mb-5">Ramtek Branch</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2"><MapPin size={14} className="text-[#D4AF37] mt-0.5 shrink-0" /><p className="text-gray-500 text-sm">Old Blue Tick Café, Near KITS College, Mauda Road, Ramtek</p></div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-[#D4AF37] shrink-0" /><a href="tel:9370169876" className="text-gray-500 hover:text-[#D4AF37] text-sm transition-colors">9370169876</a></div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-[#D4AF37] shrink-0" /><a href="tel:9172462427" className="text-gray-500 hover:text-[#D4AF37] text-sm transition-colors">9172462427</a></div>
              <div className="flex items-center gap-2"><Clock size={14} className="text-[#D4AF37] shrink-0" /><p className="text-gray-500 text-sm">Mon–Sat: 9AM–9PM</p></div>
              <div className="flex items-center gap-2"><Clock size={14} className="text-[#D4AF37] shrink-0" /><p className="text-gray-500 text-sm">Sun: 10AM–7PM</p></div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#D4AF37]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">&copy; {year} UK HairXpresso. All rights reserved.</p>
          <p className="text-gray-700 text-xs flex items-center gap-1">Made with <Heart size={10} className="text-[#D4AF37]" /> in Ramtek</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;