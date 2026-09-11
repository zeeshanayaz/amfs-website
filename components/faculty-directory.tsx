'use client'

import { useEffect, useState } from 'react'
import { MapPin, Search, SlidersHorizontal } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type FacultyMember = {
  id: string
  full_name: string
  image_url: string | null
  designation: string
  gender: 'male' | 'female' | string
  qualification: string | null
  campus_id: string
  bio_summary: string | null
  linkedin_url: string | null
  is_active: boolean
}

type Campus = { id: string; name: string }

export function FacultyDirectory() {
  const [faculty, setFaculty] = useState<FacultyMember[]>([])
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [search, setSearch] = useState('')
  const [designation, setDesignation] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadFaculty() {
      const supabase = createClient()
      const [{ data: facultyData, error: facultyError }, { data: campusData, error: campusError }] = await Promise.all([
        supabase.from('faculty').select('id, full_name, image_url, designation, gender, qualification, campus_id, bio_summary, linkedin_url, is_active').eq('is_active', true),
        supabase.from('campuses').select('id, name'),
      ])

      if (facultyError || campusError) {
        setError('Faculty profiles are temporarily unavailable. Please check back soon.')
      } else {
        setFaculty((facultyData ?? []) as FacultyMember[])
        setCampuses((campusData ?? []) as Campus[])
      }
      setLoading(false)
    }

    void loadFaculty()
  }, [])

  const campusNames = new Map(campuses.map((campus) => [campus.id, campus.name]))
  const designations = Array.from(new Set(faculty.map((member) => member.designation))).sort((first, second) => first.localeCompare(second))
  const normalizedSearch = search.trim().toLocaleLowerCase()
  const visibleFaculty = faculty
    .filter((member) => designation === 'All' || member.designation === designation)
    .filter((member) => {
      if (!normalizedSearch) return true
      const campusName = campusNames.get(member.campus_id) ?? ''
      return [member.full_name, member.designation, campusName].some((value) => value.toLocaleLowerCase().includes(normalizedSearch))
    })
    .sort((first, second) => first.full_name.localeCompare(second.full_name))

  return (
    <section className="bg-brand-off-white px-4 py-8 sm:px-8 sm:py-12 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-brand-border bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <label className="relative block flex-1">
              <span className="sr-only">Search faculty by name, campus, or designation</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brand-dark-gray" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, campus, or designation..."
                className="h-12 w-full rounded-xl border border-brand-border bg-brand-off-white pl-12 pr-4 text-sm text-brand-charcoal outline-none transition placeholder:text-brand-dark-gray/70 focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/15"
              />
            </label>
            <label className="relative block lg:w-80">
              <span className="sr-only">Filter faculty by designation</span>
              <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brand-royal" aria-hidden="true" />
              <select
                value={designation}
                onChange={(event) => setDesignation(event.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-brand-border bg-brand-off-white pl-11 pr-10 text-sm font-semibold text-brand-charcoal outline-none transition focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/15"
                aria-label="Filter faculty by designation"
              >
                <option value="All">All designations</option>
                {designations.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-dark-gray" aria-hidden="true">⌄</span>
            </label>
          </div>
          <p className="mt-3 px-1 text-sm text-brand-dark-gray" aria-live="polite">
            Showing <span className="font-bold text-brand-royal">{visibleFaculty.length}</span> of {faculty.length} faculty members
          </p>
        </div>

        {loading ? <div className="grid min-h-64 place-items-center py-16 text-sm text-brand-dark-gray">Loading faculty profiles...</div> : error ? <p role="alert" className="mt-8 rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center text-sm text-destructive">{error}</p> : visibleFaculty.length === 0 ? <div className="mt-8 rounded-2xl border border-dashed border-brand-border bg-white p-12 text-center"><Search className="mx-auto size-7 text-brand-royal" /><h2 className="mt-4 font-serif text-2xl font-bold text-brand-navy">No faculty members found</h2><p className="mt-2 text-sm text-brand-dark-gray">Try a different name, campus, or designation.</p></div> : <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleFaculty.map((member) => {
            const campusName = campusNames.get(member.campus_id) ?? 'AMFS Campus'
            return <article key={member.id} className="group overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative aspect-[1/1] overflow-hidden bg-brand-light">
                <img src={member.image_url || ((member.gender ?? '').toLowerCase() === 'female' ? '/images/placeholder/Placeholder-female.jpg' : '/images/placeholder/Placeholder-male.jpg')} alt={member.full_name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-5">
                <h2 className="font-serif text-xl font-bold text-brand-navy">{member.full_name}</h2>
                <p className="mt-2 text-sm font-semibold text-brand-royal">{member.designation}</p>
                {member.qualification?.trim() ? <p className="mt-1 text-sm text-brand-dark-gray">{member.qualification}</p> : null}
                <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-brand-dark-gray"><MapPin className="mt-0.5 size-4 shrink-0 text-brand-orange" aria-hidden="true" />{campusName}</p>
                {member.bio_summary ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-brand-dark-gray">{member.bio_summary}</p> : null}
                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-brand-border pt-4">
                  {member.linkedin_url ? <a href={member.linkedin_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-brand-royal hover:text-brand-navy" aria-label={`View ${member.full_name} on LinkedIn`}><svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.123 2.062 2.062 0 0 1 0 4.123zM3.555 9h3.558v11.452H3.555V9zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> LinkedIn</a> : null}
                </div>
              </div>
            </article>
          })}
        </div>}
      </div>
    </section>
  )
}
