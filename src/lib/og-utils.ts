import type { Metadata } from 'next';
import type { BlogPost } from './blog';
import type { ThoughtPost } from './thoughts';
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
        keywords: [
            "Bhavesh Chaudhari",
            "bhavesh chaudhari blog"
        ]
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
        keywords: [
            "Bhavesh Chaudhari",
            "bhavesh chaudhari blog",
            "web development",
            "programming",
            "technology insights"
        ]
    });
}

export function generateThoughtListMetadata(): Metadata {
    const ogImageUrl = `${WEBSITE_URL}/api/og?title=${encodeURIComponent('Thoughts')}&description=${encodeURIComponent('Fleeting thoughts and observations.')}`;

    return generateOGMetadata({
        title: `Thoughts - ${siteName}`,
        description:
            'Fleeting thoughts and observations by Bhavesh Chaudhari.',
        url: '/thoughts',
        image: ogImageUrl,
        type: 'website',
        keywords: [
            "Bhavesh Chaudhari",
            "bhavesh chaudhari thoughts",
            "personal reflections",
            "observations"
        ]
    });
}

export function generateHomepageStructuredData() {
    return [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "home",
                    "item": `${WEBSITE_URL}`
                }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Bhavesh Chaudhari",
            "url": WEBSITE_URL,
            "sameAs": [
                "https://www.github.com/bhaveyx",
                "https://twitter.com/bhaveyx",
                "https://linkedin.com/in/bhaveyx",
                "https://instagram.com/bhaveyx"
            ],
            "jobTitle": "Software Engineer & Builder",
            "description": defaultDescription,
            "image": "https://www.bhaveshchaudhari.com/assets/profile-pic.jpg"
        }
    ];
}

export function generateBlogListStructuredData() {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "home",
                "item": `${WEBSITE_URL}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "blog",
                "item": `${WEBSITE_URL}/blogs`
            }
        ]
    };
}

export function generateThoughtListStructuredData() {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "home",
                "item": `${WEBSITE_URL}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "thoughts",
                "item": `${WEBSITE_URL}/thoughts`
            }
        ]
    };
}

export function generateBlogPostStructuredData(post: BlogPost) {
    const fullUrl = `${WEBSITE_URL}/blogs/${post.slug}`;
    const ogImageUrl = `${WEBSITE_URL}/api/og/blog/${post.slug}`;

    return [
        {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,

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
            },
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': fullUrl,
            },

            wordCount: post.content.split(' ').length,
            timeRequired: post.readingTime,
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "home",
                    "item": `${WEBSITE_URL}`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "blog",
                    "item": `${WEBSITE_URL}/blogs`
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": post.slug,
                    "item": fullUrl
                }
            ]
        }
    ]
}

export function generateThoughtPostStructuredData(post: ThoughtPost) {
    const fullUrl = `${WEBSITE_URL}/thoughts/${post.slug}`;
    const ogImageUrl = `${WEBSITE_URL}/api/og/thought/${post.slug}`;

    return [
        {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,

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
            },
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': fullUrl,
            },

            wordCount: post.content.split(' ').length,
            timeRequired: post.readingTime,
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "home",
                    "item": `${WEBSITE_URL}`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "thoughts",
                    "item": `${WEBSITE_URL}/thoughts`
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": post.slug,
                    "item": fullUrl
                }
            ]
        }
    ]
}
