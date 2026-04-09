import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useBooking } from '../context/BookingContext';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Offers', href: '#offers' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // GSAP — stagger entrance of nav links on load
    gsap.fromTo(linksRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out', delay: 3.5 }
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP — mobile menu open/close
  useEffect(() => {
    if (!mobileRef.current) return;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(mobileRef.current,
        { clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' },
        { clipPath: 'circle(150% at calc(100% - 2rem) 2rem)', duration: 0.7, ease: 'power4.out' }
      );
      gsap.fromTo('.mobile-link',
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.07, duration: 0.5, delay: 0.2, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(mobileRef.current,
        { clipPath: 'circle(0% at calc(100% - 2rem) 2rem)', duration: 0.5, ease: 'power3.in' }
      );
    }
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050505]/95 backdrop-blur-xl shadow-lg shadow-black/50 border-b border-[#D4AF37]/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group">
            <img src="/images/logo_and_name.jpg" alt="UK HairXpresso"
              className="h-10 sm:h-12 w-auto object-contain rounded-lg border border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => (linksRef.current[i] = el)}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-[11px] tracking-[0.18em] text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 font-space font-semibold uppercase
                  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] after:transition-all after:duration-300
                  hover:after:w-full"
                style={{ opacity: 0 }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button onClick={() => openBooking()}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-black text-[11px] font-space font-bold rounded-full hover:bg-[#1EBE5D] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all duration-300 uppercase tracking-widest">
              <FaWhatsapp size={14} /> Book Now
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-[#D4AF37] transition-colors" aria-label="Toggle menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay — GSAP clip-path reveal */}
      <div ref={mobileRef}
        className="fixed inset-0 z-[60] bg-[#050505] flex flex-col items-center justify-center gap-7"
        style={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}>
        <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white" aria-label="Close">
          <X size={28} />
        </button>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
            className="mobile-link text-2xl tracking-[0.2em] text-gray-300 hover:text-[#D4AF37] transition-colors font-cormorant font-bold uppercase opacity-0">
            {link.label}
          </a>
        ))}
        <button onClick={() => { setMenuOpen(false); openBooking(); }}
          className="mobile-link mt-4 flex items-center gap-2 bg-[#25D366] text-black font-space font-bold px-8 py-3.5 rounded-full text-sm tracking-widest opacity-0">
          <FaWhatsapp size={18} /> BOOK NOW
        </button>
      </div>
    </>
  );
};

export default Navbar;
