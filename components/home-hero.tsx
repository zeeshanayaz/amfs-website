import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, MapPin, Users } from 'lucide-react'

const stats = [
  { value: '5', label: 'Campuses', icon: MapPin },
  { value: '1,500+', label: 'Learners', icon: Users },
  { value: '200+', label: 'Teachers', icon: BookOpen },
]

function LearningIllustration() {
  return (
    <svg aria-hidden="true" viewBox="0 0 180 150" className="h-28 w-36 sm:h-36 sm:w-44">
      <path d="M24 105c28-19 54-19 66 0 12-19 38-19 66 0v22H24z" fill="#F6DD24" />
      <path d="M90 105c-12-19-38-25-66-10V70c28-15 54-9 66 10zm0 0c12-19 38-25 66-10V70c-28-15-54-9-66 10z" fill="#fff" stroke="#243C7D" strokeWidth="3" />
      <path d="M90 80V127" stroke="#243C7D" strokeWidth="3" />
      <path d="M44 51l10-22 10 22M136 51l10-22 10 22" stroke="#F68A1F" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="54" cy="55" r="11" fill="#37A9E8" stroke="#243C7D" strokeWidth="3" />
      <circle cx="146" cy="55" r="11" fill="#3D63B8" stroke="#243C7D" strokeWidth="3" />
      <path d="M50 59h8m84 0h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M25 128h130" stroke="#243C7D" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function HomeHero() {
  return (
    <section aria-labelledby="home-hero-heading" className="relative overflow-hidden bg-brand-off-white">
      <div aria-hidden="true" className="absolute -right-20 top-10 h-72 w-72 rounded-full border-[32px] border-brand-sky/10" />
      <div aria-hidden="true" className="absolute bottom-0 left-0 h-40 w-40 rounded-tr-[5rem] bg-brand-gold/15" />
      <div aria-hidden="true" className="absolute left-0 top-0 h-full w-1 bg-brand-gold" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-24">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-brand-sky" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-sky">Al Musleh Foundation School</span>
          </div>
          <h1 id="home-hero-heading" className="max-w-xl font-serif text-5xl font-semibold leading-[1.04] tracking-tight text-brand-navy text-balance sm:text-6xl lg:text-7xl">
            A bright start for a <span className="text-brand-royal">meaningful future.</span>
          </h1>
          <div aria-hidden="true" className="mt-6 h-1.5 w-24 rounded-full bg-brand-gold" />
          <p className="mt-7 max-w-lg text-base leading-7 text-brand-dark-gray sm:text-lg">
            A caring school community in Karachi where children learn with confidence, character, and purpose.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/#campuses" className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-navy/20 transition hover:-translate-y-0.5 hover:bg-brand-royal">
              Explore campuses <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy transition hover:-translate-y-0.5 hover:border-brand-sky">
              Meet AMFS
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm font-semibold text-brand-navy">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold text-brand-navy">✓</span>
            Growing minds. Strong character.
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:mx-0">
          <div className="absolute -bottom-5 -left-5 h-full w-full rounded-[2rem] bg-brand-sky" />
          <div className="relative overflow-hidden rounded-[2rem] border-8 border-brand-navy bg-brand-navy shadow-2xl shadow-brand-navy/20">
            <Image src="/images/about-classroom.webp" alt="Students learning together in an AMFS classroom" width={900} height={650} priority className="aspect-[4/3] w-full object-cover" />
            {/* <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur sm:bottom-5 sm:left-5 sm:right-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-sky">Learning together</p>
                <p className="mt-1 font-serif text-lg font-bold text-brand-navy">Every child can thrive.</p>
              </div>
              <LearningIllustration />
            </div> */}
          </div>
          <div className="absolute -right-3 -top-5 rounded-2xl bg-brand-gold px-4 py-3 text-brand-navy shadow-lg sm:-right-6 sm:-top-6">
            <p className="font-serif text-2xl font-bold leading-none">5</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider">Campuses</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-brand-border bg-white shadow-xl shadow-brand-navy/10 sm:grid-cols-3">
          {stats.map(({ value, label, icon: Icon }, i) => (
            <div key={label} className={`flex items-center gap-4 p-5 sm:p-6 ${i < stats.length - 1 ? 'border-b border-brand-border sm:border-b-0 sm:border-r' : ''}`}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-royal"><Icon className="h-5 w-5" /></span>
              <div><p className="font-serif text-3xl font-bold leading-none text-brand-navy">{value}</p><p className="mt-1 text-sm text-brand-dark-gray">{label}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="relative mt-14 h-10 overflow-hidden"><svg className="absolute bottom-0 h-full w-full" viewBox="0 0 1440 64" preserveAspectRatio="none"><path d="M0 64V32Q180 0 360 32T720 32T1080 32T1440 32V64Z" fill="#243C7D" /></svg></div>
    </section>
  )
}
