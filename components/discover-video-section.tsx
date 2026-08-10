import { Play } from 'lucide-react'

const videoId = 'A08cHtrTOpc'

export function DiscoverVideoSection() {
  return (
    <section aria-labelledby="discover-video-heading" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-brand-sky" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-sky">
                Discover AMFS
              </span>
            </div>
            <h2 id="discover-video-heading" className="font-serif text-4xl font-semibold leading-tight text-brand-navy text-balance sm:text-5xl">
              Discover Al Musleh Foundation School
            </h2>
            <div aria-hidden="true" className="mt-5 h-1.5 w-20 rounded-full bg-brand-gold" />
            <p className="mt-7 max-w-xl text-base leading-7 text-brand-dark-gray sm:text-lg">
              Take a closer look at the people, places, and purpose behind our learning community.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-brand-off-white px-4 py-3 text-sm font-semibold text-brand-navy">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-brand-gold">
                <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
              </span>
              Watch our story
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border-8 border-brand-off-white bg-brand-navy shadow-2xl shadow-brand-navy/15">
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="Discover Al Musleh Foundation School"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}