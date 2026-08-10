'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, BriefcaseBusiness, CheckCircle2, MapPin, X } from 'lucide-react'
import type { JobPost } from '@/lib/supabase/client'
import { getActiveJobs, isSupabaseConfigured, isValidApplication, isValidEmail, submitJobApplication } from '@/lib/supabase/client'

type ApplicationFormProps = { job: JobPost; onClose: () => void }

function ApplicationForm({ job, onClose }: ApplicationFormProps) {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', cover_letter: '', resume_url: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isValidApplication({ ...form, job_id: job.id })) {
      setStatus('error')
      return
    }
    if (!isValidEmail(form.email)) {
      setStatus('error')
      return
    }
    setStatus('submitting')
    const { error } = await submitJobApplication({ ...form, job_id: job.id })
    setStatus(error ? 'error' : 'success')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-brand-navy/55 p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="application-title">
      <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-background p-6 shadow-2xl sm:max-w-2xl sm:rounded-3xl sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">Apply to AMFS</p>
            <h2 id="application-title" className="font-serif text-3xl font-bold text-brand-navy">{job.title}</h2>
            <p className="mt-3 text-sm font-semibold text-brand-dark-gray">{job.campus_name}</p>

          </div>
          <button type="button" onClick={onClose} aria-label="Close application form" className="rounded-full p-2 text-brand-dark-gray transition hover:bg-brand-light hover:text-brand-navy"><X className="size-5" /></button>
        </div>
        {status === 'success' ? (
          <div className="rounded-2xl bg-brand-light p-8 text-center">
            <CheckCircle2 className="mx-auto mb-4 size-12 text-brand-royal" />
            <h3 className="mb-2 font-serif text-2xl font-bold text-brand-navy">Application received</h3>
            <p className="text-brand-dark-gray">Thank you for your interest in joining our school community. Our team will review your application and contact you if there is a suitable next step.</p>
            <button type="button" onClick={onClose} className="mt-6 rounded-full bg-brand-navy px-6 py-3 text-sm font-bold text-primary-foreground">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-brand-navy">Full name<input required value={form.full_name} placeholder="John Doe" onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label>
            <label className="grid gap-2 text-sm font-semibold text-brand-navy">Email address<input required type="email" value={form.email} placeholder="john.doe@example.com" onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label>
            <label className="grid gap-2 text-sm font-semibold text-brand-navy sm:col-span-2">Phone number<input required value={form.phone} placeholder="123-456-7890" onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label>
            <label className="grid gap-2 text-sm font-semibold text-brand-navy sm:col-span-2">Resume / CV link <span className="font-normal text-brand-dark-gray">(optional)</span><input type="url" value={form.resume_url} placeholder="https://drive.google.com/..." onChange={(e) => setForm({ ...form, resume_url: e.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /><p className="text-xs text-brand-dark-gray">Paste a public Google Drive or OneDrive resume link.</p></label>
            <label className="grid gap-2 text-sm font-semibold text-brand-navy sm:col-span-2">Why would you be a great fit?<textarea required minLength={20} rows={5} value={form.cover_letter} placeholder="Tell us why you're interested in this position..." onChange={(e) => setForm({ ...form, cover_letter: e.target.value })} className="resize-y rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label>
            {status === 'error' && <p className="text-sm text-destructive sm:col-span-2">Please check your details and make sure your message is at least 20 characters.</p>}
            <button disabled={status === 'submitting'} type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-bold text-primary-foreground transition hover:bg-brand-royal disabled:opacity-60 sm:col-span-2">{status === 'submitting' ? 'Sending application…' : 'Submit application'} <ArrowRight className="size-4" /></button>
          </form>
        )}
      </div>
    </div>
  )
}

export function CareersPage() {
  const [jobs, setJobs] = useState<JobPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false)
      return
    }

    const loadJobs = async () => {
      const result = await getActiveJobs()
      setJobs(result.data ?? [])
      setLoading(false)
    }

    void loadJobs()
  }, [])

  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy px-6 py-20 text-primary-foreground sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">Work with purpose</p>
            <h1 className="max-w-3xl font-serif text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-8xl">Help shape the <span className="text-brand-gold">next generation.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/75">At AMFS, every role has a meaningful place in a child’s journey. Join a caring team building confident learners and good citizens.</p>
          </div>
          <div className="relative rounded-[2rem] bg-brand-royal p-7 sm:p-10"><div className="absolute -right-5 -top-5 size-20 rounded-full bg-brand-gold" /><BriefcaseBusiness className="relative mb-12 size-12 text-brand-gold" /><p className="relative max-w-xs font-serif text-2xl font-bold leading-tight">Bring your expertise, energy, and heart to school every day.</p></div>
        </div>
      </section>
      <section className="bg-brand-off-white px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">Open positions</p><h2 className="font-serif text-4xl font-bold text-brand-navy sm:text-5xl">Find your place at AMFS.</h2></div><p className="max-w-sm text-sm leading-6 text-brand-dark-gray">Explore current opportunities across our academic, administrative, and support teams.</p></div>
          {loading ? (
            <div className="rounded-3xl border border-brand-border bg-background p-12 text-center">
              <p className="font-semibold text-brand-navy">Loading open positions…</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-brand-border bg-background p-12 text-center">
              <h3 className="font-serif text-2xl font-bold text-brand-navy">No open roles right now</h3>
              <p className="mx-auto mt-3 max-w-md text-brand-dark-gray">We are always happy to hear from thoughtful educators. Please check back soon for new opportunities.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <article key={job.id} className="group flex flex-col justify-between gap-6 rounded-3xl border border-brand-border bg-background p-6 transition hover:-translate-y-1 hover:border-brand-sky hover:shadow-lg sm:flex-row sm:items-center sm:p-8">
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
                      <span className="rounded-full bg-brand-light px-3 py-1 text-brand-royal">{job.department}</span>
                      <span className="rounded-full bg-brand-gold/30 px-3 py-1 text-brand-navy">{job.employment_type}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-brand-navy">{job.title}</h3>
                    <p className="mt-3 text-sm font-semibold text-brand-dark-gray">{job.campus_name}</p>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-dark-gray">{job.description}</p>
                    <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-royal"><MapPin className="size-4" />{job.location}</p>
                  </div>
                  <button type="button" onClick={() => setSelectedJob(job)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-brand-royal">Apply now <ArrowRight className="size-4 transition group-hover:translate-x-1" /></button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      {selectedJob && <ApplicationForm job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </>
  )
}
