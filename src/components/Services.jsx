import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Scissors, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { GROOMING_PACKAGES } from '../data/salonData';
import { splitChars, animateHeading, batchCards, mStart } from '../utils/gsapAnimations';
import { useBooking } from '../context/BookingContext';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const ref = useRef(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateHeading('svc');
      batchCards('.pkg-card', { rotateX: 8 });

      // Stagger checkmarks after cards enter
      ScrollTrigger.batch('.svc-item', {
        start: mStart(), once: true,
        onEnter: (batch) => gsap.fromTo(batch, { x: -12, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.03, duration: 0.35, ease: 'power2.out' })
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleBook = (pkg) => {
    openBooking(pkg.name);
  };

  return (
    <section ref={ref} id="services" className="py-20 lg:py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="svc-label text-[10px] font-space font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-4" style={{ opacity: 0 }}>Our Services</p>
          <h2 className="svc-title text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-white mb-5 leading-[1.1]" style={{ perspective: '800px' }}>
            {splitChars('Grooming ', 'svc-char')}
            <em className="not-italic italic text-[#D4AF37]">{splitChars('Packages', 'svc-char')}</em>
          </h2>
          <div className="svc-line h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-5" style={{ width: 0 }} />
          <p className="svc-sub text-gray-400 max-w-xl mx-auto font-sans text-sm sm:text-base" style={{ opacity: 0 }}>
            Premium grooming packages crafted for every budget. All include professional-grade products.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" style={{ perspective: '1200px' }}>
          {GROOMING_PACKAGES.map((pkg) => (
            <div key={pkg.id}
              className={`pkg-card relative flex flex-col rounded-2xl p-7 sm:p-8 border transition-all duration-500
                hover:translate-y-[-4px] hover:shadow-[0_0_40px_rgba(212,175,55,0.08)]
                ${pkg.featured
                  ? 'bg-[#111111] border-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.08)]'
                  : 'bg-[#0d0d0d] border-[#D4AF37]/[0.08] hover:border-[#D4AF37]/30'}`}
              style={{ opacity: 0 }}>
              {pkg.badge && (
                <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 font-space text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.15em] ${
                  pkg.featured ? 'bg-[#D4AF37] text-black' : 'bg-[#1a1a1a] text-[#D4AF37] border border-[#D4AF37]/30'}`}>
                  {pkg.featured && <Scissors size={9} className="inline mr-1 -mt-px" />}{pkg.badge}
                </span>
              )}
              <h3 className="text-xl sm:text-2xl font-cormorant font-bold text-white mb-3 mt-2">{pkg.name}</h3>
              <div className="flex items-end gap-3 mb-6">
                <span className={`text-4xl sm:text-5xl font-cormorant font-bold ${pkg.featured ? 'text-[#D4AF37]' : 'text-white'}`}>₹{pkg.price.toLocaleString('en-IN')}</span>
                {pkg.originalPrice && (
                  <>
                    <span className="text-gray-500 line-through text-base mb-1.5">₹{pkg.originalPrice.toLocaleString('en-IN')}</span>
                    <span className="text-green-400 text-[10px] font-bold mb-1.5 bg-green-400/10 px-2 py-0.5 rounded-full font-space tracking-wider">
                      SAVE {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <ul className="space-y-2.5 flex-1 mb-7">
                {pkg.services.map((svc) => (
                  <li key={svc} className="svc-item flex items-center gap-2.5 text-sm text-gray-400" style={{ opacity: 0 }}>
                    <Check size={14} className="text-[#D4AF37] shrink-0" />{svc}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleBook(pkg)}
                className={`group flex items-center justify-center gap-2 py-3.5 rounded-full font-space font-bold text-xs tracking-widest transition-all duration-400 overflow-hidden
                  ${pkg.featured
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F0D060] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                    : 'border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'}`}>
                <FaWhatsapp size={15} />BOOK THIS PACKAGE
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-600 mt-8">* Prices may vary. Contact for individual service enquiries.</p>
      </div>
    </section>
  );
};

export default Services;
