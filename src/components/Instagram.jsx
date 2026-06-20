import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInstagram } from 'react-icons/fa';
import { SALON_INFO, INSTAGRAM_POSTS } from '../data/salonData';
import { splitChars, animateHeading, mStart, isMobile } from '../utils/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

const Instagram = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateHeading('ig');

      // Grid — random-order scale-up
      ScrollTrigger.batch('.insta-card', {
        start: mStart(), once: true,
        onEnter: (batch) => {
          gsap.fromTo(batch,
            { y: 25, opacity: 0, scale: 0.92 },
            { y: 0, opacity: 1, scale: 1, stagger: { each: 0.04, from: 'random' }, duration: 0.5, ease: 'back.out(1.2)' }
          );
        }
      });

      // Parallax on grid — desktop only
      if (!isMobile()) {
        gsap.to('.insta-grid', {
          y: -20,
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
        });
      }

      // CTA button
      gsap.fromTo('.ig-cta', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out',
        scrollTrigger: { trigger: '.ig-cta', start: mStart(), once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10">
          <p className="ig-label text-[10px] font-space font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-4" style={{ opacity: 0 }}>
            <FaInstagram className="inline mr-2 -mt-0.5" size={12} />Follow Us
          </p>
          <h2 className="ig-title text-3xl sm:text-4xl lg:text-5xl font-cormorant font-bold text-white mb-5" style={{ perspective: '800px' }}>
            {splitChars('Our ', 'ig-char')}
            <em className="not-italic italic text-[#D4AF37]">{splitChars('Instagram', 'ig-char')}</em>
          </h2>
          <div className="ig-line h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-5" style={{ width: 0 }} />
          <a href={SALON_INFO.instagramUrl} target="_blank" rel="noopener noreferrer"
            className="ig-sub inline-flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors text-sm" style={{ opacity: 0 }}>
            <FaInstagram size={16} className="text-[#D4AF37]" />@{SALON_INFO.instagram}
          </a>
        </div>

        <div className="insta-grid grid grid-cols-3 gap-2 sm:gap-3 mb-8">
          {INSTAGRAM_POSTS.map((img, i) => (
            <a key={i} href={SALON_INFO.instagramUrl} target="_blank" rel="noopener noreferrer"
              className="insta-card relative group aspect-square overflow-hidden rounded-xl bg-[#111]" style={{ opacity: 0 }}>
              <img src={img} alt={`UK HairXpresso post ${i + 1}`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75" loading="lazy" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
                <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <FaInstagram size={20} className="text-white" />
                </div>
              </div>
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#D4AF37]/25 transition-all duration-500 pointer-events-none" />
            </a>
          ))}
        </div>

        <div className="ig-cta text-center" style={{ opacity: 0 }}>
          <a href={SALON_INFO.instagramUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border-2 border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-space font-bold px-8 py-3.5 rounded-full transition-all duration-400 text-xs tracking-widest uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <FaInstagram size={18} /> Follow @{SALON_INFO.instagram}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Instagram;
