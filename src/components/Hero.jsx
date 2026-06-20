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
    const mobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {

      // Initial states
      gsap.set('.hero-logo', { opacity: 0, scale: 0.8 });
      gsap.set('.hero-btn', { opacity: 0, y: 20, scale: 0.9 });
      gsap.set('.hero-scroll', { opacity: 0 });

      // Mobile: skip per-char, just show text blocks
      if (mobile) {
        // Set all child elements visible immediately — they have inline opacity:0
        // and we only animate the parent containers on mobile
        gsap.set('.hero-eyebrow-char', { opacity: 1, y: 0 });
        gsap.set('.hero-word', { yPercent: 0, opacity: 1 });
        gsap.set('.luxury-char', { opacity: 1, y: 0, rotateY: 0, scale: 1 });
        gsap.set('.hero-subtitle-word', { opacity: 1, y: 0 });
        gsap.set('.hero-loc-char', { opacity: 1 });

        gsap.set('.hero-eyebrow', { opacity: 0, y: 10 });
        gsap.set('.hero-heading', { opacity: 0, y: 20 });
        gsap.set('.hero-subtitle', { opacity: 0, y: 10 });
        gsap.set('.hero-location', { opacity: 0 });
        gsap.set('.hero-gold-line', { width: 0, opacity: 0 });

        const tl = gsap.timeline({ delay: 1.9 });

        tl.to('.hero-logo', { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' });
        tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '-=0.2');
        tl.to('.hero-heading', { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.15');
        tl.to('.hero-gold-line', { width: 60, opacity: 1, duration: 0.3, ease: 'power2.inOut' }, '-=0.1');
        tl.to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '-=0.15');
        tl.to('.hero-btn', { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.35, ease: 'back.out(1.5)' }, '-=0.1');
        tl.to('.hero-location', { opacity: 1, duration: 0.3 }, '-=0.15');
        tl.to('.hero-scroll', { opacity: 1, duration: 0.3 }, '-=0.1');

      } else {
        // Desktop: full character animations
        gsap.set('.hero-eyebrow-char', { opacity: 0, y: 12 });
        gsap.set('.hero-word', { yPercent: 100, opacity: 0 });
        gsap.set('.luxury-char', { opacity: 0, y: 30, rotateY: 45, scale: 0.8 });
        gsap.set('.hero-subtitle-word', { opacity: 0, y: 12 });
        gsap.set('.hero-loc-char', { opacity: 0 });

        const tl = gsap.timeline({ delay: 1.9 });

        // Logo
        tl.to('.hero-logo', { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' });

        // Eyebrow typewriter
        tl.to('.hero-eyebrow-char', {
          opacity: 1, y: 0, duration: 0.2, stagger: 0.015, ease: 'power2.out'
        }, '-=0.3');

        // "Where Style Meets" words
        tl.to('.hero-word', {
          yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out'
        }, '-=0.2');

        // "Luxury" letters
        tl.to('.luxury-char', {
          opacity: 1, y: 0, rotateY: 0, scale: 1,
          duration: 0.35, stagger: 0.04, ease: 'back.out(1.4)'
        }, '-=0.3');

        // Gold line
        tl.fromTo('.hero-gold-line',
          { width: 0, opacity: 0 },
          { width: 100, opacity: 1, duration: 0.4, ease: 'power2.inOut' }, '-=0.15');

        // Subtitle words
        tl.to('.hero-subtitle-word', {
          opacity: 1, y: 0, duration: 0.25, stagger: 0.02, ease: 'power2.out'
        }, '-=0.2');

        // Buttons
        tl.to('.hero-btn', {
          opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)'
        }, '-=0.15');

        // Location chars
        tl.to('.hero-loc-char', {
          opacity: 1, duration: 0.15, stagger: 0.005, ease: 'none'
        }, '-=0.2');

        // Scroll
        tl.to('.hero-scroll', { opacity: 1, duration: 0.3 }, '-=0.1');
      }

      // Parallax BG — desktop only
      if (!mobile) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top', end: 'bottom top', scrub: 1,
          onUpdate: (self) => {
            if (bgRef.current) gsap.set(bgRef.current, { y: self.progress * 80 });
          }
        });
      }

      // Particles — only 4 on mobile
      const particles = document.querySelectorAll('.hero-particle');
      const max = mobile ? 4 : particles.length;
      particles.forEach((el, i) => {
        if (i >= max) { el.style.display = 'none'; return; }
        gsap.to(el, {
          y: 'random(-12, 12)', x: 'random(-6, 6)',
          duration: 'random(3, 5)', repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.3
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const luxuryLetters = 'Luxury'.split('');
  const eyebrowText = 'Premium Unisex Salon';
  const subtitleWords = "Ramtek's finest grooming destination. Expert cuts, beard styling, hair spa — crafted with precision.".split(' ');
  const locationText = 'Near KITS College, Mauda Road, Ramtek, Maharashtra';

  return (
    <section ref={containerRef} id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">

      {/* Parallax BG */}
      <div ref={bgRef} className="absolute inset-[-10%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: "url('/images/pexels-photo-3992874.jpeg')", opacity: 0.8 }} />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/40 to-[#050505]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/60" />

      {/* Particles — fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { l: '8%', t: '20%', s: 3 }, { l: '22%', t: '65%', s: 2 }, { l: '75%', t: '25%', s: 3 },
          { l: '88%', t: '60%', s: 2 }, { l: '50%', t: '12%', s: 2 }, { l: '38%', t: '78%', s: 2 },
        ].map((p, i) => (
          <div key={i} className="hero-particle absolute rounded-full bg-[#D4AF37]"
            style={{ left: p.l, top: p.t, width: p.s, height: p.s, opacity: 0.3 }} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-20 sm:pt-24">

        {/* Logo */}
        <div className="hero-logo mb-6 sm:mb-8" style={{ opacity: 0 }}>
          <img src="/images/logo_and_name.jpg" alt="UK HairXpresso"
            className="h-20 sm:h-28 md:h-36 w-auto mx-auto object-contain"
            style={{ filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.2))' }} />
        </div>

        {/* Eyebrow */}
        <p className="hero-eyebrow mb-4 sm:mb-6">
          {eyebrowText.split('').map((char, i) => (
            <span key={i} className="hero-eyebrow-char inline-block text-[9px] sm:text-xs uppercase text-[#D4AF37] font-space font-bold tracking-[0.25em] sm:tracking-[0.3em]"
              style={{ opacity: 0, display: char === ' ' ? 'inline' : 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>

        {/* Main heading */}
        <div className="hero-heading mb-2" style={{ perspective: '800px' }}>
          <h1 className="leading-[0.92] font-cormorant font-bold text-white">
            <span className="block text-4xl sm:text-6xl lg:text-8xl mb-1 sm:mb-2">
              {['Where', 'Style', 'Meets'].map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-2 sm:mr-4 lg:mr-5">
                  <span className="hero-word inline-block" style={{ transformOrigin: 'center bottom' }}>{word}</span>
                </span>
              ))}
            </span>
            <span className="block text-5xl sm:text-7xl lg:text-[9rem] italic leading-none text-[#D4AF37]"
              style={{ perspective: '500px' }}>
              {luxuryLetters.map((char, i) => (
                <span key={i} className="luxury-char inline-block"
                  style={{ transformOrigin: 'center bottom' }}>{char}</span>
              ))}
            </span>
          </h1>
        </div>

        {/* Gold line */}
        <div className="hero-gold-line h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-3 sm:mt-4 mb-5 sm:mb-7"
          style={{ width: 0, opacity: 0 }} />

        {/* Subtitle */}
        <p className="hero-subtitle text-xs sm:text-base lg:text-lg text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-sans">
          {subtitleWords.map((word, i) => (
            <span key={i} className="hero-subtitle-word inline-block mr-[0.3em]" style={{ opacity: 0 }}>
              {word}
            </span>
          ))}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button onClick={() => openBooking()}
            className="hero-btn flex items-center justify-center gap-2 sm:gap-3 bg-[#25D366] text-black font-bold font-space px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm
                       hover:bg-[#1EBE5D] transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] active:scale-95 w-full sm:w-auto tracking-wider"
            style={{ opacity: 0 }}>
            <FaWhatsapp size={20} /> Book Appointment
          </button>
          <a href="#services" onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hero-btn flex items-center justify-center gap-2 border-2 border-[#D4AF37] text-[#D4AF37] font-bold font-space px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm
                       hover:bg-[#D4AF37] hover:text-black transition-all duration-300 w-full sm:w-auto tracking-wider"
            style={{ opacity: 0 }}>
            View Packages
          </a>
        </div>

        {/* Location */}
        <p className="hero-location mt-6 sm:mt-8">
          {locationText.split('').map((char, i) => (
            <span key={i} className="hero-loc-char inline-block text-[9px] sm:text-xs text-gray-500/40 font-space tracking-widest"
              style={{ opacity: 0, display: char === ' ' ? 'inline' : 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>
      </div>

      {/* Scroll */}
      <div className="hero-scroll absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2" style={{ opacity: 0 }}>
        <a href="#stats" onClick={(e) => { e.preventDefault(); document.querySelector('#stats')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="text-[#D4AF37]/40 hover:text-[#D4AF37] transition-colors">
          <ChevronDown size={24} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
