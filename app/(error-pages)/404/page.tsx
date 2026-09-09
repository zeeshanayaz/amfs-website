import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Page Not Found | Al Musleh Foundation School',
    description: 'The page you are looking for could not be found on the Al Musleh Foundation School website.',
}

export default function Error404() {
    return (
        <main
            id="main-content"
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-off-white px-6 py-12 text-brand-navy sm:px-10"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(215,222,232,0.38)_1px,transparent_1px),linear-gradient(to_bottom,rgba(215,222,232,0.38)_1px,transparent_1px)] [background-position:top_right,bottom_left] [background-repeat:no-repeat] [background-size:390px_250px]"
            />
            <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center text-center">
                <h1 className="font-serif text-5xl font-bold text-brand-charcoal sm:text-6xl">ERROR</h1>
                <Image
                    src="/images/error/404.svg"
                    alt="404"
                    width={472}
                    height={152}
                    priority
                    className="mt-8 h-auto w-full max-w-[472px]"
                />
                <p className="mt-9 text-base leading-7 text-brand-dark-gray sm:text-lg">
                    We can’t seem to find the page you are looking for!
                </p>
                <Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy transition hover:-translate-y-0.5 hover:border-brand-sky">
                    Back to Home Page
                </Link>
            </div>
        </main>
    )
}