'use client'

import { FormEvent, useEffect, useState } from 'react'
import { BriefcaseBusiness, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ContactsSection } from './contacts-section'
import { JobsSection } from './jobs-section'
import { NewsSection } from './news-section'
import { TestimonialsSection } from './testimonials-section'
import type {
  ContactSubmission,
  FormState,
  Job,
  NewsEvent,
  NewsFormState,
  Testimonial,
  TestimonialFormState,
} from './types'
import { emptyForm } from './types'

export default function AdminDashboard() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [section, setSection] = useState<'jobs' | 'news' | 'testimonials' | 'contacts'>('jobs')
  const [form, setForm] = useState<FormState>(emptyForm)
  const [newsForm, setNewsForm] = useState<NewsFormState>({
    title: '',
    category: 'News',
    excerpt: '',
    body: '',
    image_url: '',
    event_date: '',
  })
  const [testimonialForm, setTestimonialForm] = useState<TestimonialFormState>({
    parent_name: '',
    student_name: '',
    thoughts: '',
    display_order: 0,
  })
  const [editingContent, setEditingContent] = useState<string | null>(null)
  const [editing, setEditing] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  async function load() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.replace('/admin/login')
      return
    }

    const { data: admin } = await supabase.from('admin_users').select('id').eq('id', user.id).maybeSingle()
    if (!admin) {
      await supabase.auth.signOut()
      router.replace('/admin/login')
      return
    }

    const [{ data: jobData }, { data: newsData }, { data: testimonialData }, { data: contactData }] =
      await Promise.all([
        supabase.from('job_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('news_events').select('*').order('created_at', { ascending: false }),
        supabase.from('testimonials').select('*').order('display_order', { ascending: true }),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
      ])

    setJobs((jobData ?? []) as Job[])
    setNewsEvents((newsData ?? []) as NewsEvent[])
    setTestimonials((testimonialData ?? []) as Testimonial[])
    setContacts((contactData ?? []) as ContactSubmission[])
    setLoading(false)
  }

  useEffect(() => {
    void load()
  }, [])

  function openNew() {
    setEditing(null)
    setForm(emptyForm)
    setShowForm(true)
    setMessage('')
  }

  function openEdit(job: Job) {
    setEditing(job.id)
    setForm({
      ...job,
      image_url: job.image_url ?? '',
      expires_at: job.expires_at ? job.expires_at.slice(0, 10) : '',
    })
    setShowForm(true)
    setMessage('')
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    const supabase = createClient()

    const payload = {
      ...form,
      image_url: form.image_url || null,
      expires_at: form.expires_at ? new Date(`${form.expires_at}T23:59:59`).toISOString() : null,
    }

    const result = editing
      ? await supabase.from('job_posts').update(payload).eq('id', editing)
      : await supabase.from('job_posts').insert(payload)

    if (result.error) {
      setMessage(result.error.message)
      return
    }

    setShowForm(false)
    await load()
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this job post?')) return
    const supabase = createClient()
    await supabase.from('job_posts').delete().eq('id', id)
    await load()
  }

  async function toggle(job: Job) {
    const supabase = createClient()
    await supabase.from('job_posts').update({ is_active: !job.is_active }).eq('id', job.id)
    await load()
  }

  function openNewsEditor() {
    setEditingContent('new')
    setNewsForm({ title: '', category: 'News', excerpt: '', body: '', image_url: '', event_date: '' })
    setMessage('')
  }

  async function saveNews(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    const supabase = createClient()

    const payload = {
      ...newsForm,
      image_url: newsForm.image_url || null,
      event_date: newsForm.event_date
        ? new Date(`${newsForm.event_date}T12:00:00`).toISOString()
        : null,
    }

    const result =
      editingContent === 'new'
        ? await supabase
          .from('news_events')
          .insert(payload)
        : editingContent
          ? await supabase
            .from('news_events')
            .update(payload)
            .eq('id', editingContent)
          : null

    if (!result) {
      setMessage('Unable to save update.')
      return
    }

    if (result.error) {
      console.error('Save news error:', result.error)
      setMessage(result.error.message)
      return
    }

    setNewsForm({
      title: '',
      category: 'News',
      excerpt: '',
      body: '',
      image_url: '',
      event_date: '',
    })

    setEditingContent(null)
    await load()
  }

  function openTestimonialEditor() {
    setEditingContent('new')
    setTestimonialForm({ parent_name: '', student_name: '', thoughts: '', display_order: 0 })
    setMessage('')
  }

  async function saveTestimonial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    const supabase = createClient()

    const result =
      editingContent === 'new'
        ? await supabase
          .from('testimonials')
          .insert(testimonialForm)
        : editingContent
          ? await supabase
            .from('testimonials')
            .update(testimonialForm)
            .eq('id', editingContent)
          : null

    if (!result) {
      setMessage('Unable to save testimonial.')
      return
    }

    if (result.error) {
      console.error('Save testimonial error:', result.error)
      setMessage(result.error.message)
      return
    }

    setTestimonialForm({
      parent_name: '',
      student_name: '',
      thoughts: '',
      display_order: 0,
    })

    setEditingContent(null)
    await load()
  }

  async function toggleContent(table: 'news_events' | 'testimonials', item: NewsEvent | Testimonial) {
    const supabase = createClient()
    const key = 'is_published' in item ? item.is_published : false
    await supabase.from(table).update({ is_published: !key }).eq('id', item.id)
    await load()
  }

  async function removeContent(table: 'news_events' | 'testimonials', id: string) {
    if (!window.confirm('Delete this item?')) return
    const supabase = createClient()
    await supabase.from(table).delete().eq('id', id)
    await load()
  }

  async function markContact(id: string) {
    const supabase = createClient()
    await supabase.from('contact_submissions').update({ is_read: true }).eq('id', id)
    await load()
  }

  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-brand-off-white text-brand-navy">
        <p className="font-semibold text-brand-navy">Loading…</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-brand-off-white text-brand-navy">
      <header className="border-b border-brand-border bg-background px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-brand-navy text-brand-gold">
              <BriefcaseBusiness className="size-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">AMFS admin</p>
              <h1 className="font-serif text-xl font-bold">School operations</h1>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full border border-brand-border px-4 py-2 text-sm font-semibold hover:bg-brand-light"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <div className="rounded-2xl bg-brand-navy p-3 text-primary-foreground">
            <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-brand-gold">Workspace</p>
            <nav className="mt-2 space-y-2">
              <button
                type="button"
                onClick={() => setSection('jobs')}
                className={`w-full rounded-xl px-3 py-3 text-sm font-bold text-left ${section === 'jobs' ? 'bg-brand-royal' : 'text-brand-off-white/80 hover:bg-brand-light'}`}
              >
                Career posts
              </button>
              <button
                type="button"
                onClick={() => setSection('news')}
                className={`w-full rounded-xl px-3 py-3 text-sm font-medium text-left ${section === 'news' ? 'bg-brand-royal' : 'text-brand-off-white/80 hover:bg-brand-light'}`}
              >
                News & Events
              </button>
              <button
                type="button"
                onClick={() => setSection('testimonials')}
                className={`w-full rounded-xl px-3 py-3 text-sm font-medium text-left ${section === 'testimonials' ? 'bg-brand-royal' : 'text-brand-off-white/80 hover:bg-brand-light'}`}
              >
                Testimonials
              </button>
              <button
                type="button"
                onClick={() => setSection('contacts')}
                className={`w-full rounded-xl px-3 py-3 text-sm font-medium text-left ${section === 'contacts' ? 'bg-brand-royal' : 'text-brand-off-white/80 hover:bg-brand-light'}`}
              >
                Contact inbox
              </button>
            </nav>
          </div>
        </aside>

        <section>
          {section === 'jobs' && (
            <JobsSection
              jobs={jobs}
              message={message}
              showForm={showForm}
              form={form}
              editing={editing}
              onOpenNew={openNew}
              onEdit={openEdit}
              onRemove={remove}
              onToggle={toggle}
              onFormChange={setForm}
              onSave={save}
              onCloseForm={() => setShowForm(false)}
            />
          )}

          {section === 'news' && (
            <NewsSection
              newsEvents={newsEvents}
              editingContent={editingContent}
              newsForm={newsForm}
              message={message}
              onOpenEditor={openNewsEditor}
              onCloseEditor={() => setEditingContent(null)}
              onNewsFormChange={setNewsForm}
              onSaveNews={saveNews}
              onTogglePublish={(item) => toggleContent('news_events', item)}
              onRemove={(id) => removeContent('news_events', id)}
            />
          )}

          {section === 'testimonials' && (
            <TestimonialsSection
              testimonials={testimonials}
              editingContent={editingContent}
              testimonialForm={testimonialForm}
              message={message}
              onOpenEditor={openTestimonialEditor}
              onCloseEditor={() => setEditingContent(null)}
              onTestimonialFormChange={setTestimonialForm}
              onSaveTestimonial={saveTestimonial}
              onTogglePublish={(item) => toggleContent('testimonials', item)}
              onRemove={(id) => removeContent('testimonials', id)}
            />
          )}

          {section === 'contacts' && (
            <ContactsSection contacts={contacts} onMarkRead={markContact} />
          )}
        </section>
      </div>
    </main>
  )
}
