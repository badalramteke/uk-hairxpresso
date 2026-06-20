import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Detect mobile for reduced animations */
export const isMobile = () => window.innerWidth < 768;

/**
 * Trigger start position — FIXED FOR MOBILE.
 * 
 * Previous: 'top bottom' on mobile → elements invisible until user scrolled
 * past them entirely. Now uses 'top 98%' so elements animate in just before
 * they enter the viewport, feeling instant without jank.
 */
export const mStart = () => isMobile() ? 'top 98%' : 'top 90%';

/** Split text into <span> per character for GSAP stagger */
export function splitChars(text, className = '') {
  return text.split('').map((char, i) => (
    <span key={i}
      className={`inline-block ${className}`}
      style={char === ' ' ? { width: '0.3em' } : undefined}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
}

/**
 * Animate a section heading block — MOBILE OPTIMIZED.
 * On mobile: simpler fade-up, no per-char rotateX, fires earlier.
 * On desktop: full 3D char stagger.
 */
export function animateHeading(prefix) {
  const mobile = isMobile();
  const start = mStart();
  const dur = mobile ? 0.25 : 0.4;

  gsap.fromTo(`.${prefix}-label`,
    { y: 8, opacity: 0 },
    { y: 0, opacity: 1, duration: dur, ease: 'power2.out',
      scrollTrigger: { trigger: `.${prefix}-label`, start, once: true } }
  );

  if (mobile) {
    // Mobile: animate the whole title as one block, skip per-char
    gsap.fromTo(`.${prefix}-title`,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out',
        scrollTrigger: { trigger: `.${prefix}-title`, start, once: true } }
    );
    // Set chars visible immediately since they start hidden
    gsap.set(`.${prefix}-char`, { opacity: 1, y: 0, rotateX: 0 });
  } else {
    // Desktop: per-char 3D stagger
    gsap.fromTo(`.${prefix}-char`,
      { y: 25, opacity: 0, rotateX: -20 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.4, stagger: 0.015, ease: 'power2.out',
        scrollTrigger: { trigger: `.${prefix}-title`, start, once: true } }
    );
  }

  gsap.fromTo(`.${prefix}-line`,
    { width: 0 },
    { width: 60, duration: 0.35, ease: 'power2.inOut',
      scrollTrigger: { trigger: `.${prefix}-line`, start, once: true } }
  );

  if (document.querySelector(`.${prefix}-sub`)) {
    gsap.fromTo(`.${prefix}-sub`,
      { y: 8, opacity: 0 },
      { y: 0, opacity: 1, duration: dur, ease: 'power2.out',
        scrollTrigger: { trigger: `.${prefix}-sub`, start, once: true } }
    );
  }
}

/**
 * Batch-animate cards — fires much earlier on mobile now.
 * Reduced stagger and duration on mobile for snappier feel.
 */
export function batchCards(selector, fromVars = {}) {
  const mobile = isMobile();
  ScrollTrigger.batch(selector, {
    start: mobile ? 'top 98%' : 'top 90%',
    once: true,
    onEnter: (batch) => {
      gsap.fromTo(batch,
        mobile ? { y: 12, opacity: 0 } : { y: 35, opacity: 0, ...fromVars },
        { y: 0, opacity: 1, stagger: mobile ? 0.03 : 0.07, duration: mobile ? 0.3 : 0.55, ease: 'power2.out', overwrite: true }
      );
    }
  });
}
