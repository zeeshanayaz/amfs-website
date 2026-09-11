'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { AlertCircle, CheckCircle2, LoaderCircle, Pencil, Plus, X } from 'lucide-react'
import { Lightbox } from '@/components/ui/lightbox'
import type { CampusOption, Faculty, FacultyFormState } from './types'

type FacultySectionProps = {
  faculties: Faculty[]
  campuses: CampusOption[]
  message: string
  showForm: boolean
  form: FacultyFormState
  editing: string | null
  saving: boolean
  toast: { type: 'success' | 'error'; message: string } | null
  onOpenNew: () => void
  onEdit: (faculty: Faculty) => void
  onRemove: (id: string) => void
  onToggle: (faculty: Faculty) => void
  onFormChange: (form: FacultyFormState) => void
  onImageFileChange: (file: File | null) => void
  onSave: (event: FormEvent<HTMLFormElement>) => void
  onCloseForm: () => void
}

export function FacultySection({ faculties, campuses, message, showForm, form, editing, saving, toast, onOpenNew, onEdit, onRemove, onToggle, onFormChange, onImageFileChange, onSave, onCloseForm }: FacultySectionProps) {
  const [preview, setPreview] = useState<{ src: string; title: string } | null>(null)
  const campusNames = new Map(campuses.map((campus) => [campus.id, campus.name]))

  return (
    <>
      {toast ? <div role={toast.type === 'error' ? 'alert' : 'status'} className={`fixed right-4 top-4 z-[60] flex max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-xl ${toast.type === 'error' ? 'border-destructive/20 bg-destructive text-destructive-foreground' : 'border-brand-royal/20 bg-brand-navy text-white'}`}>
        {toast.type === 'error' ? <AlertCircle className="mt-0.5 size-5 shrink-0" /> : <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-gold" />}
        <span>{toast.message}</span>
      </div> : null}

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">People management</p>
          <h2 className="mt-2 font-serif text-4xl font-bold">Faculty</h2>
          <p className="mt-2 text-brand-dark-gray">Manage the educators and leadership team shown across the AMFS website.</p>
        </div>
        <button type="button" onClick={onOpenNew} className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-royal">
          <Plus className="size-4" /> Add faculty
        </button>
      </div>

      {message ? <p role="alert" className="mb-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{message}</p> : null}

      <div className="grid gap-4">
        {faculties.length === 0 ? <div className="rounded-3xl border border-dashed border-brand-border bg-background p-12 text-center text-brand-dark-gray">No faculty members yet. Add the first profile.</div> : faculties.map((faculty) => (
          <article key={faculty.id} className="rounded-2xl border border-brand-border bg-background p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-brand-light">
                {faculty.image_url ? <button type="button" onClick={() => setPreview({ src: faculty.image_url!, title: faculty.full_name })} className="group absolute inset-0 h-full w-full cursor-zoom-in" aria-label={`Preview ${faculty.full_name} image`}><Image src={faculty.image_url} alt={faculty.full_name} fill sizes="96px" className="object-cover transition duration-500 group-hover:scale-105" /></button> : <div className="grid h-full place-items-center px-2 text-center text-xs font-semibold text-brand-royal">AMFS Faculty</div>}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
                  <span className={`rounded-full px-3 py-1 ${faculty.is_active ? 'bg-brand-light text-brand-royal' : 'bg-muted text-muted-foreground'}`}>{faculty.is_active ? 'Active' : 'Inactive'}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold">{faculty.full_name}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-royal">{faculty.designation}</p>
                <p className="mt-1 text-sm text-brand-dark-gray">{campusNames.get(faculty.campus_id) ?? 'Unknown campus'}{faculty.email ? ` · ${faculty.email}` : ''}</p>
                {faculty.bio_summary ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-brand-dark-gray">{faculty.bio_summary}</p> : null}
              </div>
              <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
                <button type="button" onClick={() => onEdit(faculty)} aria-label={`Edit ${faculty.full_name}`} className="rounded-full border border-brand-border p-2 hover:bg-brand-light"><Pencil className="size-4" /></button>
                <button type="button" onClick={() => onToggle(faculty)} className="rounded-full border border-brand-border px-3 py-2 text-xs font-bold">{faculty.is_active ? 'Deactivate' : 'Activate'}</button>
                <button type="button" onClick={() => onRemove(faculty.id)} className="rounded-full border border-destructive/30 px-3 py-2 text-xs font-bold text-destructive hover:bg-destructive/10">Delete</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {showForm ? <div className="fixed inset-0 z-50 flex items-end justify-center bg-brand-navy/55 p-0 sm:items-center sm:p-6">
        <div className="max-h-[94vh] w-full overflow-y-auto rounded-t-3xl bg-background p-6 shadow-2xl sm:max-w-3xl sm:rounded-3xl sm:p-8">
          <div className="mb-6 flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">{editing ? 'Edit faculty profile' : 'New faculty profile'}</p><h2 className="mt-2 font-serif text-3xl font-bold">{editing ? 'Edit faculty member' : 'Faculty details'}</h2></div><button type="button" onClick={onCloseForm} disabled={saving} aria-label="Close form" className="rounded-full p-2 hover:bg-brand-light disabled:opacity-50"><X className="size-5" /></button></div>
          <form onSubmit={onSave} aria-busy={saving} className="grid gap-4 sm:grid-cols-2">
            <fieldset disabled={saving} className="contents">
              <label className="grid gap-2 text-sm font-semibold">Full name<input required value={form.full_name} onChange={(event) => onFormChange({ ...form, full_name: event.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label>
              <label className="grid gap-2 text-sm font-semibold">Designation<input required value={form.designation} onChange={(event) => onFormChange({ ...form, designation: event.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label>
              <label className="grid gap-2 text-sm font-semibold">Gender<select required value={form.gender} onChange={(event) => onFormChange({ ...form, gender: event.target.value as 'male' | 'female' })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal"><option value="male">Male</option><option value="female">Female</option></select></label>
              <label className="grid gap-2 text-sm font-semibold">Qualification <span className="font-normal text-brand-dark-gray">(optional)</span><input value={form.qualification ?? ''} onChange={(event) => onFormChange({ ...form, qualification: event.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label>
              <label className="grid gap-2 text-sm font-semibold">Campus<select required value={form.campus_id} onChange={(event) => onFormChange({ ...form, campus_id: event.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal"><option value="">Select campus</option>{campuses.map((campus) => <option key={campus.id} value={campus.id}>{campus.name}</option>)}</select></label>
              <label className="grid gap-2 text-sm font-semibold">Email <span className="font-normal text-brand-dark-gray">(optional)</span><input type="email" value={form.email ?? ''} onChange={(event) => onFormChange({ ...form, email: event.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label>
              <label className="grid gap-2 text-sm font-semibold">LinkedIn URL <span className="font-normal text-brand-dark-gray">(optional)</span><input type="url" value={form.linkedin_url ?? ''} onChange={(event) => onFormChange({ ...form, linkedin_url: event.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label>
              <label className="grid gap-2 text-sm font-semibold sm:col-span-2">Profile image <span className="font-normal text-brand-dark-gray">(optional, max 200 KB after compression)</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => onImageFileChange(event.target.files?.[0] ?? null)} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" />{form.image_url ? <span className="text-xs font-normal text-brand-dark-gray">An existing image will be kept unless you select a new file.</span> : null}</label>
              <label className="grid gap-2 text-sm font-semibold sm:col-span-2">Bio summary <span className="font-normal text-brand-dark-gray">(optional)</span><textarea rows={4} value={form.bio_summary ?? ''} onChange={(event) => onFormChange({ ...form, bio_summary: event.target.value })} className="resize-y rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label>
              <label className="flex items-center gap-3 text-sm font-semibold sm:col-span-2"><input type="checkbox" checked={form.is_active} onChange={(event) => onFormChange({ ...form, is_active: event.target.checked })} className="size-4 accent-brand-royal" /> Active status</label>
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-royal disabled:cursor-wait disabled:opacity-70 sm:col-span-2">{saving ? <LoaderCircle className="size-4 animate-spin" /> : null}{saving ? 'Saving faculty...' : editing ? 'Save changes' : 'Add faculty'}</button>
            </fieldset>
          </form>
        </div>
      </div> : null}

      <Lightbox open={Boolean(preview)} title={preview?.title} onClose={() => setPreview(null)}>{preview ? <Image src={preview.src} alt={preview.title} width={1600} height={1200} className="h-[75vh] w-full object-contain" /> : null}</Lightbox>
    </>
  )
}
