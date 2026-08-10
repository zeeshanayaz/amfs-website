import Image from 'next/image'
import { CalendarDays, Newspaper } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { NewsEvent } from '@/lib/school-content'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

export default async function NewsEventsPage() {
    const supabase = createClient()
    const { data } = await supabase.from('news_events').select('*').eq('is_published', true).order('event_date', { ascending: false, nullsFirst: false }).order('created_at', { ascending: false })
    const items = (data ?? []) as NewsEvent[]
    return (
        <>
            <Navbar />
            <main className="bg-brand-off-white text-brand-navy"><section className="bg-brand-navy px-6 py-20 text-primary-foreground sm:px-10"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">Stay connected</p><h1 className="mt-5 font-serif text-5xl font-bold sm:text-6xl">News & Events</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-brand-off-white/80">The latest announcements, school moments, and upcoming events from our community.</p></div></section><section className="mx-auto max-w-7xl px-6 py-16 sm:px-10">{items.length === 0 ? <div className="rounded-3xl border border-dashed border-brand-border bg-background p-16 text-center"><Newspaper className="mx-auto size-10 text-brand-royal" /><h2 className="mt-5 font-serif text-2xl font-bold">News is on the way</h2><p className="mt-2 text-brand-dark-gray">Check back soon for announcements and school events.</p></div> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{items.map((item) => <article key={item.id} className="overflow-hidden rounded-3xl border border-brand-border bg-background shadow-sm">{item.image_url && <Image src={item.image_url} alt="" width={800} height={480} className="h-48 w-full object-cover" />}<div className="p-6"><span className="rounded-full bg-brand-light px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-royal">{item.category}</span><h2 className="mt-5 font-serif text-2xl font-bold">{item.title}</h2>{item.event_date && <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-brand-orange"><CalendarDays className="size-4" />{new Date(item.event_date).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>}<p className="mt-4 text-sm leading-6 text-brand-dark-gray">{item.excerpt}</p><p className="mt-5 whitespace-pre-line text-sm leading-7 text-brand-dark-gray">{item.body}</p></div></article>)}</div>}</section></main>
            <Footer />
        </>
    )
}
