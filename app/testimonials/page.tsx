'use client'

import { Quote } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import type { Testimonial } from '@/lib/school-content'
import { PageHeading } from '@/components/ui/page-heading'
import { ScrollToTop } from '@/components/scroll-to-top'

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function loadTestimonials() {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })

      setTestimonials((data ?? []) as Testimonial[])
      setLoading(false)
    }

    void loadTestimonials()
  }, [])

  return (
    <>
      <Navbar />
      <main className="bg-brand-off-white text-brand-navy">
        <PageHeading
          eyebrow="Our community"
          title="What people says about AMFS"
          description="Hear from families who have trusted Al Musleh Foundation School with their children’s growth."
        />

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
          {loading ? (
            <div className="rounded-3xl border border-brand-border bg-background p-12 text-center">
              <p className="font-semibold text-brand-navy">Loading…</p>
            </div>
          ) : testimonials.length === 0 ? (
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
      <ScrollToTop />
    </>
  )
}
