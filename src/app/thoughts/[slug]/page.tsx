import { notFound } from "next/navigation"
import { getThoughtPost, getThoughtPostSlugs } from "@/lib/thoughts"
import { ThoughtLayout } from "@/components/thought-layout"
import type { Metadata } from "next"
import { compileThoughtPost } from "@/lib/mdx-utils"
import { BlogErrorBoundary } from "@/components/error-boundary"
import { generateThoughtPostStructuredData } from "@/lib/og-utils"
import { WEBSITE_URL } from "@/constants"

interface ThoughtPostPageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const slugs = getThoughtPostSlugs()
    return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ThoughtPostPageProps): Promise<Metadata> {
    const { slug } = await params
    const post = getThoughtPost(slug)

    if (!post) {
        notFound()
    }

    const ogImageUrl = `${WEBSITE_URL}/api/og/thought/${post.slug}`;
    const canonicalUrl = `${WEBSITE_URL}/thoughts/${post.slug}`;

    return {
        alternates: {
            canonical: canonicalUrl,
        },
        title: post.title,
        description: post.metaDescription,
        
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.metaDescription,
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author],
            
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.metaDescription,
            images: ogImageUrl
        },
        other: {
            "twitter:data1": post?.author,
            "twitter:data2": `${post?.readingTime} mins.`,
            "twitter:label1": "Written by",
            "twitter:label2": "Reading Time",
        },
    }
}

export default async function ThoughtPostPage({ params }: ThoughtPostPageProps) {
    const { slug } = await params
    const post = getThoughtPost(slug)

    if (!post) {
        notFound()
    }

    return (
        <>
            <BlogErrorBoundary>
                <ThoughtLayout post={post}>{await compileThoughtPost(post.content)}</ThoughtLayout>
            </BlogErrorBoundary>
            <script
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateThoughtPostStructuredData(post)),
                }}
                type="application/ld+json"
            />
        </>

    )
}
