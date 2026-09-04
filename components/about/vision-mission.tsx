import {Lightbulb, HeartHandshake} from 'lucide-react'

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

export function VisionMission() {
    return (
        <section aria-labelledby="vision-mission-heading" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center"><SectionEyebrow>Our foundation</SectionEyebrow><h2 id="vision-mission-heading" className="font-serif text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">Guided by vision. Driven by mission.</h2></div>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="relative overflow-hidden rounded-3xl bg-brand-navy p-8 text-white sm:p-10"><Lightbulb className="h-9 w-9 text-brand-gold" aria-hidden="true" /><p className="mt-8 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-sky">Our vision</p><h3 className="mt-3 max-w-lg font-serif text-3xl font-semibold sm:text-4xl">A secure, joyful environment where every learner can thrive.</h3><div aria-hidden="true" className="absolute -bottom-12 -right-10 h-44 w-44 rounded-full border-[24px] border-brand-sky/20" /></article>
            <article className="rounded-3xl border border-brand-border bg-brand-off-white p-8 sm:p-10"><HeartHandshake className="h-9 w-9 text-brand-orange" aria-hidden="true" /><p className="mt-8 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-royal">Our mission</p><p className="mt-3 max-w-xl text-lg leading-8 text-brand-charcoal">We empower students to meet challenges with courage and faith, while families, teachers, and management work together to shape the next generation.</p></article>
          </div>
        </div>
      </section>
    )
}