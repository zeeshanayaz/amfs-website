import { createClient } from '@/lib/supabase/client'
import { BlogPostClient } from './blog-post-client'

type BlogPostPageProps = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const supabase = createClient()
    const { data } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('status', 'published')

    return (data ?? []).map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    return <BlogPostClient slug={slug} />
}