import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera } from 'lucide-react';
import { GALLERY_IMAGES, GALLERY_FILTERS } from '../data/salonData';
import { splitChars, animateHeading } from '../utils/gsapAnimations';

gsap.registerPlugin(ScrollTrigger);

function GalleryCard({ item, index }) {
  const [hover, setHover] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: cardRef.current, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.fromTo(cardRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.05 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1, ease: 'power4.out', delay: index * 0.08 }
        );
      }
    });
    return () => trigger.kill();
  }, [index]);

  return (
    <div ref={cardRef}
      className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-[4/5] bg-[#111]"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onTouchStart={() => setHover(h => !h)}
      style={{ clipPath: 'inset(100% 0% 0% 0%)' }}>
      <img src={item.src} alt={`Before - ${item.alt}`}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        style={{ opacity: hover ? 0 : 1, transform: hover ? 'scale(1.08)' : 'scale(1)' }} loading="lazy" />
      {item.afterSrc && (
        <img src={item.afterSrc} alt={`After - ${item.alt}`}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          style={{ opacity: hover ? 1 : 0, transform: hover ? 'scale(1)' : 'scale(1.08)' }} loading="lazy" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className="absolute top-3 left-3">
        <span className={`text-[10px] font-space font-bold px-3 py-1 rounded-full uppercase tracking-widest transition-all duration-400 ${
          hover ? 'bg-[#D4AF37] text-black' : 'bg-black/60 text-white/80 border border-white/15'}`}>
          {hover ? 'After' : 'Before'}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
        <p className="text-white font-cormorant font-bold text-lg">{item.alt}</p>
        <p className="text-[#D4AF37] text-xs mt-0.5">{hover ? '← See before' : 'See after →'}</p>
      </div>
    </div>
  );
}

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('All');
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateHeading('gal');

      // Filter tabs — bounce
      ScrollTrigger.batch('.gal-filter', {
        start: 'top 92%', once: true,
        onEnter: (batch) => gsap.fromTo(batch, { y: 12, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.4, ease: 'back.out(1.4)' })
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Re-animate on filter change
  useEffect(() => {
    gsap.fromTo('.gallery-card', { y: 25, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out', overwrite: true });
  }, [activeTab]);

  const filtered = activeTab === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(g => g.category === activeTab);

  return (
    <section ref={ref} id="gallery" className="py-20 lg:py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#D4AF37]/[0.02] blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-10">
          <p className="gal-label text-[10px] font-space font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-4" style={{ opacity: 0 }}>Transformations</p>
          <h2 className="gal-title text-4xl sm:text-5xl lg:text-6xl font-cormorant font-bold text-white mb-5" style={{ perspective: '800px' }}>
            {splitChars('Before & ', 'gal-char')}
            <em className="not-italic italic text-[#D4AF37]">{splitChars('After', 'gal-char')}</em>
          </h2>
          <div className="gal-line h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-5" style={{ width: 0 }} />
          <p className="gal-sub text-gray-400 flex items-center justify-center gap-2 text-sm" style={{ opacity: 0 }}>
            <Camera size={14} className="text-[#D4AF37]" /> Hover or tap any photo to reveal the transformation
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {GALLERY_FILTERS.map((cat) => (
            <button key={cat} onClick={() => setActiveTab(cat)}
              className={`gal-filter px-5 py-2 rounded-full text-xs font-space font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-[#111] text-gray-500 border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]'
              }`} style={{ opacity: 0 }}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {filtered.map((item, i) => (
            <div key={item.id} className="gallery-card"><GalleryCard item={item} index={i} /></div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-600 mt-8">* Placeholder images. Real client photos coming soon!</p>
      </div>
    </section>
  );
};

export default Gallery;
