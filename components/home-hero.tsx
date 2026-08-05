import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, MapPin, Users } from 'lucide-react'

// Decorative fan watermark — same motif used across the site
function FanWatermark() {
  const lines = Array.from({ length: 22 }, (_, i) => {
    const startDeg = 8
    const endDeg = 172
    const deg = startDeg + (i / 21) * (endDeg - startDeg)
    const rad = (deg * Math.PI) / 180
    const R = 480
    const cx = 480
    const cy = 490
    const x2 = cx + R * Math.cos(rad)
    const y2 = cy - R * Math.sin(rad)
    return (
      <line
        key={i}
        x1={cx}
        y1={cy}
        x2={x2}
        y2={y2}
        stroke="#243C7D"
        strokeWidth={i % 2 === 0 ? '2.5' : '1.5'}
      />
    )
  })

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMax slice"
      viewBox="0 0 960 490"
    >
      {lines}
      <path
        d={`M ${480 + 480 * Math.cos((8 * Math.PI) / 180)} ${490 - 480 * Math.sin((8 * Math.PI) / 180)} A 480 480 0 0 0 ${480 - 480 * Math.cos((8 * Math.PI) / 180)} ${490 - 480 * Math.sin((8 * Math.PI) / 180)}`}
        fill="none"
        stroke="#243C7D"
        strokeWidth="3"
      />
      <path
        d={`M ${480 + 200 * Math.cos((8 * Math.PI) / 180)} ${490 - 200 * Math.sin((8 * Math.PI) / 180)} A 200 200 0 0 0 ${480 - 200 * Math.cos((8 * Math.PI) / 180)} ${490 - 200 * Math.sin((8 * Math.PI) / 180)}`}
        fill="none"
        stroke="#243C7D"
        strokeWidth="2"
      />
    </svg>
  )
}

const stats = [
  { value: '5', label: 'Campuses', icon: MapPin },
  { value: '1,500+', label: 'Students', icon: Users },
  { value: '200+', label: 'Certified Teachers', icon: BookOpen },
]

export function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative overflow-hidden bg-brand-off-white"
    >
      {/* Fan watermark */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.035] pointer-events-none">
        <FanWatermark />
      </div>

      {/* Radial glow overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 0%, rgba(55,169,232,0.12) 0%, transparent 50%), radial-gradient(ellipse at 10% 100%, rgba(246,221,36,0.10) 0%, transparent 40%)',
        }}
      />

      {/* Vertical gold accent — left edge */}
      <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold hidden sm:block" />

      {/* Large logo watermark — right side, desktop only */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none hidden xl:block pr-8"
      >
        <Image src="/images/logo.png" alt="" width={500} height={500} className="object-contain" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span aria-hidden="true" className="h-px w-10 bg-brand-sky" />
          <span className="text-brand-sky text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-center">
            Al Musleh Foundation School
          </span>
          <span aria-hidden="true" className="h-px w-10 bg-brand-sky" />
        </div>

        {/* Main heading */}
        <div className="text-center">
          <h1
            id="home-hero-heading"
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight text-balance"
          >
            <span className="block font-normal text-brand-navy">Nurturing Minds,</span>
            <span className="block font-bold text-brand-navy">Building Futures.</span>
          </h1>

          {/* Gold underline accent */}
          <div aria-hidden="true" className="flex items-center justify-center gap-2 mt-5 mb-8">
            <div className="w-8 h-0.5 bg-brand-gold/50 rounded-full" />
            <div className="w-24 h-1.5 bg-brand-gold rounded-full" />
            <div className="w-8 h-0.5 bg-brand-gold/50 rounded-full" />
          </div>

          {/* Supporting text */}
          <p className="font-sans text-brand-dark-gray text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Al Musleh Foundation School provides quality education rooted in Islamic values,
            academic excellence, and character building — empowering students across five campuses
            in Karachi to lead lives of purpose and impact.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#campuses"
              className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-navy/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-navy/25"
            >
              Explore Campuses <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-7 py-4 text-sm font-semibold text-brand-navy transition-all duration-200 hover:border-brand-sky hover:text-brand-royal hover:-translate-y-0.5 hover:shadow-md"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 overflow-hidden rounded-2xl border border-brand-border bg-white shadow-xl shadow-brand-navy/10">
          {stats.map(({ value, label, icon: Icon }, i) => (
            <div
              key={label}
              className={[
                'flex items-center gap-4 p-6 sm:p-8',
                i < stats.length - 1
                  ? 'border-b border-brand-border sm:border-b-0 sm:border-r'
                  : '',
              ].join(' ')}
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-navy/5 text-brand-royal">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-serif text-4xl font-bold text-brand-navy leading-none">{value}</p>
                <p className="text-sm text-brand-dark-gray mt-1">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave divider into marquee */}
      <div aria-hidden="true" className="relative h-16 overflow-hidden mt-0">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64 L0,32 Q180,0 360,32 Q540,64 720,32 Q900,0 1080,32 Q1260,64 1440,32 L1440,64 Z"
            fill="#243C7D"
          />
        </svg>
      </div>
    </section>
  )
}
