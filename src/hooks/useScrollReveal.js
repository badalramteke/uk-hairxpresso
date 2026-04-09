import { useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-reveal animations using IntersectionObserver.
 * Lightweight alternative to heavy animation libraries for scroll triggers.
 * 
 * Usage: 
 *   const ref = useScrollReveal();
 *   <div ref={ref} className="reveal">...</div>
 * 
 * CSS classes: reveal, reveal-left, reveal-right, reveal-scale
 * All get the .active class added when they scroll into view.
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe the element itself and all reveal children
    const revealElements = element.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach((el) => observer.observe(el));
    
    if (element.classList.contains('reveal') || 
        element.classList.contains('reveal-left') || 
        element.classList.contains('reveal-right') || 
        element.classList.contains('reveal-scale')) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

/**
 * Hook to observe multiple elements in a container for staggered reveals.
 * Each child with a reveal class gets a staggered delay.
 */
export function useStaggerReveal(staggerDelay = 100) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(children).indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('active');
            }, index * staggerDelay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    children.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [staggerDelay]);

  return ref;
}

export default useScrollReveal;
