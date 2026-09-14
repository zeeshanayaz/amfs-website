import { ArrowRight, CalendarDays } from 'lucide-react';
import Link from 'next/link';

export function BlogCard({ post }: { post: { category: string; title: string; date: string; image: string; slug: string } }) {
    return (
        <article key={post.title} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
            <img src={post.image} alt={post.title} className="aspect-[1.35/1] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="p-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">{post.category}</p>
                <h3 className="font-serif text-2xl font-bold leading-tight text-card-foreground">{post.title}</h3>
                <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays size={15} />{post.date}
                </div>
                <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Read story <ArrowRight size={15} /></Link>
            </div>
        </article>
    )
}