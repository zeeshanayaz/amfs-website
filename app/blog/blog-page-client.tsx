'use client'

import { useEffect, useState } from 'react'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ScrollToTop } from '@/components/scroll-to-top'
import { BlogHeader } from '@/components/blog/blog-header'
import { ArrowRight } from 'lucide-react'
import { BlogCard } from '@/components/blog/blog-card'
import { createClient } from '@/lib/supabase/client'

type BlogPostRow = {
    title: string
    slug: string
    featured_image_url: string | null
    published_at: string | null
    category: { name: string } | { name: string }[] | null
}

export function BlogPageClient() {
    const [posts, setPosts] = useState<BlogPostRow[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadPosts() {
            const supabase = createClient()
            const { data: blogPosts } = await supabase
                .from('blog_posts')
                .select('title, slug, featured_image_url, published_at, category:blog_categories(name)')
                .eq('status', 'published')
                .order('published_at', { ascending: false, nullsFirst: false })

            setPosts((blogPosts ?? []) as BlogPostRow[])
            setLoading(false)
        }

        void loadPosts()
    }, [])

    const displayPosts = posts.map((post) => {
        const category = Array.isArray(post.category) ? post.category[0] : post.category

        return {
            slug: post.slug,
            category: category?.name ?? 'Uncategorized',
            title: post.title,
            date: post.published_at
                ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(post.published_at))
                : 'Not published',
            image: post.featured_image_url ?? '/images/about-classroom.webp',
        }
    })

    return (
        <>
            <Navbar />
            <main id="main-content" className="bg-brand-off-white text-brand-navy">
                <BlogHeader />
                <section id="journal" className="bg-muted px-6 py-16 lg:px-10 lg:py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                            <div>
                                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-accent">From our community</p>
                                <h2 className="font-serif text-4xl font-bold tracking-tight text-primary">Latest stories</h2>
                            </div>
                            <a href="#journal" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent">View all stories <ArrowRight size={16} /></a>
                        </div>
                        {loading ? (
                            <p className="rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center text-muted-foreground">Loading stories...</p>
                        ) : displayPosts.length === 0 ? (
                            <p className="rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center text-muted-foreground">No records found.</p>
                        ) : (
                            <div className="grid gap-7 md:grid-cols-3">
                                {displayPosts.map((post) => <BlogCard key={post.slug} post={post} />)}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
            <ScrollToTop />
        </>
    )
}
