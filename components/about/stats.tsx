import { BookOpen, MapPin, Users } from 'lucide-react'

const stats = [
  { value: '5', label: 'Campuses', icon: MapPin },
  { value: '1,500+', label: 'Learners', icon: Users },
  { value: '200+', label: 'Teachers', icon: BookOpen },
]

export function Stats() {
  return (
    <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-2xl border border-brand-border bg-white shadow-xl shadow-brand-navy/10 sm:grid-cols-3">
        {stats.map(({ value, label, icon: Icon }, i) => (
          <div
            key={label}
            className={`flex items-center gap-4 p-5 sm:p-6 ${
              i < stats.length - 1
                ? 'border-b border-brand-border sm:border-b-0 sm:border-r'
                : ''
            }`}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-royal">
              <Icon className="h-5 w-5" />
            </span>

            <div>
              <p className="font-serif text-3xl font-bold leading-none text-brand-navy">
                {value}
              </p>
              <p className="mt-1 text-sm text-brand-dark-gray">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}