import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaWhatsapp } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states — everything hidden
      gsap.set('.hero-logo', { opacity: 0, scale: 0.6, filter: 'blur(12px)' });
      gsap.set('.hero-eyebrow-char', { opacity: 0, y: 15 });
      gsap.set('.hero-word', { yPercent: 120, opacity: 0, rotateX: -30 });
      gsap.set('.luxury-char', { opacity: 0, y: 40, rotateY: 60, scale: 0.7 });
      gsap.set('.hero-subtitle-word', { opacity: 0, y: 20, filter: 'blur(4px)' });
      gsap.set('.hero-btn', { opacity: 0, y: 35, scale: 0.85 });
      gsap.set('.hero-loc-char', { opacity: 0, y: 8 });
      gsap.set('.hero-scroll', { opacity: 0, y: -15 });

      const tl = gsap.timeline({ delay: 3.2 }); // After loader ~ 3s

      // 1. Logo — blur + scale entrance
      tl.to('.hero-logo', {
        opacity: 1, scale: 1, filter: 'blur(0px)',
        duration: 1.2, ease: 'power4.out'
      });

      // 2. Eyebrow — character-by-character typewriter
      tl.to('.hero-eyebrow-char', {
        opacity: 1, y: 0,
        duration: 0.3, stagger: 0.025, ease: 'power2.out'
      }, '-=0.6');

      // 3. "Where Style Meets" — word-by-word rise from below
      tl.to('.hero-word', {
        yPercent: 0, opacity: 1, rotateX: 0,
        duration: 0.9, stagger: 0.12, ease: 'power4.out'
      }, '-=0.3');

      // 4. "Luxury" — letter-by-letter 3D flip entrance
      tl.to('.luxury-char', {
        opacity: 1, y: 0, rotateY: 0, scale: 1,
        duration: 0.5, stagger: 0.06, ease: 'back.out(1.6)'
      }, '-=0.4');

      // 5. Gold line under "Luxury"  
      tl.fromTo('.hero-gold-line',
        { width: 0, opacity: 0 },
        { width: 100, opacity: 1, duration: 0.6, ease: 'power2.inOut' },
        '-=0.2'
      );

      // 6. Subtitle — word-by-word blur reveal
      tl.to('.hero-subtitle-word', {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.4, stagger: 0.04, ease: 'power2.out'
      }, '-=0.3');

      // 7. Buttons — bounce up
      tl.to('.hero-btn', {
        opacity: 1, y: 0, scale: 1,
        duration: 0.65, stagger: 0.15, ease: 'back.out(2)'
      }, '-=0.25');

      // 8. Location text — character stagger
      tl.to('.hero-loc-char', {
        opacity: 1, y: 0,
        duration: 0.2, stagger: 0.01, ease: 'power2.out'
      }, '-=0.3');

      // 9. Scroll indicator
      tl.to('.hero-scroll', {
        opacity: 1, y: 0,
        duration: 0.5, ease: 'power2.out'
      }, '-=0.2');

      // Parallax background on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          if (bgRef.current) gsap.set(bgRef.current, { y: self.progress * 120 });
        }
      });

      // Floating particles — GSAP driven, GPU-only
      document.querySelectorAll('.hero-particle').forEach((el, i) => {
        gsap.to(el, {
          y: 'random(-18, 18)', x: 'random(-8, 8)', opacity: 'random(0.3, 0.8)',
          duration: 'random(3, 5)', repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.5
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const luxuryLetters = 'Luxury'.split('');
  const eyebrowText = 'Premium Unisex Salon & Tattoo Studio';
  const subtitleWords = "Ramtek & Nagardhan's finest grooming destination. Expert cuts, beard styling, hair spa — crafted with precision for every look.".split(' ');
  const locationText = 'Near KITS College, Mauda Road, Ramtek  •  Killa Road, Nagardhan';

  return (
    <section ref={containerRef} id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] noise-overlay">

      {/* Parallax BG */}
      <div ref={bgRef} className="absolute inset-[-15%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: "url('/images/pexels-photo-3992874.jpeg')", opacity: 0.14 }} />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/40 to-[#050505]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-transparent to-[#050505]/70" />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,175,55,0.04) 0%, transparent 70%)' }} />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { l: '8%', t: '20%', s: 3 }, { l: '22%', t: '65%', s: 2 }, { l: '75%', t: '25%', s: 4 },
          { l: '88%', t: '60%', s: 2 }, { l: '50%', t: '12%', s: 3 }, { l: '38%', t: '78%', s: 2 },
          { l: '65%', t: '50%', s: 1.5 }, { l: '15%', t: '45%', s: 2 }, { l: '82%', t: '40%', s: 2 },
        ].map((p, i) => (
          <div key={i} className="hero-particle absolute rounded-full bg-[#D4AF37]"
            style={{ left: p.l, top: p.t, width: p.s, height: p.s, opacity: 0.3 }} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24">
        
        {/* Logo */}
        <div className="hero-logo mb-8" style={{ opacity: 0 }}>
          <img src="/images/logo_and_name.jpg" alt="UK HairXpresso"
            className="h-24 sm:h-32 md:h-40 w-auto mx-auto object-contain"
            style={{ filter: 'drop-shadow(0 0 40px rgba(212,175,55,0.25))' }} />
        </div>

        {/* Eyebrow — character-by-character */}
        <p className="mb-6">
          {eyebrowText.split('').map((char, i) => (
            <span key={i} className="hero-eyebrow-char inline-block text-[10px] sm:text-xs uppercase text-[#D4AF37] font-space font-bold tracking-[0.3em]"
              style={{ opacity: 0, display: char === ' ' ? 'inline' : 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>

        {/* Main heading */}
        <div className="mb-2" style={{ perspective: '1000px' }}>
          <h1 className="leading-[0.9] font-cormorant font-bold text-white">
            {/* "Where Style Meets" — word-by-word */}
            <span className="block text-5xl sm:text-6xl lg:text-8xl mb-2">
              {['Where', 'Style', 'Meets'].map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-3 sm:mr-4 lg:mr-5">
                  <span className="hero-word inline-block" style={{ transformOrigin: 'center bottom' }}>{word}</span>
                </span>
              ))}
            </span>

            {/* "Luxury" — letter-by-letter 3D flip */}
            <span className="block text-6xl sm:text-7xl lg:text-[9rem] italic leading-none text-[#D4AF37]"
              style={{ perspective: '600px' }}>
              {luxuryLetters.map((char, i) => (
                <span key={i} className="luxury-char inline-block"
                  style={{ transformOrigin: 'center bottom', display: 'inline-block' }}>
                  {char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Gold line under heading */}
        <div className="hero-gold-line h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4 mb-7"
          style={{ width: 0, opacity: 0 }} />

        {/* Subtitle — word-by-word blur reveal */}
        <p className="text-sm sm:text-base lg:text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed font-sans">
          {subtitleWords.map((word, i) => (
            <span key={i} className="hero-subtitle-word inline-block mr-[0.3em]" style={{ opacity: 0 }}>
              {word}
            </span>
          ))}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => openBooking()}
            className="hero-btn flex items-center justify-center gap-3 bg-[#25D366] text-black font-bold font-space px-8 py-4 rounded-full text-sm sm:text-base
                       hover:bg-[#1EBE5D] transition-all duration-300 hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] active:scale-95 w-full sm:w-auto tracking-wider"
            style={{ opacity: 0 }}>
            <FaWhatsapp size={22} /> Book Appointment
          </button>
          <a href="#services" onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hero-btn flex items-center justify-center gap-2 border-2 border-[#D4AF37] text-[#D4AF37] font-bold font-space px-8 py-4 rounded-full text-sm sm:text-base
                       hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] w-full sm:w-auto tracking-wider"
            style={{ opacity: 0 }}>
            View Packages
          </a>
        </div>

        {/* Location — char-by-char micro-stagger */}
        <p className="mt-8">
          {locationText.split('').map((char, i) => (
            <span key={i} className="hero-loc-char inline-block text-[11px] sm:text-xs text-gray-500/50 font-space tracking-widest"
              style={{ opacity: 0, display: char === ' ' ? 'inline' : 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2" style={{ opacity: 0 }}>
        <a href="#stats" onClick={(e) => { e.preventDefault(); document.querySelector('#stats')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="text-[#D4AF37]/40 hover:text-[#D4AF37] transition-colors">
          <ChevronDown size={26} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
