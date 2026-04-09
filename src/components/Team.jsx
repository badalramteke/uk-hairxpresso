import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TEAM } from '../data/salonData';
import { splitChars, animateHeading } from '../utils/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateHeading('tm');

      // Cards — polygon clip-path reveal
      ScrollTrigger.batch('.team-card', {
        start: 'top 88%', once: true,
        onEnter: (batch) => {
          gsap.fromTo(batch,
            { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0 },
            { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)', opacity: 1, stagger: 0.12, duration: 1, ease: 'power4.out' }
          );
          // Counter-zoom images
          gsap.fromTo('.team-img', { scale: 1.3 }, { scale: 1, stagger: 0.12, duration: 1.2, ease: 'power3.out' });
        }
      });

      // Experience badges — bounce
      ScrollTrigger.batch('.exp-badge', {
        start: 'top 82%', once: true,
        onEnter: (batch) => gsap.fromTo(batch, { scale: 0, rotation: -45 }, { scale: 1, rotation: 0, stagger: 0.08, duration: 0.5, ease: 'back.out(2)' })
      });

      // Name text slide
      ScrollTrigger.batch('.team-name', {
        start: 'top 85%', once: true,
        onEnter: (batch) => gsap.fromTo(batch, { x: -20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out' })
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="team" className="py-20 lg:py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/[0.025] blur-[130px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-14">
          <p className="tm-label text-[10px] font-space font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-4" style={{ opacity: 0 }}>Our Experts</p>
          <h2 className="tm-title text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-white mb-5" style={{ perspective: '800px' }}>
            {splitChars('Meet the ', 'tm-char')}
            <em className="not-italic italic text-[#D4AF37]">{splitChars('Team', 'tm-char')}</em>
          </h2>
          <div className="tm-line h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-5" style={{ width: 0 }} />
          <p className="tm-sub text-gray-400 max-w-xl mx-auto text-sm sm:text-base" style={{ opacity: 0 }}>
            Skilled professionals passionate about making you look and feel your absolute best.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TEAM.map((m) => (
            <div key={m.id}
              className="team-card rounded-2xl overflow-hidden border border-[#D4AF37]/[0.08] bg-[#111111] group transition-all duration-500 hover:border-[#D4AF37]/30 hover:translate-y-[-4px] hover:shadow-[0_0_40px_rgba(212,175,55,0.06)]"
              style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' }}>
              <div className="relative aspect-square overflow-hidden">
                <img src={m.image} alt={m.name} loading="lazy"
                  className="team-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.12) 0%, transparent 50%)' }} />
                <span className="exp-badge absolute top-3 right-3 bg-[#D4AF37] text-black text-[10px] font-space font-bold px-2.5 py-1 rounded-full"
                  style={{ transform: 'scale(0)' }}>{m.experience}</span>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="team-name font-cormorant font-bold text-white text-lg sm:text-xl leading-tight" style={{ opacity: 0 }}>{m.name}</h3>
                <p className="text-[#D4AF37] text-[10px] font-space font-bold mt-1 mb-2 uppercase tracking-[0.15em]">{m.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{m.specialization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
