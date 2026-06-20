import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiChevronDown } from 'react-icons/hi';
import { HelpCircle } from 'lucide-react';
import { FAQS } from '../data/salonData';
import { splitChars, animateHeading, mStart } from '../utils/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

const FAQItem = ({ faq, isOpen, onClick }) => {
  const contentRef = useRef(null);
  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, { height: isOpen ? contentRef.current.scrollHeight : 0, opacity: isOpen ? 1 : 0, duration: 0.4, ease: 'power3.inOut' });
    }
  }, [isOpen]);

  return (
    <div className={`bg-[#111111] border rounded-xl overflow-hidden transition-all duration-400 ${isOpen ? 'border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.05)]' : 'border-[#D4AF37]/[0.08] hover:border-[#D4AF37]/20'}`}>
      <button onClick={onClick} className="w-full flex items-center justify-between px-6 py-5 text-left group" aria-expanded={isOpen}>
        <h3 className={`text-sm sm:text-base font-semibold font-outfit pr-4 transition-colors duration-300 ${isOpen ? 'text-[#D4AF37]' : 'text-white group-hover:text-[#D4AF37]'}`}>{faq.question}</h3>
        <HiChevronDown className={`text-lg flex-shrink-0 transition-all duration-400 ${isOpen ? 'text-[#D4AF37] rotate-180' : 'text-gray-600'}`} />
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="px-6 pb-5">
          <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent mb-4" />
          <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const ref = useRef(null);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateHeading('fq');

      // FAQ items — cascade from left
      ScrollTrigger.batch('.faq-item', {
        start: mStart(), once: true,
        onEnter: (batch) => gsap.fromTo(batch, { x: -20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.04, duration: 0.4, ease: 'power2.out' })
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="faq" className="py-20 lg:py-28 bg-[#050505] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="fq-label text-[10px] font-space font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-4" style={{ opacity: 0 }}>Got Questions?</p>
          <h2 className="fq-title text-3xl sm:text-4xl lg:text-5xl font-cormorant font-bold text-white mb-4" style={{ perspective: '800px' }}>
            {splitChars('Frequently ', 'fq-char')}
            <em className="not-italic italic text-[#D4AF37]">{splitChars('Asked', 'fq-char')}</em>
          </h2>
          <div className="fq-line h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-5" style={{ width: 0 }} />
          <div className="fq-sub flex items-center justify-center gap-2 text-gray-400 text-sm" style={{ opacity: 0 }}>
            <HelpCircle size={14} className="text-[#D4AF37]" /> Everything you need to know before visiting us
          </div>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => (
            <div key={faq.id} className="faq-item" style={{ opacity: 0 }}>
              <FAQItem faq={faq} isOpen={openId === faq.id} onClick={() => setOpenId(openId === faq.id ? null : faq.id)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
