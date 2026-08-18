import Image from 'next/image'

// Decorative fan watermark matching the logo's radiating lines motif
function FanWatermark() {
  const lines = Array.from({ length: 22 }, (_, i) => {
    const startDeg = 8
    const endDeg = 172
    const deg = startDeg + (i / 21) * (endDeg - startDeg)
    const rad = (deg * Math.PI) / 180
    const R = 480
    const cx = 480
    const cy = 490
    const x2 = cx + R * Math.cos(rad)
    const y2 = cy - R * Math.sin(rad)
    return (
      <line
        key={i}
        x1={cx}
        y1={cy}
        x2={x2}
        y2={y2}
        stroke="#243C7D"
        strokeWidth={i % 2 === 0 ? '2.5' : '1.5'}
      />
    )
  })

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMax slice"
      viewBox="0 0 960 490"
    >
      {lines}
      {/* Outer arc */}
      <path
        d={`M ${480 + 480 * Math.cos((8 * Math.PI) / 180)} ${490 - 480 * Math.sin((8 * Math.PI) / 180)} A 480 480 0 0 0 ${480 - 480 * Math.cos((8 * Math.PI) / 180)} ${490 - 480 * Math.sin((8 * Math.PI) / 180)}`}
        fill="none"
        stroke="#243C7D"
        strokeWidth="3"
      />
      {/* Inner arc */}
      <path
        d={`M ${480 + 200 * Math.cos((8 * Math.PI) / 180)} ${490 - 200 * Math.sin((8 * Math.PI) / 180)} A 200 200 0 0 0 ${480 - 200 * Math.cos((8 * Math.PI) / 180)} ${490 - 200 * Math.sin((8 * Math.PI) / 180)}`}
        fill="none"
        stroke="#243C7D"
        strokeWidth="2"
      />
    </svg>
  )
}

export function MaintenanceHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-brand-off-white min-h-screen flex flex-col"
    >
      {/* Decorative fan background — very subtle watermark */}
      {/* <div aria-hidden="true" className="absolute inset-0 opacity-[0.035] pointer-events-none">
        <FanWatermark />
      </div> */}

      {/* Large logo watermark — right side, desktop only */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none select-none hidden xl:block pr-8"
      >
        <Image
          src="/images/logo.webp"
          alt=""
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      {/* Vertical gold accent line — left edge */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold hidden sm:block"
      />

      {/* Main hero content — grows to fill available height, centers vertically */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full px-6 sm:px-10 lg:px-8 py-16 text-center">

        {/* Eyebrow label */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span aria-hidden="true" className="h-px w-10 bg-brand-sky" />
          <span className="text-brand-sky text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em]">
            Al Musleh Foundation School
          </span>
          <span aria-hidden="true" className="h-px w-10 bg-brand-sky" />
        </div>

        {/* Main heading */}
        <h1
          id="hero-heading"
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-tight text-balance mb-4"
        >
          <span className="block font-normal text-brand-navy">
            Site Under
          </span>
          <span className="block font-bold text-brand-navy">
            Maintenance
          </span>
        </h1>

        {/* Gold underline accent */}
        <div aria-hidden="true" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-0.5 bg-brand-gold/50 rounded-full" />
          <div className="w-20 h-1 bg-brand-gold rounded-full" />
          <div className="w-4 h-0.5 bg-brand-gold/50 rounded-full" />
        </div>

        {/* Supporting text */}
        <p className="font-sans text-brand-dark-gray text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          {`We're building a new digital experience for Al Musleh Foundation School. Soon you'll be able to explore admissions, academics, campuses, student life, achievements, events, and much more.`}
        </p>
      </div>

      {/* Bottom wave divider */}
      <div aria-hidden="true" className="relative h-12 overflow-hidden flex-shrink-0">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,48 L0,24 Q180,0 360,24 Q540,48 720,24 Q900,0 1080,24 Q1260,48 1440,24 L1440,48 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  )
}
