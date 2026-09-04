import Image from 'next/image'
import Link from 'next/link'
import {
  BookOpen, Check, MapPin, Users
} from 'lucide-react'
import { CampusesSection } from '@/components/campuses-section'
import { CtaSection } from '@/components/cta-section'
import { CoreValuesSection } from '@/components/core-values-section'
import { HomeAbout } from '@/components/home-about'
import { AboutHero } from './about/about-hero'
import { VisionMission } from './about/vision-mission'

const parentBenefits = [
  'Qualified teachers',
  'Safe learning environment',
  'Modern curriculum',
  'Character building',
  'Affordable education',
  'Multiple campuses',
]

export function AboutPage() {
  return (
    <main className="overflow-hidden bg-brand-off-white text-brand-charcoal">

      <AboutHero />

      <HomeAbout />

      <VisionMission />

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
