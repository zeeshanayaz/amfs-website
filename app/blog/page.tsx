import type { Metadata } from 'next'
import { BlogPageClient } from './blog-page-client'

export const metadata: Metadata = {
    title: 'Blog | Al Musleh Foundation School',
    description: 'Read the latest stories, updates, and insights from the Al Musleh Foundation School community.',
    alternates: {
        canonical: '/blog',
    },
    openGraph: {
        title: 'Blog | Al Musleh Foundation School',
        description: 'Read the latest stories, updates, and insights from the Al Musleh Foundation School community.',
        url: '/blog',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Blog | Al Musleh Foundation School',
        description: 'Read the latest stories, updates, and insights from the Al Musleh Foundation School community.',
    },
}

export default function BlogRoute() {
    return <BlogPageClient />
}
