import Link from 'next/link'
import { ArrowRight} from 'lucide-react'
import { ReactNode } from 'react'

interface PageHeadingProps {
    eyebrow: string
    title: string
    description: string
    action?: ReactNode
}

export function PageHeading({
    eyebrow,
    title,
    description,
    action,
}: PageHeadingProps) {
    return (
        <section className="bg-brand-navy px-6 py-20 text-primary-foreground sm:px-10">
            <div className="mx-auto max-w-7xl">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">
                    {eyebrow}
                </p>

                <h1 className="mt-5 font-serif text-5xl font-bold sm:text-6xl">
                    {title}
                </h1>

                 <div aria-hidden="true" className="mt-6 h-1.5 w-24 rounded-full bg-brand-gold" />

                <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-off-white/80">
                    {description}
                </p>
                {action}
            </div>
        </section>
    )
}
