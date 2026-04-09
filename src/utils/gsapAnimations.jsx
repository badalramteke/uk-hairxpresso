import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
 * Animate a section heading block. Call inside gsap.context().
 * Expects elements with classes: {prefix}-label, {prefix}-char, {prefix}-title, {prefix}-line, {prefix}-sub
 */
export function animateHeading(prefix) {
  gsap.fromTo(`.${prefix}-label`,
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: `.${prefix}-label`, start: 'top 90%', once: true } }
  );

  gsap.fromTo(`.${prefix}-char`,
    { y: 40, opacity: 0, rotateX: -35 },
    { y: 0, opacity: 1, rotateX: 0, duration: 0.5, stagger: 0.02, ease: 'power3.out',
      scrollTrigger: { trigger: `.${prefix}-title`, start: 'top 88%', once: true } }
  );

  gsap.fromTo(`.${prefix}-line`,
    { width: 0 },
    { width: 60, duration: 0.6, ease: 'power2.inOut',
      scrollTrigger: { trigger: `.${prefix}-line`, start: 'top 92%', once: true } }
  );

  if (document.querySelector(`.${prefix}-sub`)) {
    gsap.fromTo(`.${prefix}-sub`,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: `.${prefix}-sub`, start: 'top 92%', once: true } }
    );
  }
}

/**
 * Batch-animate cards — single ScrollTrigger for all matching elements.
 * Much more performant than one ScrollTrigger per card.
 */
export function batchCards(selector, fromVars = {}) {
  ScrollTrigger.batch(selector, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => {
      gsap.fromTo(batch,
        { y: 50, opacity: 0, ...fromVars },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.75, ease: 'power3.out', overwrite: true }
      );
    }
  });
}
