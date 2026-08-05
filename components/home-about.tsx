import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export function HomeAbout() {
  return (
    <section
      aria-labelledby="home-about-heading"
      className="bg-brand-off-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">

          {/* Left: Decorative card */}
          <div className="relative min-h-[440px] overflow-hidden rounded-[2rem] bg-brand-navy p-8 shadow-2xl shadow-brand-navy/20">
            {/* Decorative ring */}
            <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full border-[30px] border-brand-sky/15" />
            <div className="absolute -left-8 -bottom-8 h-36 w-36 rounded-full border-[20px] border-brand-gold/10" />

            <div className="relative flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-8 min-h-[380px]">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-navy">
                  Our Foundation
                </span>
                <BookOpen className="h-7 w-7 text-brand-gold" />
              </div>

              {/* Stacked typographic statement */}
              <div className="my-8">
                <p className="font-serif text-5xl leading-[1.1] text-white sm:text-6xl">Learn.</p>
                <p className="font-serif text-5xl leading-[1.1] text-brand-sky sm:text-6xl">Lead.</p>
                <p className="font-serif text-5xl leading-[1.1] text-brand-gold sm:text-6xl">Live well.</p>
              </div>

              <p className="text-sm leading-6 text-white/60 max-w-xs">
                A place where every learner is seen, supported, and inspired to grow.
              </p>
            </div>
          </div>

          {/* Right: Text content */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span aria-hidden="true" className="h-px w-10 bg-brand-sky" />
              <span className="text-brand-sky text-[11px] font-semibold uppercase tracking-[0.3em]">
                Our Story
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-brand-sky" />
            </div>

            <h2
              id="home-about-heading"
              className="font-serif text-4xl font-semibold leading-tight text-brand-navy sm:text-5xl text-balance"
            >
              Education with purpose at its heart.
            </h2>

            {/* Gold underline */}
            <div aria-hidden="true" className="flex items-center gap-2 mt-4 mb-7">
              <div className="w-6 h-0.5 bg-brand-gold/50 rounded-full" />
              <div className="w-16 h-1 bg-brand-gold rounded-full" />
            </div>

            <div className="space-y-5 text-base leading-8 text-brand-dark-gray">
              <p>
                Al Musleh Foundation School exists to give children a strong beginning and a clear
                sense of possibility. We bring together committed teachers, supportive families, and
                a thoughtful learning environment where academic progress and personal growth move
                together.
              </p>
              <p>
                Across our five campuses in Karachi, we combine a modern approach to learning with
                the timeless values that help students become thoughtful, courageous, and
                compassionate members of society.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-navy/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-navy/20"
              >
                Discover our story <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#campuses"
                className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy transition-all duration-200 hover:border-brand-sky hover:text-brand-royal hover:-translate-y-0.5 hover:shadow-md"
              >
                View our campuses
              </Link>
            </div>

            {/* Pull quote */}
            <div className="mt-10 flex items-center gap-3 text-sm font-semibold text-brand-navy">
              <span aria-hidden="true" className="h-px w-12 bg-brand-gold" />
              Growing minds. Strong character.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
