import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, GraduationCap, ShieldCheck } from 'lucide-react'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

const steps = [
    { title: 'Explore the school', text: 'Learn about our early years, primary learning approach, and nurturing school community.' },
    { title: 'Submit an inquiry', text: 'Contact our admissions team so we can understand your family’s needs and answer your questions.' },
    { title: 'Meet with our team', text: 'Visit the campus or arrange a conversation about your child’s learning journey.' },
    { title: 'Complete enrollment', text: 'Receive the next steps, submit the required documents, and prepare for a confident start.' },
]

const requirements = ['Completed admission inquiry or application', 'Child’s birth certificate or identification document', 'Recent passport-size photographs', 'Previous school record, where applicable', 'Parent or guardian contact information']

export default function AdmissionsPage() {
    return (
        <>
            <Navbar />
            <main className="bg-brand-off-white text-brand-navy">
                <section className="relative overflow-hidden bg-brand-navy px-6 py-20 text-primary-foreground sm:px-10 lg:py-28">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">Admissions at AMFS</p>
                            <h1 className="mt-5 max-w-3xl font-serif text-5xl font-bold leading-tight sm:text-6xl">A confident beginning for your child’s journey.</h1>
                            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-off-white/80">Join a school community where every child is known, encouraged, and guided to grow with purpose.</p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-bold text-brand-navy transition hover:-translate-y-0.5">Start an inquiry <ArrowRight className="size-4" /></Link>
                            </div>
                        </div>
                        <div className="rounded-[2rem] border border-brand-gold/30 bg-brand-royal/40 p-7 shadow-2xl">
                            <GraduationCap className="size-10 text-brand-gold" aria-hidden="true" />
                            <h2 className="mt-8 font-serif text-3xl font-bold">Why families choose AMFS</h2>
                            <ul className="mt-6 grid gap-4 text-sm leading-6 text-brand-off-white/85">
                                <li className="flex gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-gold" />Warm, values-led learning environment</li>
                                <li className="flex gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-gold" />Strong foundations for lifelong learning</li>
                                <li className="flex gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-gold" />A partnership between school and family</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
                    <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">How it works</p><h2 className="mt-3 font-serif text-4xl font-bold">A simple admissions process</h2><p className="mt-4 text-brand-dark-gray leading-7">Our team is here to make each step clear, personal, and welcoming.</p></div>
                    <div className="mt-10 grid gap-4 md:grid-cols-4">{steps.map((step, index) => <article key={step.title} className="rounded-2xl border border-brand-border bg-background p-6"><span className="flex size-10 items-center justify-center rounded-full bg-brand-light font-serif text-lg font-bold text-brand-royal">{index + 1}</span><h3 className="mt-6 font-serif text-xl font-bold">{step.title}</h3><p className="mt-3 text-sm leading-6 text-brand-dark-gray">{step.text}</p></article>)}</div>
                </section>

                <section className="border-y border-brand-border bg-background px-6 py-20 sm:px-10"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">What to prepare</p><h2 className="mt-3 font-serif text-4xl font-bold">Admission requirements</h2><p className="mt-4 max-w-xl leading-7 text-brand-dark-gray">Gather these documents to help our admissions team process your inquiry smoothly.</p><ul className="mt-8 grid gap-4">{requirements.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><FileText className="mt-0.5 size-5 shrink-0 text-brand-royal" />{item}</li>)}</ul></div><div className="rounded-3xl bg-brand-light p-8"><ShieldCheck className="size-9 text-brand-royal" /><h3 className="mt-6 font-serif text-2xl font-bold">Have a question?</h3><p className="mt-3 leading-7 text-brand-dark-gray">Every family’s situation is unique. Reach out to us and we’ll help you understand the right next step.</p><Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-bold text-primary-foreground">Contact the school <ArrowRight className="size-4" /></Link></div></div></section>
            </main>
            <Footer />
        </>
    )
}