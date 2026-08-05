'use client'

// Continuously scrolling announcement marquee
// Duplicates the items so the loop is seamless.

const items = [
  '🎓 Admissions Enquiries Welcome',
  "Karachi's Trusted School",
  '5 Campuses Across the City',
  'Quality Education',
  'Islamic Values & Character',
  '1,500+ Students',
  '200+ Certified Teachers',
  'Academic Excellence',
  'Modern Curriculum',
  'Nurturing Minds Since Day One',
]

export function MarqueeBar() {
  return (
    <div
      className="bg-brand-navy overflow-hidden py-4 select-none"
      aria-label="School highlights"
      role="marquee"
    >
      {/* Double the items for a seamless infinite loop */}
      <div className="flex gap-0 marquee-track">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-4 px-6 text-sm font-semibold text-brand-gold whitespace-nowrap"
          >
            {item}
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-sky shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
