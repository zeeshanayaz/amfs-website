'use client'

import { FormEvent } from 'react'
import { Eye, ExternalLink, Pencil, Plus, X } from 'lucide-react'
import { useState } from 'react'
import type { FormState, Job, JobApplication } from './types'

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
  onFetchApplications: (jobId: string) => Promise<JobApplication[]>
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
  onFetchApplications,
  onFormChange,
  onSave,
  onCloseForm,
}: JobsSectionProps) {
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([])
  const [applicationsLoading, setApplicationsLoading] = useState(false)
  const [applicationsError, setApplicationsError] = useState('')
  const jobTitles = new Map(jobs.map((job) => [job.id, job.title]))

  async function viewApplications(job: Job) {
    setSelectedJob(job)
    setJobApplications([])
    setApplicationsError('')
    setApplicationsLoading(true)

    try {
      setJobApplications(await onFetchApplications(job.id))
    } catch (error) {
      setApplicationsError(error instanceof Error ? error.message : 'Unable to load applications.')
    } finally {
      setApplicationsLoading(false)
    }
  }

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
                      className={`rounded-full px-3 py-1 ${job.is_active ? 'bg-brand-light text-brand-royal' : 'bg-muted text-muted-foreground'
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
                    onClick={() => void viewApplications(job)}
                    className="inline-flex items-center gap-2 rounded-full border border-brand-border px-3 py-2 text-xs font-bold hover:bg-brand-light"
                  >
                    <Eye className="size-4" /> View applications
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
                    onClick={() => onToggle(job)}
                    className="rounded-full border border-brand-border px-3 py-2 text-xs font-bold"
                  >
                    {job.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {selectedJob ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-brand-navy/55 p-0 sm:items-center sm:p-6">
          <div role="dialog" aria-modal="true" aria-labelledby="job-applications-title" className="max-h-[94vh] w-full overflow-y-auto rounded-t-3xl bg-background p-6 shadow-2xl sm:max-w-5xl sm:rounded-3xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Candidate pipeline</p>
                <h2 id="job-applications-title" className="mt-2 font-serif text-3xl font-bold">Applications for {selectedJob.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                aria-label="Close job applications"
                className="rounded-full p-2 hover:bg-brand-light"
              >
                <X className="size-5" />
              </button>
            </div>

            {applicationsLoading ? (
              <p className="mt-8 text-center text-sm text-brand-dark-gray">Loading applications...</p>
            ) : applicationsError ? (
              <p role="alert" className="mt-8 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">{applicationsError}</p>
            ) : jobApplications.length === 0 ? (
              <p className="mt-8 rounded-2xl border border-dashed border-brand-border p-8 text-center text-sm text-brand-dark-gray">No applications have been submitted for this job.</p>
            ) : (
              <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-border">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-brand-off-white text-xs uppercase tracking-wider text-brand-dark-gray">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-bold">Applicant</th>
                      <th scope="col" className="px-4 py-3 font-bold">Contact</th>
                      <th scope="col" className="px-4 py-3 font-bold">Applied</th>
                      <th scope="col" className="px-4 py-3 font-bold">Resume</th>
                      <th scope="col" className="px-4 py-3 font-bold">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border">
                    {jobApplications.map((application) => (
                      <tr key={application.id} className="align-top">
                        <td className="px-4 py-4 font-semibold text-brand-navy">{application.full_name}</td>
                        <td className="px-4 py-4 text-brand-dark-gray">
                          <a href={`mailto:${application.email}`} className="block text-brand-royal hover:underline">{application.email}</a>
                          <a href={`tel:${application.phone}`} className="mt-1 block text-brand-royal hover:underline">{application.phone}</a>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-brand-dark-gray">{new Date(application.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-4">
                          {application.resume_url ? <a href={application.resume_url} target="_blank" rel="noreferrer" className="font-bold text-brand-royal hover:underline">Open resume</a> : <span className="text-brand-dark-gray">Not provided</span>}
                        </td>
                        <td className="px-4 py-4">
                          <button type="button" onClick={() => setSelectedApplication(application)} className="inline-flex items-center gap-2 rounded-full border border-brand-border px-3 py-2 text-xs font-bold hover:bg-brand-light">
                            <Eye className="size-4" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {selectedApplication ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-brand-navy/55 p-0 sm:items-center sm:p-6">
          <div role="dialog" aria-modal="true" aria-labelledby="application-details-title" className="max-h-[94vh] w-full overflow-y-auto rounded-t-3xl bg-background p-6 shadow-2xl sm:max-w-2xl sm:rounded-3xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Applicant details</p>
                <h2 id="application-details-title" className="mt-2 font-serif text-3xl font-bold">{selectedApplication.full_name}</h2>
                <p className="mt-2 text-sm text-brand-dark-gray">{selectedApplication.job_id ? jobTitles.get(selectedApplication.job_id) ?? 'Deleted job post' : 'Unassigned job'}</p>
              </div>
              <button type="button" onClick={() => setSelectedApplication(null)} aria-label="Close applicant details" className="rounded-full p-2 hover:bg-brand-light">
                <X className="size-5" />
              </button>
            </div>

            <dl className="mt-6 grid gap-4 rounded-2xl bg-brand-off-white p-5 sm:grid-cols-2">
              <div><dt className="text-xs font-bold uppercase tracking-wider text-brand-dark-gray">Email</dt><dd className="mt-1 break-all text-sm font-semibold"><a href={`mailto:${selectedApplication.email}`} className="text-brand-royal">
                      {selectedApplication.email}
                    </a></dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-wider text-brand-dark-gray">Phone</dt><dd className="mt-1 text-sm font-semibold"><a href={`tel:${selectedApplication.phone}`} className="text-brand-royal">
                      {selectedApplication.phone}
                    </a></dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-wider text-brand-dark-gray">Applied</dt><dd className="mt-1 text-sm font-semibold">{new Date(selectedApplication.created_at).toLocaleString()}</dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-wider text-brand-dark-gray">Resume</dt><dd className="mt-1">{selectedApplication.resume_url ? <a href={selectedApplication.resume_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-bold text-brand-royal hover:underline">Open resume <ExternalLink className="size-3" /></a> : <span className="text-sm text-brand-dark-gray">Not provided</span>}</dd></div>
            </dl>
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-dark-gray">Cover letter</h3>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-brand-charcoal">{selectedApplication.cover_letter}</p>
            </div>
          </div>
        </div>
      ) : null}

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
