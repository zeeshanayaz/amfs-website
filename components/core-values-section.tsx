import {
  BookOpen,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import coreValues from '@/data/core-values.json'

const iconMap = {
  'book-open': BookOpen,
  sparkles: Sparkles,
  'heart-handshake': HeartHandshake,
  lightbulb: Lightbulb,
  'trending-up': TrendingUp,
  'shield-check': ShieldCheck,
} as const

// Alternates between royal blue and sky blue for icon accent
const accentColors = ['#3D63B8', '#37A9E8']

export function CoreValuesSection() {
  return (
    <section
      aria-labelledby="core-values-heading"
      className="bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <header className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
            <span className="text-brand-sky text-[11px] font-semibold uppercase tracking-[0.3em]">
              What Guides Us
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
          </div>
          <h2
            id="home-values-heading"
            className="font-serif font-bold text-brand-navy text-3xl sm:text-5xl leading-tight text-balance mb-4"
          >
            Core Values That Shape Every Day.
          </h2>
          <p className="text-brand-dark-gray text-base sm:text-lg leading-relaxed">
            Every aspect of life at Al Musleh Foundation School is guided by enduring values
            that shape remarkable students and responsible citizens.
          </p>
        </header>

        {/* Values grid */}
        <div
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {coreValues.map((value, i) => {
            const Icon = iconMap[value.icon as keyof typeof iconMap]
            const accent = accentColors[i % 2]
            return (
              <article
                key={value.title}
                role="listitem"
                className="group relative rounded-2xl border border-brand-border bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10 hover:border-transparent"
              >
                {/* Top accent line animates in on hover */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-6 right-6 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ backgroundColor: accent }}
                />

                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 transition-colors duration-200"
                  style={{ backgroundColor: `${accent}18` }}
                >
                  <Icon
                    size={22}
                    aria-hidden="true"
                    style={{ color: accent }}
                    strokeWidth={1.75}
                  />
                </div>

                {/* Gold dot accent */}
                <div aria-hidden="true" className="w-6 h-0.5 bg-brand-gold rounded-full mb-3" />

                <h3 className="font-serif font-bold text-brand-navy text-lg mb-2 leading-snug">
                  {value.title}
                </h3>
                <p className="text-brand-dark-gray text-sm leading-relaxed">{value.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
