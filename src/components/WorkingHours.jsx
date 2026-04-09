import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock } from 'lucide-react';
import { WORKING_HOURS } from '../data/salonData';
import { splitChars, animateHeading } from '../utils/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

function isOpen() {
  const now = new Date();
  const h = now.getHours(), d = now.getDay();
  if (d === 0) return h >= 10 && h < 19;
  return h >= 9 && h < 21;
}
function getTodayName() {
  return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()];
}

const WorkingHours = () => {
  const ref = useRef(null);
  const todayName = getTodayName();
  const open = isOpen();

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateHeading('wh');

      // Status badge pop
      gsap.fromTo('.wh-status', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)',
        scrollTrigger: { trigger: '.wh-status', start: 'top 92%', once: true } });

      // Card scale
      gsap.fromTo('.wh-card', { y: 30, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.wh-card', start: 'top 88%', once: true } });

      // Rows stagger from right
      ScrollTrigger.batch('.wh-row', {
        start: 'top 90%', once: true,
        onEnter: (batch) => gsap.fromTo(batch, { x: 30, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power3.out' })
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="hours" className="py-20 lg:py-28 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="wh-label text-[10px] font-space font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-4" style={{ opacity: 0 }}>
            <Clock size={11} className="inline mr-1.5 -mt-[2px]" />Visit Us
          </p>
          <h2 className="wh-title text-3xl sm:text-4xl font-cormorant font-bold text-white mb-4" style={{ perspective: '800px' }}>
            {splitChars('Working ', 'wh-char')}
            <em className="not-italic italic text-[#D4AF37]">{splitChars('Hours', 'wh-char')}</em>
          </h2>
          <div className="wh-line h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-5" style={{ width: 0 }} />
          <div className={`wh-status inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold font-space ${
            open ? 'bg-green-500/15 text-green-400 border border-green-500/25' : 'bg-red-500/15 text-red-400 border border-red-500/25'
          }`} style={{ transform: 'scale(0)', opacity: 0 }}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${open ? 'bg-green-400' : 'bg-red-400'}`} />
            {open ? 'Open Right Now' : 'Currently Closed'}
          </div>
        </div>

        <div className="wh-card bg-[#111111] rounded-2xl border border-[#D4AF37]/[0.08] overflow-hidden" style={{ opacity: 0 }}>
          {WORKING_HOURS.schedule.map((item) => {
            const isToday = item.day === todayName;
            return (
              <div key={item.day}
                className={`wh-row flex items-center justify-between px-6 py-4 border-b border-[#1a1a1a] last:border-0 transition-colors ${
                  isToday ? 'bg-[#D4AF37]/[0.05] border-l-2 border-l-[#D4AF37]' : ''}`}
                style={{ opacity: 0 }}>
                <div className="flex items-center gap-3">
                  {isToday && <Clock size={13} className="text-[#D4AF37] shrink-0" />}
                  <span className={`text-sm ${isToday ? 'text-[#D4AF37] font-bold' : 'text-gray-400'}`}>
                    {item.day}
                    {isToday && <span className="ml-2 text-[10px] bg-[#D4AF37]/15 text-[#D4AF37] px-2 py-0.5 rounded-full font-space tracking-wider">Today</span>}
                  </span>
                </div>
                <span className={`text-sm ${isToday ? 'text-white font-semibold' : 'text-gray-500'}`}>{item.time}</span>
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs text-gray-600 mt-4">Hours may vary on public holidays. Check WhatsApp for updates.</p>
      </div>
    </section>
  );
};

export default WorkingHours;
