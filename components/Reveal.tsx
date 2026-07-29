'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Fades content in the first time it scrolls into view.
 *
 * Content must never be able to get *stuck* invisible, so there are three
 * layers of safety: anything already on screen (or already scrolled past)
 * reveals immediately without waiting for the observer, browsers without
 * IntersectionObserver skip the animation entirely, and the `reveal` class
 * is force-shown for visitors with JavaScript disabled (see layout.tsx).
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    // Visitors who asked for less motion get the content, not the animation.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    // Already in view, or the visitor deep-linked past it — show it now.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }
    if (rect.bottom <= 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // boundingClientRect.top <= 0 catches elements that were scrolled
          // past faster than the observer could report them as intersecting.
          if (entry.isIntersecting || entry.boundingClientRect.top <= 0) {
            setVisible(true);
            observer.disconnect();
            return;
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
