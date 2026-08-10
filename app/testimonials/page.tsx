import { Quote } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import type { Testimonial } from '@/lib/school-content'

export default async function TestimonialsPage() {
  const supabase = createClient()
  const { data } = await supabase.from('testimonials').select('*').eq('is_published', true).order('display_order', { ascending: true }).order('created_at', { ascending: false })
  const testimonials = (data ?? []) as Testimonial[]

  return (
    <>
      <Navbar />
      <main className="bg-brand-off-white text-brand-navy">
        <section className="bg-brand-navy px-6 py-20 text-primary-foreground sm:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">Our community</p>
            <h1 className="mt-5 font-serif text-5xl font-bold sm:text-6xl">What parents says about AMFS</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-off-white/80">Hear from families who have trusted Al Musleh Foundation School with their children’s growth.</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
          {testimonials.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-brand-border bg-background p-16 text-center text-brand-dark-gray">
              Parent testimonials will appear here soon.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article key={testimonial.id} className="rounded-3xl border border-brand-border bg-background p-7 shadow-sm">
                  <Quote className="size-9 text-brand-gold" aria-hidden="true" />
                  <blockquote className="mt-6 text-lg leading-8 text-brand-navy">“{testimonial.thoughts}”</blockquote>
                  <div className="mt-8 border-t border-brand-border pt-5">
                    <p className="font-bold">{testimonial.parent_name}</p>
                    <p className="mt-1 text-sm text-brand-dark-gray">Parent of {testimonial.student_name}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
