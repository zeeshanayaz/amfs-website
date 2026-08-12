'use client'

import Image from 'next/image'
import type { NewsEvent } from '@/lib/school-content'

type NewsEventsListProps = {
  items: NewsEvent[]
  onItemSelect: (item: NewsEvent) => void
  onImagePreview?: (image: { src: string; title: string }) => void
}

export function NewsEventsList({ items, onItemSelect, onImagePreview }: NewsEventsListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          role="button"
          tabIndex={0}
          onClick={() => onItemSelect(item)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onItemSelect(item)
            }
          }}
          className="group text-left overflow-hidden rounded-3xl border border-brand-border bg-background shadow-sm transition hover:-translate-y-1 hover:border-brand-royal focus:outline-none focus:ring-2 focus:ring-brand-sky"
        >
          {item.image_url ? (
            <div className="relative overflow-hidden">
              <Image
                src={item.image_url}
                alt={item.title}
                width={800}
                height={480}
                className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  if (item.image_url) {
                    onImagePreview?.({ src: item.image_url, title: item.title })
                  }
                }}
                className="absolute inset-0 cursor-zoom-in bg-transparent"
                aria-label={`Preview image for ${item.title}`}
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
                <span className="inline-flex items-center gap-2">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-brand-orange"><path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1z" fill="currentColor"/></svg>
                  {new Date(item.event_date).toLocaleDateString('en-US', { dateStyle: 'long' })}
                </span>
              </p>
            ) : null}
            <p className="mt-4 text-sm leading-6 text-brand-dark-gray line-clamp-3">{item.excerpt}</p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="inline-flex rounded-full bg-brand-navy px-4 py-3 text-sm font-bold text-primary-foreground transition group-hover:bg-brand-royal">
                View details
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-dark-gray">Read full story</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
