'use client'

import type { ContactSubmission } from './types'

type ContactsSectionProps = {
  contacts: ContactSubmission[]
  onMarkRead: (id: string) => void
}

export function ContactsSection({ contacts, onMarkRead }: ContactsSectionProps) {
  return (
    <>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Inbox</p>
        <h2 className="mt-2 font-serif text-4xl font-bold">Contact submissions</h2>
        <p className="mt-2 text-brand-dark-gray">Review questions and inquiries sent through the school website.</p>
      </div>

      <div className="grid gap-4">
        {contacts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-brand-border bg-background p-12 text-center text-brand-dark-gray">
            No contact submissions yet.
          </div>
        ) : (
          contacts.map((item) => (
            <article
              key={item.id}
              className={`rounded-2xl border border-brand-border bg-background p-5 ${!item.is_read ? 'ring-2 ring-brand-gold/40' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="font-bold">{item.full_name}</span>
                    <a href={`mailto:${item.email}`} className="text-brand-royal">
                      {item.email}
                    </a>
                    <a href={`tel:${item.phone}`} className="text-brand-royal">
                      {item.phone}
                    </a>
                  </div>
                  <h3 className="mt-3 font-serif text-xl font-bold">{item.subject}</h3>
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-brand-dark-gray">{item.message}</p>
                </div>
                {!item.is_read ? (
                  <button
                    type="button"
                    onClick={() => onMarkRead(item.id)}
                    className="shrink-0 rounded-full bg-brand-navy px-3 py-2 text-xs font-bold text-primary-foreground"
                  >
                    Mark read
                  </button>
                ) : null}
              </div>
            </article>
          ))
        )}
      </div>
    </>
  )
}
