export function CtaSection() {
  return (
    <section
      id="join-amfs"
      aria-labelledby="cta-heading"
      className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8 bg-brand-off-white"
    >
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-brand-royal px-6 py-16 text-center text-white shadow-2xl shadow-brand-royal/25 sm:px-12 sm:py-24">
        {/* Decorative background shapes */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]">
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-white/[0.06]" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand-gold/[0.08]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border border-white/[0.05]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full border border-white/[0.05]" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
            <span className="text-brand-gold text-[11px] font-semibold uppercase tracking-[0.3em]">
              Join the AMFS Family
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
          </div>

          <h2
            id="cta-heading"
            className="mx-auto font-serif text-4xl font-semibold sm:text-6xl text-balance max-w-3xl"
          >
            Ready to Start Your Journey?
          </h2>

          {/* Gold accent */}
          <div aria-hidden="true" className="flex items-center justify-center gap-2 mt-5 mb-6">
            <div className="w-8 h-0.5 bg-brand-gold/50 rounded-full" />
            <div className="w-20 h-1.5 bg-brand-gold rounded-full" />
            <div className="w-8 h-0.5 bg-brand-gold/50 rounded-full" />
          </div>

          <p className="mx-auto max-w-xl text-base leading-7 text-white/75 mb-10">
            Connect with our team and discover how Al Musleh Foundation School can support your
            child&apos;s next chapter. We&apos;d love to hear from you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:almusleh.foundation@gmail.com"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand-navy shadow-lg shadow-brand-navy/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Contact Us
            </a>
            <a
              href="mailto:almusleh.foundation@gmail.com?subject=Admission%20enquiry"
              className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5"
            >
              Apply for Admission
            </a>
            <a
              href="mailto:almusleh.foundation@gmail.com?subject=Teaching%20application"
              className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5"
            >
              Apply for Teaching
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
