import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const barRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0, duration: 0.4, ease: 'power2.in', onComplete
        });
      }
    });

    // Logo — fast entrance
    tl.fromTo(logoRef.current,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' },
      0.1
    );

    // Text
    tl.fromTo(textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      0.4
    );

    // Loading bar — fast fill
    tl.fromTo(barRef.current,
      { width: '0%' },
      { width: '100%', duration: 0.8, ease: 'power2.inOut' },
      0.5
    );

    // Logo glow pulse
    tl.to(logoRef.current, {
      scale: 1.05,
      boxShadow: '0 0 60px rgba(212,168,67,0.6)',
      duration: 0.3, ease: 'power2.inOut', yoyo: true, repeat: 1
    }, 1.1);

    // Text out
    tl.to(textRef.current, { opacity: 0, duration: 0.2 }, 1.5);

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader-screen">
      <img ref={logoRef} src="/images/logo_and_name.jpg" alt="UK HairXpresso"
        className="loader-logo relative z-10" style={{ opacity: 0 }} />
      <h2 ref={textRef}
        className="mt-10 font-space text-[#D4AF37] text-xs tracking-[8px] uppercase opacity-0 relative z-10">
        HairXpresso
      </h2>
      <div className="loader-bar mt-5">
        <div ref={barRef} className="loader-bar-fill"
          style={{
            background: 'linear-gradient(90deg, #D4A843, #F0D27A, #D4A843)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1s ease-in-out infinite'
          }} />
      </div>
      <p className="mt-4 text-[10px] text-gray-600 font-space tracking-widest uppercase">
        Crafting your experience...
      </p>
    </div>
  );
};

export default Loader;
