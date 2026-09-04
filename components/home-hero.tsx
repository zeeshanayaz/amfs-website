import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Stats } from './about/stats'

export function HomeHero() {
  return (
    <section aria-labelledby="home-hero-heading" className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-white sm:min-h-[calc(100vh-5rem)]">
      <div aria-hidden="true" className="absolute -right-20 top-10 h-72 w-72 rounded-full border-[32px] border-brand-sky/10" />
      <div aria-hidden="true" className="absolute bottom-0 left-0 h-40 w-40 rounded-tr-[5rem] bg-brand-gold/15" />
      <div aria-hidden="true" className="absolute left-0 top-0 h-full w-1 bg-brand-gold" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-24">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-brand-sky" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-sky">Al Musleh Foundation School</span>
          </div>
          <h1 id="home-hero-heading" className="max-w-xl font-serif text-5xl font-semibold leading-[1.04] tracking-tight text-brand-navy text-balance sm:text-6xl lg:text-7xl">
            A bright start for a <span className="text-brand-royal">meaningful future.</span>
          </h1>
          <div aria-hidden="true" className="mt-6 h-1.5 w-24 rounded-full bg-brand-gold" />
          <p className="mt-7 max-w-lg text-base leading-7 text-brand-dark-gray sm:text-lg">
            A caring school community in Karachi where children learn with confidence, character, and purpose.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/#campuses" className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-navy/20 transition hover:-translate-y-0.5 hover:bg-brand-royal">
              Explore campuses <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy transition hover:-translate-y-0.5 hover:border-brand-sky">
              Meet AMFS
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:mx-0">
          <div className="absolute -bottom-5 -left-5 h-full w-full rounded-[2rem] bg-brand-sky" />
          <div className="relative overflow-hidden rounded-[2rem] border-8 border-brand-navy bg-brand-navy shadow-2xl shadow-brand-navy/20">
            <Image src="/images/about-classroom.webp" alt="Students learning together in an AMFS classroom" width={900} height={650} priority className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -right-3 -top-5 rounded-2xl bg-brand-gold px-4 py-3 text-brand-navy shadow-lg sm:-right-6 sm:-top-6">
            <p className="font-serif text-2xl font-bold leading-none">5</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider">Campuses</p>
          </div>
        </div>
      </div>

      <Stats />
    </section>
  )
}
