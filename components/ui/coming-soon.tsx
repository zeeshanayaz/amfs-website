export function ComingSoon() {
    return (
        <section className="relative overflow-hidden bg-brand-off-white flex flex-col">
            <div className="w-full">
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full px-6 sm:px-10 lg:px-8 py-16 text-center">


                    {/* Main heading */}
                    <h1
                        id="hero-heading"
                        className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-tight text-balance m-10"
                    >
                        <span className="block font-normal text-brand-navy mb-4">
                            Coming Soon
                        </span>
                    </h1>

                    {/* Gold underline accent */}
                    <div aria-hidden="true" className="flex items-center justify-center gap-2 mb-8">
                        <div className="w-8 h-0.5 bg-brand-gold/50 rounded-full" />
                        <div className="w-20 h-1 bg-brand-gold rounded-full" />
                        <div className="w-4 h-0.5 bg-brand-gold/50 rounded-full" />
                    </div>

                </div>
            </div>
        </section>
    );
}