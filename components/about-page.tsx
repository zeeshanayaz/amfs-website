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

export function AboutPage() {
  return (
    <main className="overflow-hidden bg-brand-off-white text-brand-charcoal">
      <section className="relative border-b border-brand-border bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(55,169,232,0.12),transparent_28%),radial-gradient(circle_at_15%_80%,rgba(246,221,36,0.10),transparent_24%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-sky/25 bg-brand-sky/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-navy">
              <span className="h-2 w-2 rounded-full bg-brand-gold" />
              Our story, our purpose
            </div>
            <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-brand-navy sm:text-6xl lg:text-7xl">
              About Al Musleh Foundation School
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-brand-dark-gray sm:text-lg">
              For years, Al Musleh Foundation School has been dedicated to nurturing young minds through quality education, character building, and a commitment to academic excellence. With multiple campuses across Karachi, we continue to empower students with knowledge, confidence, and values that prepare them for a brighter future.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="#our-story" className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-navy/15 transition-transform hover:-translate-y-0.5">
                Discover our story <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#campuses" className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-sky hover:text-brand-blue">
                Explore our campuses
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute -inset-5 rounded-[2rem] border border-brand-gold/30 bg-brand-gold/10 rotate-3" />
            <div className="relative overflow-hidden rounded-[2rem] border border-brand-border bg-brand-navy p-6 shadow-2xl shadow-brand-navy/20 sm:p-8">
              <div className="absolute right-5 top-5 flex gap-2" aria-hidden="true"><span className="h-3 w-3 rounded-full bg-brand-gold" /><span className="h-3 w-3 rounded-full bg-brand-orange" /></div>
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-8 text-center">
                <Image src="/images/logo.svg" alt="Al Musleh Foundation School logo" width={270} height={284} className="h-auto w-48 brightness-0 invert sm:w-56" priority />
                <p className="mt-6 max-w-xs text-sm leading-6 text-white/70">A learning community grounded in knowledge, faith, and character.</p>
                <div className="mt-8 flex items-end gap-3" aria-hidden="true"><span className="h-10 w-2 rounded-full bg-brand-sky" /><span className="h-16 w-2 rounded-full bg-brand-gold" /><span className="h-24 w-2 rounded-full bg-brand-orange" /><span className="h-32 w-2 rounded-full bg-brand-sky" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 sm:px-6 lg:px-8" aria-label="School statistics">
        <div className="grid overflow-hidden rounded-2xl border border-brand-border bg-white shadow-xl shadow-brand-navy/10 sm:grid-cols-3">
          {stats.map(({ value, label, icon: Icon }) => <div key={label} className="flex items-center gap-4 border-b border-brand-border p-6 last:border-0 sm:border-b-0 sm:border-r sm:last:border-0"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-sky/10 text-brand-blue"><Icon className="h-5 w-5" /></span><div><p className="font-serif text-3xl font-semibold text-brand-navy">{value}</p><p className="text-sm text-brand-dark-gray">{label}</p></div></div>)}
        </div>
      </section>

      <section id="our-story" className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-brand-navy p-8 shadow-xl shadow-brand-navy/10">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[28px] border-brand-sky/20" />
          <div className="relative flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-7">
            <div className="flex items-center justify-between"><span className="rounded-full bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-navy">Since day one</span><BookOpen className="h-7 w-7 text-brand-gold" /></div>
            <div><p className="font-serif text-5xl leading-none text-white sm:text-7xl">Learn.</p><p className="font-serif text-5xl leading-none text-brand-sky sm:text-7xl">Lead.</p><p className="font-serif text-5xl leading-none text-brand-gold sm:text-7xl">Live well.</p></div>
            <p className="max-w-xs text-sm leading-6 text-white/65">A place where every learner is seen, supported, and inspired to grow.</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Our story</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-brand-navy sm:text-5xl">Education with purpose at its heart.</h2>
          <div className="mt-7 space-y-5 text-base leading-8 text-brand-dark-gray"><p>Al Musleh Foundation School exists to give children a strong beginning and a clear sense of possibility. We bring together committed teachers, supportive families, and a thoughtful learning environment where academic progress and personal growth move together.</p><p>Across our campuses in Karachi, we combine a modern approach to learning with the timeless values that help students become thoughtful, courageous, and compassionate members of society.</p></div>
          <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-brand-navy"><span className="h-px w-12 bg-brand-gold" /> Growing minds. Strong character.</div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-6 lg:grid-cols-2"><div className="rounded-3xl bg-brand-navy p-8 text-white sm:p-10"><Sparkles className="h-8 w-8 text-brand-gold" /><p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">Our vision</p><h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">Creating a secure and joyful learning environment.</h2></div><div className="rounded-3xl border border-brand-border bg-brand-off-white p-8 sm:p-10"><HeartHandshake className="h-8 w-8 text-brand-orange" /><p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Our mission</p><p className="mt-3 text-lg leading-8 text-brand-charcoal">Empowering our students who embrace courage and faith to overcome challenges. We believe education goes beyond degrees, it is about embracing life&apos;s truths. Parents, Teachers, and Management form a united family committed to the well-rounded upbringing of the next generation.</p></div></div></div></section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">What guides us</p><h2 className="mt-4 font-serif text-4xl font-semibold text-brand-navy sm:text-5xl">Core values that shape every day.</h2></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{coreValues.map((value) => { const Icon = iconMap[value.icon as keyof typeof iconMap]; return <article key={value.title} className="group rounded-2xl border border-brand-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-sky/10 text-brand-blue transition-colors group-hover:bg-brand-navy group-hover:text-white"><Icon className="h-5 w-5" /></span><h3 className="mt-6 text-lg font-semibold text-brand-navy">{value.title}</h3><p className="mt-3 text-sm leading-7 text-brand-dark-gray">{value.description}</p></article> })}</div></section>

      <section id="campuses" className="bg-brand-navy py-24 text-white sm:py-32"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">Our campuses</p><h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">Close to the communities we serve.</h2></div><p className="max-w-md text-sm leading-7 text-white/65">Five campuses across Karachi, united by one commitment to quality education. Campus information can be updated in one JSON file as details are confirmed.</p></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{campuses.map((campus) => <article key={campus.name} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07]"><div className="flex h-40 items-center justify-center bg-white/[0.05] p-8"><Image src={campus.image} alt="" width={150} height={158} className="h-28 w-auto object-contain opacity-80" /></div><div className="p-6"><div className="flex items-start justify-between gap-3"><div><h3 className="text-xl font-semibold text-white">{campus.name}</h3><p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-gold">{campus.type}</p></div>{campus.placeholder && <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/60">Updating</span>}</div><div className="mt-5 space-y-3 text-sm text-white/70"><p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-sky" />{campus.address}</p><p className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-sky" />{campus.phone}</p></div><div className="mt-6 flex flex-wrap gap-3">{campus.mapUrl && <a href={campus.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-4 py-2 text-xs font-bold text-brand-navy">View on map <ArrowRight className="h-3.5 w-3.5" /></a>}<button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80">View details <ChevronRight className="h-3.5 w-3.5" /></button></div></div></article>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Why families choose us</p><h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-brand-navy sm:text-5xl">A school experience built around the whole child.</h2></div><div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">{parentBenefits.map((benefit) => <div key={benefit} className="flex items-center gap-3 border-b border-brand-border pb-4 text-sm font-semibold text-brand-charcoal"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gold/25 text-brand-navy"><Check className="h-4 w-4" /></span>{benefit}</div>)}</div></div></section>

      <section className="px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8"><div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand-blue px-6 py-14 text-center text-white shadow-2xl shadow-brand-blue/20 sm:px-12 sm:py-20"><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">Take the next step</p><h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-semibold sm:text-6xl">Join the AMFS family.</h2><p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/80">Connect with our team and discover how Al Musleh Foundation School can support your child&apos;s next chapter.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><a href="mailto:almusleh.foundation@gmail.com" className="rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-navy">Contact us</a><a href="mailto:almusleh.foundation@gmail.com?subject=Admission%20enquiry" className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white">Apply for admission</a><a href="mailto:almusleh.foundation@gmail.com?subject=Teaching%20application" className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white">Apply for teaching</a></div></div></section>
    </main>
  )
}
