import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const barRef = useRef(null);
  const textRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const sparkle1Ref = useRef(null);
  const sparkle2Ref = useRef(null);
  const sparkle3Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete
        });
      }
    });

    // Decorative rings fade in
    tl.fromTo([ring1Ref.current, ring2Ref.current],
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power2.out', stagger: 0.2 },
      0
    );

    // Sparkles
    tl.fromTo([sparkle1Ref.current, sparkle2Ref.current, sparkle3Ref.current],
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' },
      0.3
    );

    // Logo entrance with bounce
    tl.fromTo(logoRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.4)' },
      0.5
    );

    // Text reveal with letter spacing
    tl.fromTo(textRef.current,
      { opacity: 0, y: 20, letterSpacing: '20px' },
      { opacity: 1, y: 0, letterSpacing: '10px', duration: 0.8, ease: 'power2.out' },
      1.6
    );

    // Loading bar with shimmer
    tl.fromTo(barRef.current,
      { width: '0%' },
      { width: '100%', duration: 1.2, ease: 'power2.inOut' },
      1.8
    );

    // Logo pulse glow
    tl.to(logoRef.current, {
      scale: 1.08,
      boxShadow: '0 0 80px rgba(212, 168, 67, 0.7)',
      duration: 0.5,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1
    }, 2);

    // Text fade out
    tl.to(textRef.current, { opacity: 0, y: -10, duration: 0.3 }, 3.2);

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader-screen">
      {/* Decorative rotating rings */}
      <div
        ref={ring1Ref}
        className="absolute w-56 h-56 rounded-full border border-gold-500/15"
        style={{ animation: 'spin 10s linear infinite' }}
      />
      <div
        ref={ring2Ref}
        className="absolute w-72 h-72 rounded-full border border-gold-500/10"
        style={{ animation: 'spin 15s linear infinite reverse' }}
      />

      {/* Sparkles */}
      <div ref={sparkle1Ref} className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold-400 rounded-full" style={{ filter: 'blur(1px)' }} />
      <div ref={sparkle2Ref} className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-gold-300 rounded-full" style={{ filter: 'blur(0.5px)' }} />
      <div ref={sparkle3Ref} className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-gold-500 rounded-full" style={{ filter: 'blur(0.5px)' }} />

      {/* Logo */}
      <img
        ref={logoRef}
        src="/images/logo_and_name.jpg"
        alt="UK HairXpresso"
        className="loader-logo relative z-10"
      />

      {/* Brand text */}
      <h2
        ref={textRef}
        className="mt-16 font-display text-gold-500 text-sm tracking-[10px] uppercase opacity-0 relative z-10"
      >
        HairXpresso
      </h2>

      {/* Loading bar with shimmer effect */}
      <div className="loader-bar mt-6">
        <div
          ref={barRef}
          className="loader-bar-fill"
          style={{
            background: 'linear-gradient(90deg, #D4A843, #F0D27A, #D4A843, #F0D27A, #D4A843)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s ease-in-out infinite'
          }}
        />
      </div>

      {/* Loading text */}
      <p className="mt-6 text-xs text-gray-500 font-accent tracking-widest uppercase">
        Crafting your experience...
      </p>
    </div>
  );
};

export default Loader;
