'use client';

import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { CloseIcon, MenuIcon, WhatsAppIcon } from './Icons';
import { whatsappLink } from '@/lib/site';

const navLinks = [
  { href: '#courses', label: 'Courses' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#results', label: 'Results' },
  { href: '#about', label: 'About' },
  { href: '#faq', label: 'FAQ' },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-brand-100/80 bg-sand/85 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ height: 'var(--header-height)' }}
    >
      <div className="container-page flex h-full items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp hidden px-5 py-2.5 text-sm sm:inline-flex"
            data-cta="header-whatsapp"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            Book free demo
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-brand-100 bg-white text-ink shadow-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <MenuIconSwap open /> : <MenuIconSwap />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[var(--header-height)] z-40 origin-top border-b border-brand-100 bg-sand px-5 pb-8 pt-4 shadow-lift transition-all duration-300 lg:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
        }`}
      >
        <nav className="flex flex-col" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-brand-100/70 py-3.5 text-lg font-medium text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full"
            onClick={() => setOpen(false)}
            data-cta="mobile-menu-whatsapp"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Book a free demo class
          </a>
          <a href="#enquiry" onClick={() => setOpen(false)} className="btn-ghost w-full">
            Fill the enquiry form
          </a>
        </div>
      </div>
    </header>
  );
}

function MenuIconSwap({ open = false }: { open?: boolean }) {
  return open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />;
}
