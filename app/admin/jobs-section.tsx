'use client'

import { FormEvent } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import type { FormState, Job } from './types'

type JobsSectionProps = {
  jobs: Job[]
  message: string
  showForm: boolean
  form: FormState
  editing: string | null
  onOpenNew: () => void
  onEdit: (job: Job) => void
  onRemove: (id: string) => void
  onToggle: (job: Job) => void
  onFormChange: (form: FormState) => void
  onSave: (event: FormEvent<HTMLFormElement>) => void
  onCloseForm: () => void
}

export function JobsSection({
  jobs,
  message,
  showForm,
  form,
  editing,
  onOpenNew,
  onEdit,
  onRemove,
  onToggle,
  onFormChange,
  onSave,
  onCloseForm,
}: JobsSectionProps) {
  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Career management</p>
          <h2 className="mt-2 font-serif text-4xl font-bold">Open roles</h2>
          <p className="mt-2 text-brand-dark-gray">Create and manage opportunities across AMFS campuses.</p>
        </div>
        <button
          type="button"
          onClick={onOpenNew}
          className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-royal"
        >
          <Plus className="size-4" /> Add job post
        </button>
      </div>

      {message ? (
        <p role="alert" className="mb-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
          {message}
        </p>
      ) : null}

      <div className="grid gap-4">
        {jobs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-brand-border bg-background p-12 text-center text-brand-dark-gray">
            No job posts yet. Create your first opportunity.
          </div>
        ) : (
          jobs.map((job) => (
            <article key={job.id} className="rounded-2xl border border-brand-border bg-background p-5 sm:p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div>
                  <div className="mb-2 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
                    <span
                      className={`rounded-full px-3 py-1 ${
                        job.is_active ? 'bg-brand-light text-brand-royal' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {job.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <span className="rounded-full bg-brand-gold/30 px-3 py-1">{job.employment_type}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold">{job.title}</h3>
                  <p className="mt-1 text-sm text-brand-dark-gray">{job.campus_name} · {job.department}</p>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-brand-dark-gray">{job.description}</p>
                </div>
                <div className="flex shrink-0 items-start gap-2">
                  <button
                    type="button"
                    onClick={() => onToggle(job)}
                    className="rounded-full border border-brand-border px-3 py-2 text-xs font-bold"
                  >
                    {job.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(job)}
                    aria-label={`Edit ${job.title}`}
                    className="rounded-full border border-brand-border p-2 hover:bg-brand-light"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(job.id)}
                    aria-label={`Delete ${job.title}`}
                    className="rounded-full border border-brand-border p-2 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {showForm ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-brand-navy/55 p-0 sm:items-center sm:p-6">
          <div className="max-h-[94vh] w-full overflow-y-auto rounded-t-3xl bg-background p-6 shadow-2xl sm:max-w-3xl sm:rounded-3xl sm:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                  {editing ? 'Edit opportunity' : 'New opportunity'}
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold">
                  {editing ? 'Edit opportunity' : 'Career post details'}
                </h2>
              </div>
              <button
                type="button"
                onClick={onCloseForm}
                aria-label="Close form"
                className="rounded-full p-2 hover:bg-brand-light"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={onSave} className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                Job title
                <input
                  required
                  value={form.title}
                  onChange={(event) => onFormChange({ ...form, title: event.target.value })}
                  className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold">
                Department
                <select
                  value={form.department}
                  onChange={(event) => onFormChange({ ...form, department: event.target.value })}
                  className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal"
                >
                  <option>Teaching</option>
                  <option>Administration</option>
                  <option>Support</option>
                  <option>Leadership</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold">
                Job type
                <select
                  value={form.employment_type}
                  onChange={(event) => onFormChange({ ...form, employment_type: event.target.value })}
                  className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold">
                Campus name
                <input
                  required
                  value={form.campus_name}
                  onChange={(event) => onFormChange({ ...form, campus_name: event.target.value })}
                  className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold">
                Address
                <input
                  required
                  value={form.address}
                  onChange={(event) => onFormChange({ ...form, address: event.target.value })}
                  className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                Image URL <span className="font-normal text-brand-dark-gray">(optional)</span>
                <input
                  type="url"
                  value={form.image_url ?? ''}
                  onChange={(event) => onFormChange({ ...form, image_url: event.target.value })}
                  className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold">
                Post expiry <span className="font-normal text-brand-dark-gray">(optional)</span>
                <input
                  type="date"
                  value={form.expires_at ?? ''}
                  onChange={(event) => onFormChange({ ...form, expires_at: event.target.value })}
                  className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal"
                />
              </label>

              <label className="flex items-center gap-3 pt-7 text-sm font-semibold sm:col-span-2">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(event) => onFormChange({ ...form, is_active: event.target.checked })}
                  className="size-4 accent-brand-royal"
                />
                Active status
              </label>

              <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                Description
                <textarea
                  required
                  minLength={10}
                  rows={6}
                  value={form.description}
                  onChange={(event) => onFormChange({ ...form, description: event.target.value })}
                  className="resize-y rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal"
                />
              </label>

              <button className="rounded-full bg-brand-navy px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-royal sm:col-span-2">
                {editing ? 'Save changes' : 'Publish job post'}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}
