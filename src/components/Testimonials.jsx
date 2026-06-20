import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { TESTIMONIALS, SALON_INFO } from '../data/salonData';
import { splitChars, animateHeading, batchCards, mStart } from '../utils/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={13} className={i < count ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-[#333]'} />
      ))}
    </div>
  );
}

const Testimonials = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateHeading('rv');

      // Rating bar bounce
      gsap.fromTo('.rv-rating', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out',
        scrollTrigger: { trigger: '.rv-rating', start: mStart(), once: true } });

      // Cards
      batchCards('.review-card', { rotateX: 8 });

      // Quote icons — spin-in
      ScrollTrigger.batch('.quote-icon', {
        start: mStart(), once: true,
        onEnter: (batch) => gsap.fromTo(batch, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, stagger: 0.06, duration: 0.4, ease: 'back.out(2)' })
      });

      // Avatars — bounce
      ScrollTrigger.batch('.rev-avatar', {
        start: mStart(), once: true,
        onEnter: (batch) => gsap.fromTo(batch, { scale: 0 }, { scale: 1, stagger: 0.08, duration: 0.4, ease: 'back.out(2.5)' })
      });

      // CTA
      gsap.fromTo('.rv-cta', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out',
        scrollTrigger: { trigger: '.rv-cta', start: mStart(), once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="reviews" className="py-20 lg:py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-14">
          <p className="rv-label text-[10px] font-space font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-4" style={{ opacity: 0 }}>Client Love</p>
          <h2 className="rv-title text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-white mb-5" style={{ perspective: '800px' }}>
            {splitChars('What Clients ', 'rv-char')}
            <em className="not-italic italic text-[#D4AF37]">{splitChars('Say', 'rv-char')}</em>
          </h2>
          <div className="rv-line h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-5" style={{ width: 0 }} />
          <div className="rv-rating flex items-center justify-center gap-3" style={{ opacity: 0 }}>
            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#D4AF37] fill-[#D4AF37]" />)}</div>
            <p className="text-white font-cormorant font-bold text-xl">4.9</p>
            <p className="text-gray-500 text-sm">on Google</p>
            <FaGoogle className="text-[#D4AF37]" size={14} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: '1200px' }}>
          {TESTIMONIALS.map((r) => (
            <div key={r.id}
              className="review-card bg-[#111111] rounded-2xl p-6 border border-[#D4AF37]/[0.08] relative transition-all duration-500 hover:border-[#D4AF37]/30 hover:translate-y-[-3px] hover:shadow-[0_0_30px_rgba(212,175,55,0.06)]"
              style={{ opacity: 0 }}>
              <Quote size={18} className="quote-icon text-[#D4AF37]/20 absolute top-5 right-5" style={{ transform: 'scale(0)' }} />
              <Stars count={r.rating} />
              <p className="text-gray-400 text-sm leading-relaxed mt-3 mb-5">"{r.text}"</p>
              <div className="flex items-center gap-3 border-t border-[#1a1a1a] pt-4">
                <div className={`rev-avatar w-9 h-9 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-space font-bold shrink-0`}
                  style={{ transform: 'scale(0)' }}>{r.avatar}</div>
                <div>
                  <p className="text-white text-sm font-cormorant font-bold">{r.name}</p>
                  <div className="flex items-center gap-1.5">
                    <FaGoogle size={9} className="text-gray-600" />
                    <p className="text-gray-600 text-xs">{r.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rv-cta text-center mt-10" style={{ opacity: 0 }}>
          <a href={SALON_INFO.googleReviewUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-space font-bold px-6 py-3 rounded-full text-xs transition-all uppercase tracking-widest hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]">
            <FaGoogle size={13} />Leave a Google Review
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
