import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Star, MapPin, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, value: 5000, suffix: '+', label: 'Happy Clients', decimal: false },
  { icon: Calendar, value: 5, suffix: '+', label: 'Years in Ramtek', decimal: false },
  { icon: MapPin, value: 2, suffix: '', label: 'Locations', decimal: false },
  { icon: Star, value: 4.9, suffix: '', label: 'Avg. Rating', decimal: true },
];

const ROW1 = ['UK HAIRXPRESSO', '✦', 'RAMTEK', '✦', 'LUXURY GROOMING', '✦', 'SINCE 2019', '✦', 'BEARD STYLING', '✦', 'HAIR SPA', '✦'];
const ROW2 = ['TATTOO STUDIO', '✦', 'MANICURE', '✦', 'NAGARDHAN', '✦', 'PRO GROOMING', '✦', 'PREMIUM PRODUCTS', '✦', 'EXPERT STYLISTS', '✦'];

function Marquee({ items, speed = 30, reverse = false }) {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const dir = reverse ? '+=' : '-=';
    const tween = gsap.to(trackRef.current, {
      x: `${dir}50%`,
      duration: speed,
      repeat: -1,
      ease: 'none',
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (trackRef.current.scrollWidth / 2))
      }
    });
    return () => tween.kill();
  }, [speed, reverse]);

  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap py-3">
      <div ref={trackRef} className="inline-flex gap-6 will-change-transform">
        {doubled.map((item, i) => (
          <span key={i}
            className={`text-[11px] font-space font-bold tracking-[0.2em] shrink-0 ${
              item === '✦' ? 'text-[#D4AF37]' : 'text-white/[0.08]'
            }`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatCounter({ stat, index }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;

        // Animate counter
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2.5,
          ease: 'power2.out',
          onUpdate: () => setCount(stat.decimal ? parseFloat(obj.val.toFixed(1)) : Math.floor(obj.val))
        });

        // Entrance animation with stagger
        gsap.fromTo(el,
          { opacity: 0, y: 50, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.4)', delay: index * 0.15 }
        );
      }
    });

    return () => trigger.kill();
  }, [stat, index]);

  return (
    <div ref={ref} className="text-center group" style={{ opacity: 0 }}>
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center
                      group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/40 group-hover:scale-110 transition-all duration-500">
        <stat.icon className="text-[#D4AF37]" size={22} />
      </div>
      <p className="text-4xl sm:text-5xl font-bold text-white font-cormorant mb-1">
        {stat.decimal ? count.toFixed(1) : count.toLocaleString()}{stat.suffix}
      </p>
      <p className="text-sm text-gray-500 tracking-wide font-dm">{stat.label}</p>
    </div>
  );
}

export default function SocialProof() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the marquee rows
      gsap.to('.marquee-row-1', {
        x: -30,
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
      gsap.to('.marquee-row-2', {
        x: 30,
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="stats" className="bg-[#0a0a0a] border-y border-[#D4AF37]/10">
      {/* Dual Marquee */}
      <div className="py-5 border-b border-[#D4AF37]/[0.06] overflow-hidden">
        <div className="marquee-row-1"><Marquee items={ROW1} speed={32} /></div>
        <div className="marquee-row-2"><Marquee items={ROW2} speed={28} reverse /></div>
      </div>

      {/* Stats */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {stats.map((stat, i) => (
              <StatCounter key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
