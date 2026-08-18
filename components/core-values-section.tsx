import { BookOpen, HeartHandshake, Lightbulb, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'
import coreValues from '@/data/core-values.json'

const iconMap = { 'book-open': BookOpen, sparkles: Sparkles, 'heart-handshake': HeartHandshake, lightbulb: Lightbulb, 'trending-up': TrendingUp, 'shield-check': ShieldCheck } as const
const accents = ['#3D63B8', '#37A9E8', '#F68A1F', '#243C7D', '#3D63B8', '#37A9E8']

interface CoreValuesSectionProps {
  bgColor?: 'off-white' | 'white'
}

export function CoreValuesSection({ bgColor = 'off-white' }: CoreValuesSectionProps = {}) {
  const bgClass = bgColor === 'white' ? 'bg-white' : 'bg-brand-off-white'
  
  return (
    <section id="core-values" aria-labelledby="home-values-heading" className={`${bgClass} py-20 sm:py-28`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><div className="mb-4 flex items-center gap-3"><span aria-hidden="true" className="h-px w-8 bg-brand-gold" /><span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-sky">What guides us</span></div><h2 id="home-values-heading" className="max-w-xl font-serif text-4xl font-bold leading-tight text-brand-navy text-balance sm:text-5xl">Small moments. Lasting values.</h2></div>
          <p className="max-w-sm text-base leading-7 text-brand-dark-gray">The habits and principles that help our learners grow well.</p>
        </header>
        <div role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value, i) => { const Icon = iconMap[value.icon as keyof typeof iconMap]; const accent = accents[i % accents.length]; return <article key={value.title} role="listitem" className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-off-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10"><div aria-hidden="true" className="absolute -right-5 -top-5 h-20 w-20 rounded-full opacity-20" style={{ backgroundColor: accent }} /><div className="relative flex items-start justify-between"><span className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm" style={{ backgroundColor: accent }}><Icon className="h-7 w-7" aria-hidden="true" strokeWidth={1.8} /></span><span aria-hidden="true" className="font-serif text-4xl font-bold text-brand-border">0{i + 1}</span></div><h3 className="mt-6 font-serif text-xl font-bold text-brand-navy">{value.title}</h3><p className="mt-2 text-sm leading-6 text-brand-dark-gray">{value.description}</p></article> })}
        </div>
      </div>
    </section>
  )
}
