import {
  GraduationCap,
  BookOpen,
  Heart,
  Laptop,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react'

interface Pillar {
  icon: React.ElementType
  title: string
  description: string
  accentColor: string
}

const pillars: Pillar[] = [
  {
    icon: GraduationCap,
    title: 'Academic Excellence',
    description:
      'A rigorous, well-rounded curriculum designed to inspire intellectual growth, curiosity, and achievement in every student.',
    accentColor: '#3D63B8',
  },
  {
    icon: BookOpen,
    title: 'Islamic Values',
    description:
      'Nurturing strong moral character through Islamic principles — cultivating students of integrity, faith, and purpose.',
    accentColor: '#37A9E8',
  },
  {
    icon: Heart,
    title: 'Character Building',
    description:
      'Holistic development of the whole student — mind, body, and spirit — preparing them for success in this life and the next.',
    accentColor: '#3D63B8',
  },
  {
    icon: Laptop,
    title: 'Modern Education',
    description:
      'Integrating contemporary pedagogy and technology into everyday learning for the demands and opportunities of tomorrow.',
    accentColor: '#37A9E8',
  },
  {
    icon: Lightbulb,
    title: 'Innovation & Creativity',
    description:
      'Fostering critical thinking, problem-solving, and creative approaches so students become confident innovators.',
    accentColor: '#3D63B8',
  },
  {
    icon: ShieldCheck,
    title: 'Trust & Integrity',
    description:
      'A safe, nurturing environment where students, parents, and educators build lasting partnerships rooted in honesty and respect.',
    accentColor: '#37A9E8',
  },
]

function PillarCard({ icon: Icon, title, description, accentColor }: Pillar) {
  return (
    <article className="group relative bg-white rounded-2xl border border-brand-border p-6 sm:p-7 hover:border-brand-royal hover:shadow-lg transition-all duration-300">
      {/* Top accent line on hover */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-6 right-6 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{ backgroundColor: accentColor }}
      />

      {/* Icon container */}
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
        style={{ backgroundColor: `${accentColor}15` }}
      >
        <Icon
          size={22}
          aria-hidden="true"
          style={{ color: accentColor }}
          strokeWidth={1.75}
        />
      </div>

      {/* Gold dot accent */}
      <div
        aria-hidden="true"
        className="w-6 h-0.5 bg-brand-gold rounded-full mb-3"
      />

      <h3 className="font-serif font-bold text-brand-navy text-lg mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-brand-dark-gray text-sm leading-relaxed">{description}</p>
    </article>
  )
}

export function ValuesSection() {
  return (
    <section
      aria-labelledby="values-heading"
      className="bg-white py-20 sm:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <header className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
            <span className="text-brand-sky text-[11px] font-semibold uppercase tracking-[0.3em]">
              Our Foundation
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
          </div>
          <h2
            id="values-heading"
            className="font-serif font-bold text-brand-navy text-3xl sm:text-4xl leading-tight text-balance mb-4"
          >
            Built on Pillars of Excellence
          </h2>
          <p className="text-brand-dark-gray text-base sm:text-lg leading-relaxed">
            Every aspect of life at Al Musleh Foundation School is guided by enduring values
            that shape remarkable students and responsible citizens.
          </p>
        </header>

        {/* Pillars grid */}
        <div
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {pillars.map((pillar) => (
            <div key={pillar.title} role="listitem">
              <PillarCard {...pillar} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
