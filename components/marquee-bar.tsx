'use client'

const items = ['Admissions open', '5 campuses in Karachi', '1,500+ learners', '200+ certified teachers', 'Learning with purpose', 'Values for life', 'A school community that cares']

export function MarqueeBar() {
  return <div className="select-none overflow-hidden bg-brand-navy py-4" aria-label="School highlights" role="marquee"><div className="marquee-track flex gap-0">{[...items, ...items].map((item, i) => <span key={i} className="flex shrink-0 items-center gap-4 px-6 text-sm font-semibold text-brand-gold whitespace-nowrap">{item}<span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-sky" /></span>)}</div></div>
}
