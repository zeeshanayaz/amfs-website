import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ReactNode } from 'react'


export function BlogHeader() {
    return (
        <section className="bg-brand-navy px-6 py-20 text-primary-foreground sm:px-10">
            <div className="mx-auto max-w-7xl">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">
                    The school journal
                </p>

                <h1 className="mt-5 font-serif text-5xl font-bold sm:text-6xl">
                    Ideas, stories & inspiration
                </h1>

                <div aria-hidden="true" className="mt-6 h-1.5 w-24 rounded-full bg-brand-gold" />

                <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-off-white/80">
                    A closer look at life at Al Musleh Foundation School - where every day is a chance to learn, grow, and make a difference.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        href="#journal"
                        className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-bold text-brand-navy transition hover:-translate-y-0.5"
                    >
                        Explore our Stories
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
