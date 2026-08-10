import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Check,
  HeartHandshake,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import { CampusesSection } from '@/components/campuses-section'
import { CtaSection } from '@/components/cta-section'
import { CoreValuesSection } from '@/components/core-values-section'
import { HomeAbout } from '@/components/home-about'

const stats = [
  { value: '5', label: 'Karachi campuses', icon: MapPin },
  { value: '1,500+', label: 'Students learning', icon: Users },
  { value: '200+', label: 'Certified teachers', icon: BookOpen },
]


const parentBenefits = [
  'Qualified teachers',
  'Safe learning environment',
  'Modern curriculum',
  'Character building',
  'Affordable education',
  'Multiple campuses',
]

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-3">
      <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-sky">
        {children}
      </span>
      <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
    </div>
  )
}

export function AboutPage() {
  return (
    <main className="overflow-hidden bg-brand-off-white text-brand-charcoal">
      <section aria-labelledby="about-hero-heading" className="relative bg-brand-off-white">
        <div aria-hidden="true" className="absolute left-0 top-0 h-full w-1 bg-brand-gold" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-brand-sky" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-sky">Our story, our purpose</span>
            </div>
            <h1 id="about-hero-heading" className="max-w-xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-brand-navy sm:text-7xl">
              A school where <span className="text-brand-royal">every child can grow.</span>
            </h1>
            <div aria-hidden="true" className="mt-6 flex items-center gap-2">
              <span className="h-0.5 w-8 rounded-full bg-brand-gold/60" />
              <span className="h-1 w-20 rounded-full bg-brand-gold" />
              <span className="h-0.5 w-4 rounded-full bg-brand-gold/60" />
            </div>
            <p className="mt-7 max-w-xl text-base leading-8 text-brand-dark-gray sm:text-lg">
              Al Musleh Foundation School brings together thoughtful teaching, strong values, and a caring community to help young people learn with purpose.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="#our-story" className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-navy/15 transition hover:-translate-y-0.5 hover:shadow-xl">
                Meet our story <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#campuses" className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy transition hover:-translate-y-0.5 hover:border-brand-sky">
                Find a campus
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl">
            <div aria-hidden="true" className="absolute -inset-4 rotate-2 rounded-[2rem] bg-brand-gold/25" />
            <div className="relative overflow-hidden rounded-[2rem] border-8 border-white bg-brand-navy shadow-2xl shadow-brand-navy/20">
              <Image src="/images/about-classroom.webp" alt="Students learning with a teacher in a bright classroom" width={1024} height={1024} className="aspect-[1.08] w-full object-cover" priority />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/20 bg-brand-navy/90 p-4 text-white backdrop-blur-sm">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">Our promise</p>
                  <p className="mt-1 text-sm font-medium">Knowledge, faith, and character</p>
                </div>
                <Sparkles className="h-6 w-6 text-brand-gold" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="h-8 bg-white [clip-path:ellipse(68%_100%_at_50%_100%)] sm:h-14" />
      </section>

      <section aria-label="School statistics" className="relative z-10 mx-auto -mt-5 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-brand-border bg-white shadow-xl shadow-brand-navy/10 sm:grid-cols-3">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4 border-b border-brand-border p-5 last:border-0 sm:border-b-0 sm:border-r sm:last:border-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-sky/10 text-brand-royal"><Icon className="h-5 w-5" /></span>
              <div><p className="font-serif text-3xl font-semibold text-brand-navy">{value}</p><p className="text-sm text-brand-dark-gray">{label}</p></div>
            </div>
          ))}
        </div>
      </section>

       <HomeAbout />

      <section aria-labelledby="vision-mission-heading" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center"><SectionEyebrow>Our foundation</SectionEyebrow><h2 id="vision-mission-heading" className="font-serif text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Guided by vision. Driven by mission.</h2></div>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="relative overflow-hidden rounded-3xl bg-brand-navy p-8 text-white sm:p-10"><Lightbulb className="h-9 w-9 text-brand-gold" aria-hidden="true" /><p className="mt-8 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-sky">Our vision</p><h3 className="mt-3 max-w-lg font-serif text-3xl font-semibold sm:text-4xl">A secure, joyful environment where every learner can thrive.</h3><div aria-hidden="true" className="absolute -bottom-12 -right-10 h-44 w-44 rounded-full border-[24px] border-brand-sky/20" /></article>
            <article className="rounded-3xl border border-brand-border bg-brand-off-white p-8 sm:p-10"><HeartHandshake className="h-9 w-9 text-brand-orange" aria-hidden="true" /><p className="mt-8 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-royal">Our mission</p><p className="mt-3 max-w-xl text-lg leading-8 text-brand-charcoal">We empower students to meet challenges with courage and faith, while families, teachers, and management work together to shape the next generation.</p></article>
          </div>
        </div>
      </section>

      <CoreValuesSection />
      <CampusesSection />

      <section aria-labelledby="benefits-heading" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative overflow-hidden rounded-3xl bg-brand-royal p-8 text-white sm:p-10"><div className="absolute right-[-30px] top-[-30px] h-40 w-40 rounded-full border-[22px] border-brand-sky/30" /><BookOpen className="relative h-10 w-10 text-brand-gold" aria-hidden="true" /><p className="relative mt-14 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold">Why families choose us</p><h2 id="benefits-heading" className="relative mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">A school experience built around the whole child.</h2><p className="relative mt-5 text-sm leading-7 text-white/75">Bright classrooms, trusted teachers, and values that stay with students for life.</p></div>
          <div className="grid content-center gap-4 sm:grid-cols-2">{parentBenefits.map((benefit) => <div key={benefit} className="flex items-center gap-3 rounded-2xl border border-brand-border bg-white p-5 text-sm font-semibold text-brand-charcoal shadow-sm transition hover:-translate-y-0.5 hover:border-brand-sky/50 hover:shadow-md"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold/25 text-brand-navy"><Check className="h-4 w-4" /></span>{benefit}</div>)}</div>
        </div>
      </section>

      <CtaSection />
    </main>
  )
}
