'use client'

import Image from 'next/image'
import { useState } from 'react'
import { CalendarDays, X } from 'lucide-react'
import type { NewsEvent } from '@/lib/school-content'

type NewsEventsListProps = {
  items: NewsEvent[]
}

export function NewsEventsList({ items }: NewsEventsListProps) {
  const [selected, setSelected] = useState<NewsEvent | null>(null)

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="group overflow-hidden rounded-3xl border border-brand-border bg-background shadow-sm transition hover:-translate-y-1 hover:border-brand-royal">
            {item.image_url ? (
              <div className="overflow-hidden">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  width={800}
                  height={480}
                  className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
            ) : null}

            <div className="p-6">
              <span className="inline-flex rounded-full bg-brand-light px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-royal">
                {item.category}
              </span>
              <h2 className="mt-5 font-serif text-2xl font-bold text-brand-navy">{item.title}</h2>
              {item.event_date ? (
                <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-brand-orange">
                  <CalendarDays className="size-4" />
                  {new Date(item.event_date).toLocaleDateString('en-US', { dateStyle: 'long' })}
                </p>
              ) : null}
              <p className="mt-4 text-sm leading-6 text-brand-dark-gray line-clamp-3">{item.excerpt}</p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="rounded-full bg-brand-navy px-4 py-3 text-sm font-bold text-primary-foreground transition hover:bg-brand-royal"
                >
                  View details
                </button>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">Read full story</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-brand-navy/65 p-4 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="news-event-title">
          <div className="max-h-[92vh] w-full overflow-hidden rounded-t-3xl bg-background shadow-2xl sm:max-w-3xl sm:rounded-3xl">
            <div className="flex items-start justify-between gap-4 border-b border-brand-border p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">{selected.category}</p>
                <h2 id="news-event-title" className="mt-2 font-serif text-3xl font-bold text-brand-navy">{selected.title}</h2>
                {selected.event_date ? (
                  <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-brand-dark-gray">
                    <CalendarDays className="size-4" />
                    {new Date(selected.event_date).toLocaleDateString('en-US', { dateStyle: 'long' })}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close details"
                className="rounded-full p-2 text-brand-dark-gray transition hover:bg-brand-light hover:text-brand-navy"
              >
                <X className="size-5" />
              </button>
            </div>

            {selected.image_url ? (
              <div className="overflow-hidden">
                <Image
                  src={selected.image_url}
                  alt={selected.title}
                  width={1200}
                  height={700}
                  className="h-72 w-full object-cover"
                />
              </div>
            ) : null}

            <div className="space-y-6 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-brand-dark-gray">Type</p>
                  <p className="mt-2 text-sm font-semibold text-brand-navy">{selected.category}</p>
                </div>
                {selected.event_date ? (
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-brand-dark-gray">Event date</p>
                    <p className="mt-2 text-sm font-semibold text-brand-navy">{new Date(selected.event_date).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
                  </div>
                ) : null}
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-brand-dark-gray">Summary</p>
                <p className="mt-2 text-sm leading-7 text-brand-dark-gray">{selected.excerpt}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-brand-dark-gray">Details</p>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-brand-dark-gray">{selected.body}</p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full bg-brand-navy px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-royal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
