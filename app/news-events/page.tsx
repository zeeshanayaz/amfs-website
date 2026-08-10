import { NewsEventsList } from '@/components/news-events-list'
import { createClient } from '@/lib/supabase/client'
import type { NewsEvent } from '@/lib/school-content'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Newspaper } from 'lucide-react'

export default async function NewsEventsPage() {
  const supabase = createClient()
  const { data } = await supabase
    .from('news_events')
    .select('*')
    .eq('is_published', true)
    .order('event_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  const items = (data ?? []) as NewsEvent[]

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

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-brand-border bg-background p-16 text-center">
              <Newspaper className="mx-auto size-10 text-brand-royal" />
              <h2 className="mt-5 font-serif text-2xl font-bold">News is on the way</h2>
              <p className="mt-2 text-brand-dark-gray">Check back soon for announcements and school events.</p>
            </div>
          ) : (
            <NewsEventsList items={items} />
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}
