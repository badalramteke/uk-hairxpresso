import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGraduationCap, FaWhatsapp, FaPercent, FaIdCard } from 'react-icons/fa';
import { SALON_INFO } from '../data/salonData';

gsap.registerPlugin(ScrollTrigger);

const StudentDiscount = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.student-content',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      // Floating icons animation
      gsap.to('.float-icon', {
        y: -15,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const whatsappURL = `https://wa.me/${SALON_INFO.whatsapp}?text=${encodeURIComponent("Hi! I'm a student and want to avail the 10% student discount!")}`;

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="student-content relative rounded-3xl overflow-hidden opacity-0">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-[#111] to-[#D4AF37]/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.15)_0%,_transparent_50%)]" />

          {/* Floating decorative icons */}
          <div className="absolute top-8 right-8 opacity-10">
            <FaGraduationCap className="float-icon text-6xl text-[#D4AF37]" />
          </div>
          <div className="absolute bottom-8 left-8 opacity-10">
            <FaPercent className="float-icon text-4xl text-[#D4AF37]" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center md:text-left">
            <div className="md:flex items-center gap-8 lg:gap-12">
              {/* Left: Icon */}
              <div className="flex-shrink-0 mb-6 md:mb-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gold-gradient mx-auto md:mx-0
                                flex items-center justify-center shadow-gold-xl animate-pulse-gold">
                  <FaGraduationCap className="text-4xl md:text-5xl text-[#050505]" />
                </div>
              </div>

              {/* Right: Text + CTA */}
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full 
                                 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] 
                                 text-xs font-syne tracking-wider uppercase mb-4">
                  <FaIdCard className="text-xs" />
                  Near KITS College, Ramtek
                </span>

                <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                  Student <span className="text-gold-shimmer">Discount</span>
                </h2>

                <div className="flex items-baseline gap-2 mb-4 justify-center md:justify-start">
                  <span className="text-5xl md:text-6xl font-cormorant font-bold text-[#D4AF37]">10%</span>
                  <span className="text-xl text-[#D4AF37] font-cormorant">OFF</span>
                </div>

                <p className="text-[#A3A3A3] text-base md:text-lg mb-6 max-w-lg">
                  Show your valid <strong className="text-white">college ID card</strong> and get an instant 
                  10% discount on any grooming package! Available for all college students.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <a
                    href={whatsappURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                  >
                    <FaWhatsapp className="text-xl" />
                    Claim Student Discount
                  </a>
                </div>

                <p className="text-xs text-[#A3A3A3]/50 mt-4 font-manrope">
                  * Valid college/university ID required at the time of billing. Cannot be combined with other offers.
                </p>
              </div>
            </div>
          </div>

          {/* Border */}
          <div className="absolute inset-0 rounded-3xl border border-[#D4AF37]/20" />
        </div>
      </div>
    </section>
  );
};

export default StudentDiscount;
