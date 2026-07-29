import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} — home`}>
      <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-soft ring-1 ring-brand-100 transition-transform duration-300 group-hover:scale-105">
        <Image src="/logo.svg" alt="" width={44} height={44} priority className="h-11 w-11" />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block font-display text-[17px] font-semibold text-ink">{site.name}</span>
          <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-brand-600">
            Speak with confidence
          </span>
        </span>
      )}
    </Link>
  );
}
