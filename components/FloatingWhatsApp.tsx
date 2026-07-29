'use client';

import { useEffect, useState } from 'react';
import { site, whatsappLink } from '@/lib/site';
import { CloseIcon, WhatsAppIcon } from './Icons';

/**
 * Sticky WhatsApp button — the single most important conversion element on a
 * site whose traffic arrives from Instagram. Appears once the visitor has
 * scrolled past the hero, with a one-time nudge bubble.
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!visible || dismissed) return;
    const shown = sessionStorage.getItem('ep_wa_nudge');
    if (shown) return;
    const timer = setTimeout(() => {
      setNudge(true);
      sessionStorage.setItem('ep_wa_nudge', '1');
    }, 3500);
    return () => clearTimeout(timer);
  }, [visible, dismissed]);

  return (
    <div
      className={`fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 transition-all duration-500 sm:bottom-6 sm:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      {nudge && !dismissed && (
        <div className="relative max-w-[16rem] rounded-2xl rounded-br-sm border border-brand-100 bg-white p-4 pr-9 shadow-lift">
          <button
            type="button"
            onClick={() => {
              setNudge(false);
              setDismissed(true);
            }}
            className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-ink-muted hover:bg-brand-50"
            aria-label="Close message"
          >
            <CloseIcon className="h-3.5 w-3.5" />
          </button>
          <p className="text-sm font-semibold text-ink">Have a question?</p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
            Message {site.founder} directly — the free demo class gets booked here.
          </p>
        </div>
      )}

      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lift transition-transform hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
        data-cta="floating-whatsapp"
      >
        <span
          aria-hidden
          className="absolute inset-0 animate-pulse-ring rounded-full bg-whatsapp/60"
        />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>
    </div>
  );
}
