'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ScrollToTop } from '@/components/scroll-to-top'
import { createClient } from '@/lib/supabase/client'

type BlogPost = {
    title: string
    slug: string
    excerpt: string | null
    content: string
    featured_image_url: string | null
    author_name: string | null
    published_at: string | null
    tags: unknown
    meta_title: string | null
    meta_description: string | null
    category: { name: string } | { name: string }[] | null
}

export function BlogPostClient({ slug }: { slug: string }) {
    const [post, setPost] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadPost() {
            const supabase = createClient()
            const { data } = await supabase
                .from('blog_posts')
                .select('title, slug, excerpt, content, featured_image_url, author_name, published_at, tags, meta_title, meta_description, category:blog_categories(name)')
                .eq('slug', slug)
                .eq('status', 'published')
                .maybeSingle()

            setPost((data as BlogPost | null) ?? null)
            setLoading(false)
        }

        void loadPost()
    }, [slug])

    useEffect(() => {
        if (post) {
            document.title = post.meta_title || `${post.title} | AMFS`
        }
    }, [post])

    if (loading) {
        return <main className="grid min-h-screen place-items-center bg-brand-off-white text-brand-navy">Loading story...</main>
    }

    if (!post) {
        return (
            <main className="grid min-h-screen place-items-center bg-brand-off-white px-6 text-center text-brand-navy">
                <div><h1 className="font-serif text-4xl font-bold">Blog post not found</h1><Link href="/blog" className="mt-5 inline-flex text-brand-royal hover:underline">Back to blog</Link></div>
            </main>
        )
    }

    const category = Array.isArray(post.category) ? post.category[0] : post.category
    const tags = Array.isArray(post.tags) ? post.tags.filter((tag): tag is string => typeof tag === 'string') : []
    const publishedDate = post.published_at
        ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(post.published_at))
        : null

    return (
        <>
            <Navbar />
            <main id="main-content" className="bg-brand-off-white text-brand-navy">
                <section className="bg-brand-navy px-6 py-20 text-primary-foreground sm:px-10">
                    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] lg:gap-16">
                        <div>
                            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold hover:text-white"><ArrowLeft className="size-4" /> Back to blog</Link>
                            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">{category?.name ?? 'Uncategorized'}</p>
                            <h1 className="mt-5 font-serif text-5xl font-bold sm:text-6xl">{post.title}</h1>
                            <div aria-hidden="true" className="mt-6 h-1.5 w-24 rounded-full bg-brand-gold" />
                            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-brand-off-white/80">
                                {publishedDate ? <span className="inline-flex items-center gap-2"><CalendarDays className="size-4" />{publishedDate}</span> : null}
                                {post.author_name ? <span>By {post.author_name}</span> : null}
                            </div>
                        </div>
                        {post.featured_image_url ? <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/15 bg-brand-royal/30 shadow-2xl"><Image src={post.featured_image_url} alt={post.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 460px" /></div> : null}
                    </div>
                </section>
                <section id="journal" className="bg-muted px-6 py-16 lg:px-10 lg:py-20">
                    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:py-16">
                        {post.featured_image_url ? <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl"><Image src={post.featured_image_url} alt={post.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 896px" /></div> : null}
                        {tags.length > 0 ? <div className="mt-4 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full bg-brand-light px-2 py-1 text-xs text-brand-dark-gray">#{tag}</span>)}</div> : null}
                        {post.excerpt ? <p className="mt-8 mb-8 text-xl leading-8 text-brand-charcoal">{post.excerpt}</p> : null}
                        <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                </section>
            </main>
            <Footer />
            <ScrollToTop />
        </>
    )
}
