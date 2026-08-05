import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  HeartHandshake,
  Lightbulb,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import coreValues from '@/data/core-values.json'
import campuses from '@/data/campuses.json'

const iconMap = {
  'book-open': BookOpen,
  sparkles: Sparkles,
  'heart-handshake': HeartHandshake,
  lightbulb: Lightbulb,
  'trending-up': TrendingUp,
  'shield-check': ShieldCheck,
} as const

const stats = [
  { value: '5', label: 'Campuses', icon: MapPin },
  { value: '1,500+', label: 'Students', icon: Users },
  { value: '200+', label: 'Certified Teachers', icon: BookOpen },
]

const parentBenefits = [
  'Qualified Teachers',
  'Safe Learning Environment',
  'Modern Curriculum',
  'Character Building',
  'Affordable Education',
  'Multiple Campuses',
]

// Decorative fan watermark — mirrors the hero section motif
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

// Reusable eyebrow label matching page.tsx design language
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
      <span className="text-brand-sky text-[11px] font-semibold uppercase tracking-[0.3em]">
        {children}
      </span>
      <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
    </div>
  )
}

export function AboutPage() {
  return (
    <main className="overflow-hidden bg-brand-off-white text-brand-charcoal">

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section
        aria-labelledby="about-hero-heading"
        className="relative overflow-hidden bg-brand-off-white min-h-[520px] sm:min-h-[580px] flex flex-col"
      >
        {/* Fan watermark — matches homepage hero */}
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.035] pointer-events-none">
          <FanWatermark />
        </div>

        {/* Radial gradient overlays */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 85% 15%, rgba(55,169,232,0.10) 0%, transparent 28%), radial-gradient(circle at 15% 80%, rgba(246,221,36,0.08) 0%, transparent 24%)',
          }}
        />

        {/* Vertical gold accent — left edge, matches homepage */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold hidden sm:block"
        />

        <div className="relative z-10 flex-1 flex items-center">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
            {/* Left: Text content */}
            <div className="max-w-3xl">
              {/* Eyebrow label */}
              <div className="flex items-center gap-3 mb-7">
                <span aria-hidden="true" className="h-px w-10 bg-brand-sky" />
                <span className="text-brand-sky text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em]">
                  Our story, our purpose
                </span>
                <span aria-hidden="true" className="h-px w-10 bg-brand-sky" />
              </div>

              <h1
                id="about-hero-heading"
                className="font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-brand-navy sm:text-6xl lg:text-7xl"
              >
                About Al Musleh
                <span className="block text-brand-royal">Foundation School</span>
              </h1>

              {/* Gold underline accent — matches homepage hero */}
              <div aria-hidden="true" className="flex items-center gap-2 mt-5 mb-7">
                <div className="w-8 h-0.5 bg-brand-gold/50 rounded-full" />
                <div className="w-20 h-1 bg-brand-gold rounded-full" />
                <div className="w-4 h-0.5 bg-brand-gold/50 rounded-full" />
              </div>

              <p className="max-w-2xl text-base leading-8 text-brand-dark-gray sm:text-lg">
                For years, Al Musleh Foundation School has been dedicated to nurturing young minds
                through quality education, character building, and a commitment to academic
                excellence. With multiple campuses across Karachi, we continue to empower students
                with knowledge, confidence, and values that prepare them for a brighter future.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="#our-story"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-navy/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-navy/20"
                >
                  Discover our story <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#campuses"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy transition-all duration-200 hover:border-brand-sky hover:text-brand-royal hover:-translate-y-0.5 hover:shadow-md"
                >
                  Explore our campuses
                </Link>
              </div>
            </div>

            {/* Right: Decorative card */}
            <div className="relative mx-auto w-full max-w-[520px]">
              <div
                aria-hidden="true"
                className="absolute -inset-5 rounded-[2rem] border border-brand-gold/30 bg-brand-gold/10 rotate-3"
              />
              <div className="relative overflow-hidden rounded-[2rem] border border-brand-border bg-brand-navy p-6 shadow-2xl shadow-brand-navy/20 sm:p-8">
                <div className="absolute right-5 top-5 flex gap-2" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-brand-gold" />
                  <span className="h-3 w-3 rounded-full bg-brand-orange" />
                </div>
                <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-8 text-center">
                  <Image
                    src="/images/logo.svg"
                    alt="Al Musleh Foundation School logo"
                    width={270}
                    height={284}
                    className="h-auto w-48 brightness-0 invert sm:w-56"
                    priority
                  />
                  <p className="mt-6 max-w-xs text-sm leading-6 text-white/70">
                    A learning community grounded in knowledge, faith, and character.
                  </p>
                  <div className="mt-8 flex items-end gap-3" aria-hidden="true">
                    <span className="h-10 w-2 rounded-full bg-brand-sky" />
                    <span className="h-16 w-2 rounded-full bg-brand-gold" />
                    <span className="h-24 w-2 rounded-full bg-brand-orange" />
                    <span className="h-32 w-2 rounded-full bg-brand-sky" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave divider — matches homepage hero */}
        <div aria-hidden="true" className="relative h-12 overflow-hidden flex-shrink-0">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,48 L0,24 Q180,0 360,24 Q540,48 720,24 Q900,0 1080,24 Q1260,48 1440,24 L1440,48 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────────── */}
      <section
        className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 sm:px-6 lg:px-8"
        aria-label="School statistics"
      >
        <div className="grid overflow-hidden rounded-2xl border border-brand-border bg-white shadow-xl shadow-brand-navy/10 sm:grid-cols-3">
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-4 border-b border-brand-border p-6 last:border-0 sm:border-b-0 sm:border-r sm:last:border-0"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-sky/10 text-brand-royal">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-serif text-3xl font-semibold text-brand-navy">{value}</p>
                <p className="text-sm text-brand-dark-gray">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Story ─────────────────────────────────────────────── */}
      <section
        id="our-story"
        aria-labelledby="story-heading"
        className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-[.9fr_1.1fr] lg:px-8"
      >
        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-brand-navy p-8 shadow-xl shadow-brand-navy/10">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[28px] border-brand-sky/20" />
          <div className="relative flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-7">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-navy">
                Since day one
              </span>
              <BookOpen className="h-7 w-7 text-brand-gold" />
            </div>
            <div>
              <p className="font-serif text-5xl leading-none text-white sm:text-7xl">Learn.</p>
              <p className="font-serif text-5xl leading-none text-brand-sky sm:text-7xl">Lead.</p>
              <p className="font-serif text-5xl leading-none text-brand-gold sm:text-7xl">Live well.</p>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/65">
              A place where every learner is seen, supported, and inspired to grow.
            </p>
          </div>
        </div>

        <div>
          <SectionEyebrow>Our story</SectionEyebrow>
          <h2
            id="story-heading"
            className="mt-2 font-serif text-4xl font-semibold leading-tight text-brand-navy sm:text-5xl text-balance"
          >
            Education with purpose at its heart.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-8 text-brand-dark-gray">
            <p>
              Al Musleh Foundation School exists to give children a strong beginning and a clear
              sense of possibility. We bring together committed teachers, supportive families, and a
              thoughtful learning environment where academic progress and personal growth move
              together.
            </p>
            <p>
              Across our campuses in Karachi, we combine a modern approach to learning with the
              timeless values that help students become thoughtful, courageous, and compassionate
              members of society.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-brand-navy">
            <span className="h-px w-12 bg-brand-gold" />
            Growing minds. Strong character.
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ──────────────────────────────────────── */}
      <section
        aria-labelledby="vision-mission-heading"
        className="bg-white py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionEyebrow>Our foundation</SectionEyebrow>
            <h2
              id="vision-mission-heading"
              className="font-serif font-bold text-brand-navy text-3xl sm:text-4xl leading-tight text-balance"
            >
              Guided by vision. Driven by mission.
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Vision */}
            <div className="group rounded-3xl bg-brand-navy p-8 text-white sm:p-10 transition-transform duration-300 hover:-translate-y-1">
              <Sparkles className="h-8 w-8 text-brand-gold" />
              <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-sky">
                Our vision
              </p>
              <h3 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                Creating a secure and joyful learning environment.
              </h3>
              <div aria-hidden="true" className="mt-8 flex items-center gap-2">
                <div className="w-8 h-0.5 bg-brand-gold/50 rounded-full" />
                <div className="w-16 h-1 bg-brand-gold rounded-full" />
                <div className="w-4 h-0.5 bg-brand-gold/50 rounded-full" />
              </div>
            </div>

            {/* Mission */}
            <div className="group rounded-3xl border border-brand-border bg-brand-off-white p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10 hover:border-brand-sky/40">
              <HeartHandshake className="h-8 w-8 text-brand-orange" />
              <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-royal">
                Our mission
              </p>
              <p className="mt-3 text-lg leading-8 text-brand-charcoal">
                Empowering our students who embrace courage and faith to overcome challenges. We
                believe education goes beyond degrees — it is about embracing life&apos;s truths.
                Parents, Teachers, and Management form a united family committed to the
                well-rounded upbringing of the next generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ────────────────────────────────────────────── */}
      <section
        aria-labelledby="values-heading"
        className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        <header className="text-center max-w-2xl mx-auto mb-14">
          <SectionEyebrow>What guides us</SectionEyebrow>
          <h2
            id="values-heading"
            className="font-serif font-bold text-brand-navy text-3xl sm:text-5xl leading-tight text-balance"
          >
            Core values that shape every day.
          </h2>
        </header>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value) => {
            const Icon = iconMap[value.icon as keyof typeof iconMap]
            return (
              <article
                key={value.title}
                className="group relative rounded-2xl border border-brand-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10 hover:border-brand-royal/30"
              >
                {/* Top accent line on hover */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-6 right-6 h-0.5 rounded-full bg-brand-royal scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-sky/10 text-brand-royal transition-colors duration-200 group-hover:bg-brand-navy group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                {/* Gold dot accent */}
                <div aria-hidden="true" className="w-6 h-0.5 bg-brand-gold rounded-full mt-6 mb-3" />
                <h3 className="text-lg font-semibold text-brand-navy">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-dark-gray">{value.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      {/* ── Campuses ───────────────────────────────────────────────── */}
      <section
        id="campuses"
        aria-labelledby="campuses-heading"
        className="bg-brand-navy py-24 text-white sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
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
            </div>
            <p className="max-w-md text-sm leading-7 text-white/65">
              Five campuses across Karachi, united by one commitment to quality education.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {campuses.map((campus) => (
              <article
                key={campus.name}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] transition-all duration-300 hover:bg-white/[0.12] hover:border-brand-sky/40 hover:-translate-y-1"
              >
                <div className="relative h-40 overflow-hidden rounded-t-2xl bg-white/[0.05] transition-colors duration-300 group-hover:bg-white/[0.09]">
                  <Image
                    src={campus.image}
                    alt={campus.name}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{campus.name}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-gold">
                        {campus.type}
                      </p>
                    </div>
                    {campus.placeholder && (
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/60">
                        Updating
                      </span>
                    )}
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
                        className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-4 py-2 text-xs font-bold text-brand-navy transition-all duration-200 hover:bg-brand-gold/90 hover:shadow-md"
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
        </div>
      </section>

      {/* ── Why Families Choose Us ────────────────────────────────── */}
      <section
        aria-labelledby="benefits-heading"
        className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <SectionEyebrow>Why families choose us</SectionEyebrow>
            <h2
              id="benefits-heading"
              className="mt-2 font-serif text-4xl font-semibold leading-tight text-brand-navy sm:text-5xl text-balance"
            >
              A school experience built around the whole child.
            </h2>
          </div>
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {parentBenefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 border-b border-brand-border pb-4 text-sm font-semibold text-brand-charcoal"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gold/25 text-brand-navy">
                  <Check className="h-4 w-4" />
                </span>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand-royal px-6 py-14 text-center text-white shadow-2xl shadow-brand-royal/20 sm:px-12 sm:py-20">
          {/* Decorative circles */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem]">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-brand-gold/10" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
              <span className="text-brand-gold text-[11px] font-semibold uppercase tracking-[0.3em]">
                Take the next step
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
            </div>

            <h2 className="mx-auto mt-2 max-w-3xl font-serif text-4xl font-semibold sm:text-6xl">
              Join the AMFS family.
            </h2>

            {/* Gold underline accent */}
            <div aria-hidden="true" className="flex items-center justify-center gap-2 mt-4 mb-5">
              <div className="w-8 h-0.5 bg-brand-gold/50 rounded-full" />
              <div className="w-20 h-1 bg-brand-gold rounded-full" />
              <div className="w-4 h-0.5 bg-brand-gold/50 rounded-full" />
            </div>

            <p className="mx-auto max-w-xl text-base leading-7 text-white/80">
              Connect with our team and discover how Al Musleh Foundation School can support your
              child&apos;s next chapter.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="mailto:almusleh.foundation@gmail.com"
                className="rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Contact us
              </a>
              <a
                href="mailto:almusleh.foundation@gmail.com?subject=Admission%20enquiry"
                className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5"
              >
                Apply for Admission
              </a>
              <a
                href="mailto:almusleh.foundation@gmail.com?subject=Teaching%20application"
                className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5"
              >
                Apply for Teaching
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
