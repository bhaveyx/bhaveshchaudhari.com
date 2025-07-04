import { notFound } from "next/navigation"
import { getBlogPost, getBlogPostSlugs } from "@/lib/blog"
import { BlogLayout } from "@/components/blog-layout"
import type { Metadata } from "next"
import { compileBlogPost } from "@/lib/mdx-utils"
import { BlogErrorBoundary } from "@/components/error-boundary"
import { generateBlogPostStructuredData } from "@/lib/og-utils"
import { WEBSITE_URL } from "@/constants"

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const slugs = getBlogPostSlugs()
    return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params
    const post = getBlogPost(slug)

    if (!post) {
        notFound()
    }

    const ogImageUrl = `${WEBSITE_URL}/api/og/blog/${post.slug}`;
    const canonicalUrl = `${WEBSITE_URL}/blogs/${post.slug}`;

    return {
        alternates: {
            canonical: canonicalUrl,
        },
        title: post.title,
        description: post.metaDescription,
        keywords: post.keywords,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author],
            tags: post.tags,
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
            description: post.excerpt,
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = getBlogPost(slug)

    if (!post) {
        notFound()
    }

    return (
        <>
            <BlogErrorBoundary>
                <BlogLayout post={post}>{await compileBlogPost(post.content)}</BlogLayout>
            </BlogErrorBoundary>
            <script
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBlogPostStructuredData(post)),
                }}
                type="application/ld+json"
            />
        </>

    )
}
