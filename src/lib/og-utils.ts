import type { Metadata } from 'next';
import type { BlogPost } from './blog';
import { WEBSITE_URL } from '@/constants';

const siteName = 'Bhavesh Chaudhari';
const defaultDescription =
    "I love to build things with my code. In an era where AI is reshaping everything, and will keep doing so faster than we can imagine, I am using this space as a living journal of my thoughts, experiments, and the lessons I pick up along the way as I progress and lay the foundation for something bigger.";

interface OGConfig {
    title: string;
    description: string;
    url: string;
    image?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
    section?: string;
    keywords?: string[];
}

export function generateOGMetadata({
    title,
    description,
    url,
    image,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    tags,
    section,
    keywords
}: OGConfig): Metadata {
    const fullUrl = `${WEBSITE_URL}${url}`;
    const ogImage =
        image ||
        `${WEBSITE_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

    const metadata: Metadata = {
        title,
        description,
        keywords: keywords?.join(", ") || tags?.join(', '),
        openGraph: {
            title,
            description,
            url: fullUrl,
            siteName,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
            type,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
            creator: '@roninbhavesh',
            site: '@roninbhavesh',
        },
        alternates: {
            canonical: fullUrl,
        },
    };

    // Add article-specific metadata
    if (type === 'article' && publishedTime) {
        metadata.openGraph = {
            ...metadata.openGraph,
            type: 'article',
            publishedTime,
            modifiedTime,
            authors: authors?.map(() => `${WEBSITE_URL}/about`),
            tags,
            section,
        };
    }

    return metadata;
}

export function generateHomepageMetadata(): Metadata {
    const ogImageUrl = `${WEBSITE_URL}/api/og/homepage`;

    return generateOGMetadata({
        title: `${siteName}`,
        description: defaultDescription,
        url: '',
        image: ogImageUrl,
        type: 'website',
    });
}

export function generateBlogListMetadata(): Metadata {
    const ogImageUrl = `${WEBSITE_URL}/api/og?title=${encodeURIComponent('Tech Blog')}&description=${encodeURIComponent('Latest insights about web development, technology, and programming')}`;

    return generateOGMetadata({
        title: `Blog - ${siteName}`,
        description:
            'Thoughts and Insights by Bhavesh Chaudhari.',
        url: '/blogs',
        image: ogImageUrl,
        type: 'website',
    });
}

export function generateBlogPostStructuredData(post: BlogPost) {
    const fullUrl = `${WEBSITE_URL}/blogs/${post.slug}`;
    const ogImageUrl = `${WEBSITE_URL}/api/og/blog/${post.slug}`;

    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: ogImageUrl,
        author: {
            '@type': 'Person',
            name: post.author,
            image: post.authorImage,
            url: `${WEBSITE_URL}`,
        },
        publisher: {
            '@type': 'Person',
            name: siteName,
            logo: {
                '@type': 'ImageObject',
                url: `${WEBSITE_URL}/favicon.ico`,
            },
        },
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': fullUrl,
        },
        keywords: post.keywords.join(', '),
        articleSection: post.category,
        wordCount: post.content.split(' ').length,
        timeRequired: post.readingTime,
    };
}
