'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { testimonials } from '@/lib/content';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon, StarIcon } from './Icons';

export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const children = Array.from(track.children) as HTMLElement[];
        const centre = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let smallest = Infinity;
        children.forEach((child, index) => {
          const distance = Math.abs(child.offsetLeft - track.offsetLeft + child.clientWidth / 2 - centre);
          if (distance < smallest) {
            smallest = distance;
            closest = index;
          }
        });
        setActive(closest);
      });
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="results" className="section scroll-mt-24 bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="Student stories"
          title="They were exactly where you are right now"
          subtitle="Every one of them joined nervous, convinced they would be the worst in the batch. Nobody ever is."
        />

        <div className="relative mt-14">
          <ul
            ref={trackRef}
            className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
            aria-label="Student testimonials"
          >
            {testimonials.map((testimonial) => (
              <li
                key={testimonial.name}
                className="w-[86%] shrink-0 snap-center sm:w-[58%] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <figure className="flex h-full flex-col rounded-3xl border border-brand-100 bg-sand p-6 shadow-soft">
                  <QuoteIcon className="h-7 w-7 text-brand-200" />
                  <blockquote className="mt-4 flex-1 text-pretty text-[15px] leading-relaxed text-ink-soft">
                    {testimonial.quote}
                  </blockquote>

                  <div className="mt-5 flex items-center gap-3 border-t border-brand-100 pt-5">
                    {testimonial.photo ? (
                      <Image
                        src={testimonial.photo}
                        alt=""
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
                        {testimonial.initials}
                      </span>
                    )}
                    <figcaption className="min-w-0">
                      <p className="truncate font-semibold text-ink">{testimonial.name}</p>
                      <p className="truncate text-sm text-ink-muted">
                        {testimonial.role} · {testimonial.city}
                      </p>
                    </figcaption>
                    <span className="ml-auto flex shrink-0 text-accent-500" aria-label={`${testimonial.rating} out of 5`}>
                      {Array.from({ length: testimonial.rating }).map((_, index) => (
                        <StarIcon key={index} className="h-3.5 w-3.5" />
                      ))}
                    </span>
                  </div>
                </figure>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, active - 1))}
              disabled={active === 0}
              className="grid h-10 w-10 place-items-center rounded-full border border-brand-200 bg-white text-ink shadow-sm transition hover:border-brand-400 disabled:opacity-40"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>

            <div className="flex gap-1.5" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === active ? 'w-6 bg-brand-600' : 'w-2 bg-brand-200 hover:bg-brand-300'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(testimonials.length - 1, active + 1))}
              disabled={active === testimonials.length - 1}
              className="grid h-10 w-10 place-items-center rounded-full border border-brand-200 bg-white text-ink shadow-sm transition hover:border-brand-400 disabled:opacity-40"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-sm text-ink-muted">
            Reviews are shared with each student&apos;s permission.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
