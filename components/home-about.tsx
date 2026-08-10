import Image from 'next/image'
import { BookOpen, HeartHandshake, ShieldCheck, TrendingUp } from 'lucide-react'

const principles = [
  { label: 'Knowledge', icon: BookOpen, color: 'bg-brand-sky/15 text-brand-royal' },
  { label: 'Character', icon: HeartHandshake, color: 'bg-brand-gold/25 text-brand-navy' },
  { label: 'Confidence', icon: TrendingUp, color: 'bg-brand-orange/15 text-brand-orange' },
  { label: 'Care', icon: ShieldCheck, color: 'bg-brand-royal/15 text-brand-royal' },
]

export function HomeAbout() {
  return (
    <section aria-labelledby="home-about-heading" className="bg-brand-off-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:px-8">
        <div className="relative min-h-[450px]">
          <div className="absolute left-0 top-10 h-[72%] w-[68%] overflow-hidden rounded-[2rem] border-8 border-white shadow-xl">
            <Image src="/images/about-learning.webp" alt="A child engaged in creative learning at AMFS" fill className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 h-[62%] w-[62%] overflow-hidden rounded-[2rem] border-8 border-brand-navy shadow-xl">
            <Image src="/images/about-classroom.webp" alt="An AMFS classroom filled with collaborative learning" fill className="object-cover" />
          </div>
          <div className="absolute left-1/2 top-0 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-brand-gold shadow-lg">
            <BookOpen className="h-9 w-9 text-brand-navy" aria-hidden="true" />
          </div>
          <span aria-hidden="true" className="absolute bottom-8 left-4 h-5 w-5 rounded-full bg-brand-sky" />
        </div>

        <div>
          <div className="mb-5 flex items-center gap-3"><span aria-hidden="true" className="h-px w-10 bg-brand-sky" /><span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-sky">Our story</span></div>
          <h2 id="home-about-heading" className="font-serif text-4xl font-semibold leading-tight text-brand-navy text-balance sm:text-5xl">Education with purpose at its heart.</h2>
          <div aria-hidden="true" className="mt-5 h-1.5 w-20 rounded-full bg-brand-gold" />
          <p className="mt-7 max-w-xl text-base leading-7 text-brand-dark-gray">At AMFS, strong beginnings grow into purposeful futures. We bring teachers, families, and a thoughtful learning environment together so every child is seen and supported.</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {principles.map(({ label, icon: Icon, color }) => <div key={label} className="rounded-2xl border border-brand-border bg-white p-3 text-center"><span className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${color}`}><Icon className="h-5 w-5" /></span><p className="mt-2 text-xs font-semibold text-brand-navy">{label}</p></div>)}
          </div>
          {/* <div className="mt-9 flex flex-wrap gap-3"><Link href="/about" className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-royal">Discover our story <ArrowRight className="h-4 w-4" /></Link><Link href="/#campuses" className="inline-flex items-center rounded-full border border-brand-border bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy transition hover:border-brand-sky">View campuses</Link></div> */}
        </div>
      </div>
    </section>
  )
}
