'use client'

import { FormEvent, createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type {
  ContactSubmission,
  FormState,
  Job,
  JobApplication,
  NewsEvent,
  NewsFormState,
  Testimonial,
  TestimonialFormState,
} from './types'
import { emptyForm } from './types'

type AdminContextValue = {
  jobs: Job[]
  newsEvents: NewsEvent[]
  testimonials: Testimonial[]
  contacts: ContactSubmission[]
  loading: boolean
  message: string
  showJobForm: boolean
  editingJob: string | null
  jobForm: FormState
  editingContent: string | null
  newsForm: NewsFormState
  testimonialForm: TestimonialFormState
  openNewJob: () => void
  editJob: (job: Job) => void
  closeJobForm: () => void
  setJobForm: (form: FormState) => void
  saveJob: (event: FormEvent<HTMLFormElement>) => void
  removeJob: (id: string) => void
  toggleJob: (job: Job) => void
  fetchJobApplications: (jobId: string) => Promise<JobApplication[]>
  openNewsEditor: () => void
  editNews: (item: NewsEvent) => void
  closeContentEditor: () => void
  setNewsForm: (form: NewsFormState) => void
  saveNews: (event: FormEvent<HTMLFormElement>) => void
  openTestimonialEditor: () => void
  editTestimonial: (item: Testimonial) => void
  setTestimonialForm: (form: TestimonialFormState) => void
  saveTestimonial: (event: FormEvent<HTMLFormElement>) => void
  toggleContent: (table: 'news_events' | 'testimonials', item: NewsEvent | Testimonial) => void
  removeContent: (table: 'news_events' | 'testimonials', id: string) => void
  markContact: (id: string) => void
  signOut: () => void
}

const AdminContext = createContext<AdminContextValue | null>(null)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [showJobForm, setShowJobForm] = useState(false)
  const [editingJob, setEditingJob] = useState<string | null>(null)
  const [jobForm, setJobForm] = useState<FormState>(emptyForm)
  const [editingContent, setEditingContent] = useState<string | null>(null)
  const [newsForm, setNewsFormState] = useState<NewsFormState>({
    title: '', category: 'News', excerpt: '', body: '', image_url: '', event_date: '',
  })
  const [testimonialForm, setTestimonialFormState] = useState<TestimonialFormState>({
    parent_name: '', student_name: '', thoughts: '', display_order: 0,
  })

  async function load() {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        router.replace('/admin/login')
        return
      }

      const { data: admin } = await supabase.from('admin_users').select('id').eq('id', user.id).maybeSingle()
      if (!admin) {
        setLoading(false)
        await supabase.auth.signOut()
        router.replace('/admin/login')
        return
      }

      const [{ data: jobData }, { data: newsData }, { data: testimonialData }, { data: contactData }] = await Promise.all([
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
    } catch {
      setLoading(false)
      router.replace('/admin/login')
    }
  }

  useEffect(() => { void load() }, [])

  function openNewJob() {
    setEditingJob(null); setJobForm(emptyForm); setShowJobForm(true); setMessage('')
  }

  function editJob(job: Job) {
    setEditingJob(job.id)
    setJobForm({ ...job, image_url: job.image_url ?? '', expires_at: job.expires_at ? job.expires_at.slice(0, 10) : '' })
    setShowJobForm(true); setMessage('')
  }

  async function saveJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage('')
    const supabase = createClient()
    const payload = { ...jobForm, image_url: jobForm.image_url || null, expires_at: jobForm.expires_at ? new Date(`${jobForm.expires_at}T23:59:59`).toISOString() : null }
    const result = editingJob ? await supabase.from('job_posts').update(payload).eq('id', editingJob) : await supabase.from('job_posts').insert(payload)
    if (result.error) { setMessage(result.error.message); return }
    setShowJobForm(false); await load()
  }

  async function removeJob(id: string) {
    if (!window.confirm('Delete this job post?')) return
    await createClient().from('job_posts').delete().eq('id', id); await load()
  }

  async function toggleJob(job: Job) {
    await createClient().from('job_posts').update({ is_active: !job.is_active }).eq('id', job.id); await load()
  }

  async function fetchJobApplications(jobId: string) {
    const { data, error } = await createClient()
      .from('job_applications')
      .select('*')
      .eq('job_id', jobId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data ?? []) as JobApplication[]
  }

  function openNewsEditor() {
    setEditingContent('new'); setNewsFormState({ title: '', category: 'News', excerpt: '', body: '', image_url: '', event_date: '' }); setMessage('')
  }

  function editNews(item: NewsEvent) {
    setEditingContent(item.id)
    setNewsFormState({
      title: item.title,
      category: item.category,
      excerpt: item.excerpt,
      body: item.body,
      image_url: item.image_url ?? '',
      event_date: item.event_date ? item.event_date.slice(0, 10) : '',
    })
    setMessage('')
  }

  async function saveNews(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage('')
    const payload = { ...newsForm, image_url: newsForm.image_url || null, event_date: newsForm.event_date ? new Date(`${newsForm.event_date}T12:00:00`).toISOString() : null }
    const result = editingContent === 'new'
      ? await createClient().from('news_events').insert(payload)
      : editingContent ? await createClient().from('news_events').update(payload).eq('id', editingContent) : null
    if (!result) { setMessage('Unable to save update.'); return }
    if (result.error) { setMessage(result.error.message); return }
    setEditingContent(null); await load()
  }

  function openTestimonialEditor() {
    setEditingContent('new'); setTestimonialFormState({ parent_name: '', student_name: '', thoughts: '', display_order: 0 }); setMessage('')
  }

  function editTestimonial(item: Testimonial) {
    setEditingContent(item.id)
    setTestimonialFormState({
      parent_name: item.parent_name,
      student_name: item.student_name,
      thoughts: item.thoughts,
      display_order: item.display_order,
    })
    setMessage('')
  }

  async function saveTestimonial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage('')
    const result = editingContent === 'new'
      ? await createClient().from('testimonials').insert(testimonialForm)
      : editingContent ? await createClient().from('testimonials').update(testimonialForm).eq('id', editingContent) : null
    if (!result) { setMessage('Unable to save testimonial.'); return }
    if (result.error) { setMessage(result.error.message); return }
    setEditingContent(null); await load()
  }

  async function toggleContent(table: 'news_events' | 'testimonials', item: NewsEvent | Testimonial) {
    const key = 'is_published' in item ? item.is_published : false
    await createClient().from(table).update({ is_published: !key }).eq('id', item.id); await load()
  }

  async function removeContent(table: 'news_events' | 'testimonials', id: string) {
    if (!window.confirm('Delete this item?')) return
    await createClient().from(table).delete().eq('id', id); await load()
  }

  async function markContact(id: string) {
    await createClient().from('contact_submissions').update({ is_read: true }).eq('id', id); await load()
  }

  async function signOut() {
    await createClient().auth.signOut(); router.replace('/admin/login')
  }

  return <AdminContext.Provider value={{ jobs, newsEvents, testimonials, contacts, loading, message, showJobForm, editingJob, jobForm, editingContent, newsForm, testimonialForm, openNewJob, editJob, closeJobForm: () => setShowJobForm(false), setJobForm, saveJob, removeJob, toggleJob, fetchJobApplications, openNewsEditor, editNews, closeContentEditor: () => setEditingContent(null), setNewsForm: setNewsFormState, saveNews, openTestimonialEditor, editTestimonial, setTestimonialForm: setTestimonialFormState, saveTestimonial, toggleContent, removeContent, markContact, signOut }}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) throw new Error('useAdmin must be used within AdminProvider')
  return context
}
