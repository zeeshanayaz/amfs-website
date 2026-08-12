'use client'

import Image from 'next/image'
import { NewsEventsList } from '@/components/news-events-list'
import { Lightbox } from '@/components/ui/lightbox'
import { createClient } from '@/lib/supabase/client'
import type { NewsEvent } from '@/lib/school-content'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Newspaper } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function NewsEventsPage() {
  const [items, setItems] = useState<NewsEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<NewsEvent | null>(null)
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null)
  const detailRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const supabase = createClient()

    async function loadNews() {
      const { data } = await supabase
        .from('news_events')
        .select('*')
        .eq('is_published', true)
        .order('event_date', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })

      setItems((data ?? []) as NewsEvent[])
      setLoading(false)
    }

    void loadNews()
  }, [])

  useEffect(() => {
    if (selectedItem && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [selectedItem])

  return (
    <>
      <Navbar />

      <main className="bg-brand-off-white text-brand-navy">
        <section className="bg-brand-navy px-6 py-20 text-primary-foreground sm:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">Stay connected</p>
            <h1 className="mt-5 font-serif text-5xl font-bold sm:text-6xl">News & Events</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-off-white/80">
              The latest announcements, school moments, and upcoming events from our community.
            </p>
          </div>
        </section>

        {selectedItem ? (
          <section ref={detailRef} className="mx-auto max-w-7xl px-6 py-12 sm:px-10">
            <article className="overflow-hidden rounded-[28px] border border-brand-border bg-white shadow-sm">
              {selectedItem.image_url ? (
                <div className="relative overflow-hidden bg-brand-off-white">
                  <Image
                    src={selectedItem.image_url}
                    alt={selectedItem.title}
                    width={1400}
                    height={700}
                    className="h-72 w-full object-cover sm:h-[420px]"
                  />
                  <button
                    type="button"
                    onClick={() => setPreviewImage({ src: selectedItem.image_url!, title: selectedItem.title })}
                    className="absolute inset-0 bg-transparent"
                    aria-label={`Preview ${selectedItem.title} in full screen`}
                  />
                </div>
              ) : null}
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex rounded-full bg-brand-light px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-brand-royal">
                    {selectedItem.category}
                  </span>
                  {selectedItem.event_date ? (
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-dark-gray">
                      {new Date(selectedItem.event_date).toLocaleDateString('en-US', { dateStyle: 'long' })}
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-5 font-serif text-4xl font-bold text-brand-navy sm:text-5xl">
                  {selectedItem.title}
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-dark-gray">
                  {selectedItem.excerpt}
                </p>
                <div className="mt-8 space-y-8 text-sm leading-7 text-brand-dark-gray sm:text-base">
                  <p className="whitespace-pre-line">{selectedItem.body}</p>
                </div>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="inline-flex items-center justify-center rounded-full bg-brand-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-royal"
                  >
                    Back to news list
                  </button>
                  <p className="text-xs uppercase tracking-[0.25em] text-brand-dark-gray">
                    Scroll to continue reading other stories below
                  </p>
                </div>
              </div>
            </article>
          </section>
        ) : null}

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
          {loading ? (
            <div className="rounded-3xl border border-brand-border bg-background p-12 text-center">
              <p className="font-semibold text-brand-navy">Loading…</p>
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-brand-border bg-background p-16 text-center">
              <Newspaper className="mx-auto size-10 text-brand-royal" />
              <h2 className="mt-5 font-serif text-2xl font-bold">News is on the way</h2>
              <p className="mt-2 text-brand-dark-gray">Check back soon for announcements and school events.</p>
            </div>
          ) : (
            <NewsEventsList
              items={items}
              onItemSelect={setSelectedItem}
              onImagePreview={setPreviewImage}
            />
          )}
        </section>
      </main>

      <Lightbox
        open={Boolean(previewImage)}
        title={previewImage?.title}
        onClose={() => setPreviewImage(null)}
      >
        {previewImage ? (
          <Image
            src={previewImage.src}
            alt={previewImage.title}
            width={1600}
            height={1200}
            className="h-[75vh] w-full object-contain"
          />
        ) : null}
      </Lightbox>

      <Footer />
    </>
  )
}
