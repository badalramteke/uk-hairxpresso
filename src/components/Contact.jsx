import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { SALON_INFO } from '../data/salonData';
import { splitChars, animateHeading, batchCards, mStart } from '../utils/gsapAnimations';
import { useBooking } from '../context/BookingContext';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const ref = useRef(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateHeading('ct');

      // Location cards
      ScrollTrigger.batch('.loc-card', {
        start: mStart(), once: true,
        onEnter: (batch) => gsap.fromTo(batch, { x: -25, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' })
      });

      // MAIN badge
      gsap.fromTo('.main-badge', { scale: 0 }, { scale: 1, duration: 0.3, ease: 'back.out(2)',
        scrollTrigger: { trigger: '.loc-card', start: mStart(), once: true } });

      // Map
      gsap.fromTo('.map-wrap', { x: 25, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.map-wrap', start: mStart(), once: true } });

      // CTA buttons
      gsap.fromTo('.ct-btns', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out',
        scrollTrigger: { trigger: '.ct-btns', start: mStart(), once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="contact" className="py-20 lg:py-32 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-14">
          <p className="ct-label text-[10px] font-space font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-4" style={{ opacity: 0 }}>Find Us</p>
          <h2 className="ct-title text-3xl sm:text-4xl lg:text-5xl font-cormorant font-bold text-white mb-4" style={{ perspective: '800px' }}>
            {splitChars('Visit & ', 'ct-char')}
            <em className="not-italic italic text-[#D4AF37]">{splitChars('Contact', 'ct-char')}</em>
          </h2>
          <div className="ct-line h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" style={{ width: 0 }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {SALON_INFO.locations.map((loc) => (
              <div key={loc.id}
                className={`loc-card rounded-2xl p-6 sm:p-8 border transition-all duration-500 hover:translate-y-[-3px] hover:shadow-[0_0_30px_rgba(212,175,55,0.06)] ${
                  loc.primary ? 'bg-[#111111] border-[#D4AF37]/25 hover:border-[#D4AF37]/40' : 'bg-[#0d0d0d] border-[#D4AF37]/[0.08] hover:border-[#D4AF37]/25'}`}
                style={{ opacity: 0 }}>
                <div className="flex items-center gap-2 mb-4">
                  {loc.primary && <span className="main-badge text-[10px] bg-[#D4AF37] text-black font-bold px-2.5 py-1 rounded-full font-space tracking-wider" style={{ transform: 'scale(0)' }}>MAIN</span>}
                  <h3 className="text-lg font-bold text-white font-cormorant">{loc.name}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3"><MapPin size={16} className="text-[#D4AF37] mt-0.5 shrink-0" /><p className="text-gray-400 text-sm leading-relaxed">{loc.address}</p></div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-[#D4AF37] shrink-0" />
                    <div className="flex flex-wrap gap-2">
                      <a href={`tel:${loc.phone1}`} className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">{loc.phone1}</a>
                      {loc.phone2 && <><span className="text-gray-700">|</span><a href={`tel:${loc.phone2}`} className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors">{loc.phone2}</a></>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3"><Clock size={16} className="text-[#D4AF37] shrink-0" /><p className="text-gray-400 text-sm">{loc.hours}</p></div>
                </div>
                <a href={`https://maps.google.com/?q=${loc.mapQuery}`} target="_blank" rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-[#D4AF37] hover:text-white text-sm font-semibold transition-colors group">
                  <Navigation size={14} className="group-hover:translate-x-0.5 transition-transform" /> Get Directions
                </a>
              </div>
            ))}

            <div className="ct-btns flex flex-wrap gap-3" style={{ opacity: 0 }}>
              <button onClick={() => openBooking()}
                className="flex items-center gap-2 bg-[#25D366] text-black font-bold px-5 py-2.5 rounded-full text-sm hover:bg-[#1EBE5D] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all">
                <FaWhatsapp size={16} /> WhatsApp Us
              </button>
              <a href={SALON_INFO.instagramUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold px-5 py-2.5 rounded-full text-sm transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <FaInstagram size={16} /> Instagram
              </a>
            </div>
          </div>

          <div className="map-wrap rounded-2xl overflow-hidden border border-[#D4AF37]/10 min-h-[350px] lg:min-h-[450px]" style={{ opacity: 0 }}>
            <iframe title="UK HairXpresso — Ramtek" src={SALON_INFO.googleMapsEmbed}
              width="100%" height="100%" style={{ border: 0, minHeight: '350px' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;