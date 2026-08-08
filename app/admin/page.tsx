'use client'

import { FormEvent, useEffect, useState } from 'react'
import { BriefcaseBusiness, LogOut, Plus, Trash2, Pencil, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Job = { id: string; title: string; description: string; department: string; employment_type: string; campus_name: string; location: string; address: string; image_url: string | null; expires_at: string | null; is_active: boolean }
type FormState = Omit<Job, 'id'>
const emptyForm: FormState = { title: '', description: '', department: 'Teaching', employment_type: 'Full-time', campus_name: 'Main Campus', location: 'Karachi, Pakistan', address: 'Karachi, Pakistan', image_url: '', expires_at: '', is_active: true }

export default function AdminDashboard() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [form, setForm] = useState<FormState>(emptyForm)
  const [editing, setEditing] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  async function load() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.replace('/admin/login'); return }
    const { data: admin } = await supabase.from('admin_users').select('id').eq('id', user.id).maybeSingle()
    if (!admin) { await supabase.auth.signOut(); router.replace('/admin/login'); return }
    const { data } = await supabase.from('job_posts').select('*').order('created_at', { ascending: false })
    setJobs((data ?? []) as Job[])
    setLoading(false)
  }
  useEffect(() => { void load() }, [])

  function openNew() { setEditing(null); setForm(emptyForm); setShowForm(true); setMessage('') }
  function openEdit(job: Job) { setEditing(job.id); setForm({ ...job, image_url: job.image_url ?? '', expires_at: job.expires_at ? job.expires_at.slice(0, 10) : '' }); setShowForm(true); setMessage('') }
  async function save(event: FormEvent<HTMLFormElement>) {
    const supabase = createClient()
    event.preventDefault(); setMessage('')
    const payload = { ...form, image_url: form.image_url || null, expires_at: form.expires_at ? new Date(`${form.expires_at}T23:59:59`).toISOString() : null }
    const result = editing ? await supabase.from('job_posts').update(payload).eq('id', editing) : await supabase.from('job_posts').insert(payload)
    if (result.error) { setMessage(result.error.message); return }
    setShowForm(false); await load()
  }
  async function remove(id: string) { if (!window.confirm('Delete this job post?')) return; const supabase = createClient(); await supabase.from('job_posts').delete().eq('id', id); await load() }
  async function toggle(job: Job) { const supabase = createClient(); await supabase.from('job_posts').update({ is_active: !job.is_active }).eq('id', job.id); await load() }
  async function logout() { const supabase = createClient(); await supabase.auth.signOut(); router.replace('/admin/login') }

  if (loading) return <main className="grid min-h-screen place-items-center bg-brand-off-white text-brand-navy">Loading dashboard…</main>
  return <main className="min-h-screen bg-brand-off-white text-brand-navy">
    <header className="border-b border-brand-border bg-background px-6 py-5 sm:px-10"><div className="mx-auto flex max-w-7xl items-center justify-between"><div className="flex items-center gap-3"><div className="flex size-11 items-center justify-center rounded-xl bg-brand-navy text-brand-gold"><BriefcaseBusiness className="size-5" /></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">AMFS admin</p><h1 className="font-serif text-xl font-bold">School operations</h1></div></div><button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-brand-border px-4 py-2 text-sm font-semibold hover:bg-brand-light"><LogOut className="size-4" /> Sign out</button></div></header>
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[220px_1fr]">
      <aside className="hidden lg:block">
        <div className="rounded-2xl bg-brand-navy p-3 text-primary-foreground">
          <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-brand-gold">Workspace</p>
          <nav className="mt-2 space-y-2">
            <button className="w-full rounded-xl bg-brand-royal px-3 py-3 text-sm font-bold text-left">Career posts</button>
            <button className="w-full rounded-xl px-3 py-3 text-sm font-medium text-left text-brand-off-white/80 hover:bg-brand-light">Events</button>
            <button className="w-full rounded-xl px-3 py-3 text-sm font-medium text-left text-brand-off-white/80 hover:bg-brand-light">Users</button>
          </nav>
        </div>
      </aside>
      <section>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Career management</p>
            <h2 className="mt-2 font-serif text-4xl font-bold">Open roles</h2>
            <p className="mt-2 text-brand-dark-gray">Create and manage opportunities across AMFS campuses.</p>
          </div>
          <button onClick={openNew} className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-royal"><Plus className="size-4" /> Add job post</button>
        </div>
        {message && <p role="alert" className="mb-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{message}</p>}
        <div className="grid gap-4">{jobs.length === 0 ? <div className="rounded-3xl border border-dashed border-brand-border bg-background p-12 text-center text-brand-dark-gray">No job posts yet. Create your first opportunity.</div> : jobs.map((job) => <article key={job.id} className="rounded-2xl border border-brand-border bg-background p-5 sm:p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row"><div><div className="mb-2 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider"><span className={`rounded-full px-3 py-1 ${job.is_active ? 'bg-brand-light text-brand-royal' : 'bg-muted text-muted-foreground'}`}>{job.is_active ? 'Active' : 'Inactive'}</span><span className="rounded-full bg-brand-gold/30 px-3 py-1">{job.employment_type}</span></div><h3 className="font-serif text-2xl font-bold">{job.title}</h3><p className="mt-1 text-sm text-brand-dark-gray">{job.campus_name} · {job.department}</p><p className="mt-3 line-clamp-2 text-sm leading-6 text-brand-dark-gray">{job.description}</p></div><div className="flex shrink-0 items-start gap-2"><button onClick={() => toggle(job)} className="rounded-full border border-brand-border px-3 py-2 text-xs font-bold">{job.is_active ? 'Deactivate' : 'Activate'}</button><button onClick={() => openEdit(job)} aria-label={`Edit ${job.title}`} className="rounded-full border border-brand-border p-2 hover:bg-brand-light"><Pencil className="size-4" /></button><button onClick={() => remove(job.id)} aria-label={`Delete ${job.title}`} className="rounded-full border border-brand-border p-2 text-destructive hover:bg-destructive/10"><Trash2 className="size-4" /></button></div></div></article>)}</div>
      </section>
    </div>
    {showForm && <div className="fixed inset-0 z-50 flex items-end justify-center bg-brand-navy/55 p-0 sm:items-center sm:p-6"><div className="max-h-[94vh] w-full overflow-y-auto rounded-t-3xl bg-background p-6 shadow-2xl sm:max-w-3xl sm:rounded-3xl sm:p-8"><div className="mb-6 flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">{editing ? 'Edit opportunity' : 'New opportunity'}</p><h2 className="mt-2 font-serif text-3xl font-bold">Career post details</h2></div><button onClick={() => setShowForm(false)} aria-label="Close form" className="rounded-full p-2 hover:bg-brand-light"><X className="size-5" /></button></div><form onSubmit={save} className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold sm:col-span-2">Job title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label><label className="grid gap-2 text-sm font-semibold">Department<select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal"><option>Teaching</option><option>Administration</option><option>Support</option><option>Leadership</option></select></label><label className="grid gap-2 text-sm font-semibold">Job type<select value={form.employment_type} onChange={(e) => setForm({ ...form, employment_type: e.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></label><label className="grid gap-2 text-sm font-semibold">Campus name<input required value={form.campus_name} onChange={(e) => setForm({ ...form, campus_name: e.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal" /></label><label className="grid gap-2 text-sm font-semibold">Address<input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal" /></label><label className="grid gap-2 text-sm font-semibold sm:col-span-2">Image URL <span className="font-normal text-brand-dark-gray">(optional)</span><input type="url" value={form.image_url ?? ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal" /></label><label className="grid gap-2 text-sm font-semibold">Post expiry <span className="font-normal text-brand-dark-gray">(optional)</span><input type="date" value={form.expires_at ?? ''} onChange={(e) => setForm({ ...form, expires_at: e.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal" /></label><label className="flex items-center gap-3 pt-7 text-sm font-semibold"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="size-4 accent-brand-royal" /> Active status</label><label className="grid gap-2 text-sm font-semibold sm:col-span-2">Description<textarea required minLength={10} rows={6} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="resize-y rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal" /></label><button className="rounded-full bg-brand-navy px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-royal sm:col-span-2">{editing ? 'Save changes' : 'Publish job post'}</button></form></div></div>}
  </main>
}
