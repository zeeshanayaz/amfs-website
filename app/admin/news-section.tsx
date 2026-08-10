'use client'

import { FormEvent } from 'react'
import { Plus, Trash2, X } from 'lucide-react'
import type { NewsEvent, NewsFormState } from './types'

type NewsSectionProps = {
  newsEvents: NewsEvent[]
  editingContent: string | null
  newsForm: NewsFormState
  message: string
  onOpenEditor: () => void
  onCloseEditor: () => void
  onNewsFormChange: (form: NewsFormState) => void
  onSaveNews: (event: FormEvent<HTMLFormElement>) => void
  onTogglePublish: (item: NewsEvent) => void
  onRemove: (id: string) => void
}

export function NewsSection({
  newsEvents,
  editingContent,
  newsForm,
  message,
  onOpenEditor,
  onCloseEditor,
  onNewsFormChange,
  onSaveNews,
  onTogglePublish,
  onRemove,
}: NewsSectionProps) {
  const isEditing = editingContent !== null
  const modalTitle = editingContent === 'new' ? 'Add update' : 'Update details'

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Content management</p>
          <h2 className="mt-2 font-serif text-4xl font-bold">News & Events</h2>
          <p className="mt-2 text-brand-dark-gray">Publish announcements, school news, and upcoming events.</p>
        </div>
        <button
          type="button"
          onClick={onOpenEditor}
          className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-royal"
        >
          <Plus className="size-4" /> Add update
        </button>
      </div>

      {message ? (
        <p role="alert" className="mb-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
          {message}
        </p>
      ) : null}

      <div className="grid gap-4">
        {newsEvents.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-brand-border bg-background p-12 text-center text-brand-dark-gray">
            No news or events published yet.
          </div>
        ) : (
          newsEvents.map((item) => (
            <article key={item.id} className="rounded-2xl border border-brand-border bg-background p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand-royal">
                    {item.is_published ? 'Published' : 'Draft'}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-brand-dark-gray">{item.category} · {item.excerpt}</p>
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
          <form onSubmit={onSaveNews} className="max-h-[94vh] w-full overflow-y-auto rounded-t-3xl bg-background p-6 shadow-2xl sm:max-w-2xl sm:rounded-3xl sm:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">News & Events</p>
                <h2 className="mt-2 font-serif text-3xl font-bold">{modalTitle}</h2>
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
                placeholder="Title"
                value={newsForm.title}
                onChange={(event) => onNewsFormChange({ ...newsForm, title: event.target.value })}
                className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3"
              />
              <select
                value={newsForm.category}
                onChange={(event) => onNewsFormChange({ ...newsForm, category: event.target.value })}
                className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3"
              >
                <option>News</option>
                <option>Event</option>
                <option>Announcement</option>
              </select>
              <input
                required
                placeholder="Short excerpt"
                value={newsForm.excerpt}
                onChange={(event) => onNewsFormChange({ ...newsForm, excerpt: event.target.value })}
                className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3"
              />
              <textarea
                required
                rows={6}
                placeholder="Full story or event details"
                value={newsForm.body}
                onChange={(event) => onNewsFormChange({ ...newsForm, body: event.target.value })}
                className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3"
              />
              <input
                type="url"
                placeholder="Optional image URL"
                value={newsForm.image_url ?? ''}
                onChange={(event) => onNewsFormChange({ ...newsForm, image_url: event.target.value })}
                className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3"
              />
              <input
                type="date"
                value={newsForm.event_date ?? ''}
                onChange={(event) => onNewsFormChange({ ...newsForm, event_date: event.target.value })}
                className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3"
              />
              <button className="rounded-full bg-brand-navy px-5 py-3 font-bold text-primary-foreground hover:bg-brand-royal">
                Save update
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  )
}
