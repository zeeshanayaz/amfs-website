import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronRight, MapPin, Phone } from 'lucide-react'
import campuses from '@/data/campuses.json'

interface CampusesSectionProps {
  showViewAll?: boolean
}

export function CampusesSection({ showViewAll = false }: CampusesSectionProps) {
  return (
    <section
      id="campuses"
      aria-labelledby="campuses-heading"
      className="bg-brand-navy py-24 text-white sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end mb-14">
          <div>
            {/* Eyebrow in gold for dark bg */}
            <div className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
              <span className="text-brand-gold text-[11px] font-semibold uppercase tracking-[0.3em]">
                Our campuses
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
            </div>
            <h2
              id="campuses-heading"
              className="font-serif text-4xl font-semibold sm:text-5xl text-balance"
            >
              Close to the communities we serve.
            </h2>
            {/* Gold underline */}
            <div aria-hidden="true" className="flex items-center gap-2 mt-4">
              <div className="w-6 h-0.5 bg-brand-gold/50 rounded-full" />
              <div className="w-16 h-1 bg-brand-gold rounded-full" />
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/65">
            Five campuses across Karachi, united by one commitment to quality education.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {campuses.map((campus, i) => (
            <article
              key={campus.name}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] transition-all duration-300 hover:bg-white/[0.12] hover:border-brand-sky/40 hover:-translate-y-1"
            >
              <div className="relative h-40 overflow-hidden bg-white/[0.05] transition-colors duration-300 group-hover:bg-white/[0.09]">
                <Image
                  src={campus.image}
                  alt={campus.name}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{campus.name}</h3>
                    {campus.type && (
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-gold">
                        {campus.type}
                      </p>
                    )}
                  </div>
                  {/* Campus number badge */}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-brand-navy">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm text-white/70">
                  <p className="flex gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-sky" />
                    {campus.address}
                  </p>
                  <p className="flex gap-2">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-sky" />
                    {campus.phone}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {campus.mapUrl && (
                    <a
                      href={campus.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-4 py-2 text-xs font-bold text-brand-navy transition-all duration-200 hover:bg-brand-gold/90 hover:shadow-md hover:shadow-brand-gold/20"
                    >
                      View on map <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition-all duration-200 hover:border-white/40 hover:text-white"
                  >
                    View details <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {showViewAll && (
          <div className="mt-12 text-center">
            <Link
              href="/about#campuses"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5"
            >
              View full campus details <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
