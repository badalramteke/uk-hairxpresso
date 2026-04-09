import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Tag, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { OFFERS } from '../data/salonData';
import { splitChars, animateHeading, batchCards } from '../utils/gsapAnimations';
import { useBooking } from '../context/BookingContext';

gsap.registerPlugin(ScrollTrigger);
const iconMap = { student: GraduationCap, tag: Tag, gift: Sparkles };

const Offers = () => {
  const ref = useRef(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateHeading('off');

      // Student banner
      gsap.fromTo('.student-banner',
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.student-banner', start: 'top 85%', once: true } }
      );
      // Decorative circles
      ScrollTrigger.batch('.deco-circle', {
        start: 'top 85%', once: true,
        onEnter: (batch) => gsap.fromTo(batch, { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.07, stagger: 0.05, duration: 0.5, ease: 'back.out(1.5)' })
      });

      batchCards('.offer-card', { rotateY: 5 });
    }, ref);
    return () => ctx.revert();
  }, []);

  const studentOffer = OFFERS.find(o => o.type === 'highlight');
  const cardOffers = OFFERS.filter(o => o.type === 'card');

  return (
    <section ref={ref} id="offers" className="py-20 lg:py-28 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="off-label text-[10px] font-space font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-4" style={{ opacity: 0 }}>Hot Deals</p>
          <h2 className="off-title text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-white mb-5" style={{ perspective: '800px' }}>
            {splitChars('Offers & ', 'off-char')}
            <em className="not-italic italic text-[#D4AF37]">{splitChars('Discounts', 'off-char')}</em>
          </h2>
          <div className="off-line h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" style={{ width: 0 }} />
        </div>

        {studentOffer && (
          <div className="student-banner relative overflow-hidden rounded-2xl mb-8 p-8 sm:p-10"
            style={{ opacity: 0, background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)' }}>
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="deco-circle absolute w-40 h-40 rounded-full border-2 border-black"
                  style={{ left: `${i * 13 - 5}%`, top: `${(i % 3) * 20 - 10}%`, opacity: 0 }} />
              ))}
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-black/15 flex items-center justify-center shrink-0 hover:rotate-12 transition-transform duration-500">
                  <GraduationCap size={28} className="text-black" />
                </div>
                <div>
                  <span className="text-[10px] font-space font-bold uppercase tracking-[0.2em] text-black/50">{studentOffer.badge}</span>
                  <h3 className="text-2xl sm:text-3xl font-cormorant font-bold text-black leading-tight">{studentOffer.title}</h3>
                  <p className="text-black/60 text-sm mt-1">{studentOffer.description}</p>
                </div>
              </div>
              <button onClick={() => openBooking('10% Student Discount')}
                className="flex items-center gap-2 bg-black text-[#D4AF37] font-space font-bold px-7 py-3 rounded-full text-xs hover:bg-[#111] transition-all whitespace-nowrap uppercase tracking-widest hover:shadow-[0_0_25px_rgba(0,0,0,0.5)]">
                <FaWhatsapp size={15} />{studentOffer.ctaText}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" style={{ perspective: '1000px' }}>
          {cardOffers.map((offer) => {
            const Icon = iconMap[offer.icon] || Tag;
            return (
              <div key={offer.id}
                className="offer-card rounded-2xl border border-[#D4AF37]/[0.08] bg-[#111111] p-7 flex flex-col gap-4
                           transition-all duration-500 hover:border-[#D4AF37]/30 hover:translate-y-[-3px] hover:shadow-[0_0_30px_rgba(212,175,55,0.06)]"
                style={{ opacity: 0 }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                    <Icon size={17} className="text-[#D4AF37]" />
                  </div>
                  <span className="text-[10px] font-space font-bold tracking-[0.2em] uppercase text-[#D4AF37]">{offer.badge}</span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-cormorant font-bold text-white mb-2">{offer.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{offer.description}</p>
                </div>
                <button onClick={() => openBooking(offer.title)}
                  className="mt-auto flex items-center gap-2 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-space font-bold px-5 py-2.5 rounded-full text-xs transition-all w-fit uppercase tracking-widest">
                  <FaWhatsapp size={13} />{offer.ctaText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Offers;