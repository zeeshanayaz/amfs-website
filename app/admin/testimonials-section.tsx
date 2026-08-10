'use client'

import { FormEvent } from 'react'
import { Plus, Trash2, X } from 'lucide-react'
import type { Testimonial, TestimonialFormState } from './types'

type TestimonialsSectionProps = {
  testimonials: Testimonial[]
  editingContent: string | null
  testimonialForm: TestimonialFormState
  message: string
  onOpenEditor: () => void
  onCloseEditor: () => void
  onTestimonialFormChange: (form: TestimonialFormState) => void
  onSaveTestimonial: (event: FormEvent<HTMLFormElement>) => void
  onTogglePublish: (item: Testimonial) => void
  onRemove: (id: string) => void
}

export function TestimonialsSection({
  testimonials,
  editingContent,
  testimonialForm,
  message,
  onOpenEditor,
  onCloseEditor,
  onTestimonialFormChange,
  onSaveTestimonial,
  onTogglePublish,
  onRemove,
}: TestimonialsSectionProps) {
  const isEditing = editingContent !== null

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Community voices</p>
          <h2 className="mt-2 font-serif text-4xl font-bold">Testimonials</h2>
          <p className="mt-2 text-brand-dark-gray">Add parent reflections and choose when they appear publicly.</p>
        </div>
        <button
          type="button"
          onClick={onOpenEditor}
          className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-royal"
        >
          <Plus className="size-4" /> Add testimonial
        </button>
      </div>

      {message ? (
        <p role="alert" className="mb-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
          {message}
        </p>
      ) : null}

      <div className="grid gap-4">
        {testimonials.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-brand-border bg-background p-12 text-center text-brand-dark-gray">
            No testimonials have been added yet.
          </div>
        ) : (
          testimonials.map((item) => (
            <article key={item.id} className="rounded-2xl border border-brand-border bg-background p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand-royal">
                    {item.is_published ? 'Published' : 'Draft'}
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-bold">{item.parent_name} · {item.student_name}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-dark-gray">{item.thoughts}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onTogglePublish(item)}
                    className="rounded-full border border-brand-border px-3 py-2 text-xs font-bold"
                  >
                    {item.is_published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="rounded-full border border-brand-border p-2 text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {isEditing ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-brand-navy/55 p-0 sm:items-center sm:p-6">
          <form onSubmit={onSaveTestimonial} className="max-h-[94vh] w-full overflow-y-auto rounded-t-3xl bg-background p-6 shadow-2xl sm:max-w-2xl sm:rounded-3xl sm:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Testimonials</p>
                <h2 className="mt-2 font-serif text-3xl font-bold">Testimonial details</h2>
              </div>
              <button
                type="button"
                onClick={onCloseEditor}
                aria-label="Close form"
                className="rounded-full p-2 hover:bg-brand-light"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid gap-4">
              <input
                required
                placeholder="Parent name"
                value={testimonialForm.parent_name}
                onChange={(event) => onTestimonialFormChange({ ...testimonialForm, parent_name: event.target.value })}
                className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3"
              />
              <input
                required
                placeholder="Student name"
                value={testimonialForm.student_name}
                onChange={(event) => onTestimonialFormChange({ ...testimonialForm, student_name: event.target.value })}
                className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3"
              />
              <textarea
                required
                rows={6}
                placeholder="Parent thoughts about the school"
                value={testimonialForm.thoughts}
                onChange={(event) => onTestimonialFormChange({ ...testimonialForm, thoughts: event.target.value })}
                className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3"
              />
              <input
                type="number"
                min="0"
                placeholder="Display order"
                value={testimonialForm.display_order}
                onChange={(event) =>
                  onTestimonialFormChange({
                    ...testimonialForm,
                    display_order: Number(event.target.value),
                  })
                }
                className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3"
              />
              <button className="rounded-full bg-brand-navy px-5 py-3 font-bold text-primary-foreground hover:bg-brand-royal">
                Save testimonial
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  )
}
