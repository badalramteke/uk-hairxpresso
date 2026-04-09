import { MARQUEE_TEXT } from '../data/salonData';

const Marquee = () => {
  const items = [...MARQUEE_TEXT, ...MARQUEE_TEXT]; // Duplicate for seamless loop

  return (
    <div className="relative py-5 md:py-6 bg-dark-400 border-y border-gold-500/10 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-track">
          {items.map((text, index) => (
            <span key={index} className="inline-flex items-center gap-4 mx-4 md:mx-6">
              <span className="text-gray-500 text-xs md:text-sm font-medium tracking-[3px] uppercase whitespace-nowrap">
                {text}
              </span>
              <span className="text-gold-500 text-xs">✦</span>
            </span>
          ))}
          {/* Second copy for seamless loop */}
          {items.map((text, index) => (
            <span key={`dup-${index}`} className="inline-flex items-center gap-4 mx-4 md:mx-6">
              <span className="text-gray-500 text-xs md:text-sm font-medium tracking-[3px] uppercase whitespace-nowrap">
                {text}
              </span>
              <span className="text-gold-500 text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
