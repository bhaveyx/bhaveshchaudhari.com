import type { Metadata } from 'next';
import type { BlogPost } from './blog';

const siteUrl =
	process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bhaveshchaudhari.com';
const siteName = 'Bhavesh Chaudhari';
const defaultDescription =
	'Passionate developer sharing insights about web development, technology, and programming.';

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
}: OGConfig): Metadata {
	const fullUrl = `${siteUrl}${url}`;
	const ogImage =
		image ||
		`${siteUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

	const metadata: Metadata = {
		title,
		description,
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
			authors: authors?.map((author) => `${siteUrl}/about`),
			tags,
			section,
		};
	}

	return metadata;
}

export function generateBlogPostMetadata(post: BlogPost): Metadata {
	const url = `/blogs/${post.slug}`;
	const ogImageUrl = `${siteUrl}/api/og/blog/${post.slug}`;

	return generateOGMetadata({
		title: `${post.title} | ${siteName}`,
		description: post.metaDescription || post.excerpt,
		url,
		image: ogImageUrl,
		type: 'article',
		publishedTime: post.publishedAt,
		modifiedTime: post.publishedAt,
		authors: [post.author],
		tags: post.tags,
		section: post.category,
	});
}

export function generateHomepageMetadata(): Metadata {
	const ogImageUrl = `${siteUrl}/api/og/homepage`;

	return generateOGMetadata({
		title: `${siteName} - Developer & Tech Writer`,
		description: defaultDescription,
		url: '',
		image: ogImageUrl,
		type: 'website',
	});
}

export function generateBlogListMetadata(): Metadata {
	const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent('Tech Blog')}&description=${encodeURIComponent('Latest insights about web development, technology, and programming')}`;

	return generateOGMetadata({
		title: `Blog | ${siteName}`,
		description:
			'Latest insights about web development, technology, and programming.',
		url: '/blogs',
		image: ogImageUrl,
		type: 'website',
	});
}

export function generateSearchMetadata(): Metadata {
	const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent('Search Articles')}&description=${encodeURIComponent('Find articles by title, content, category or tags')}`;

	return generateOGMetadata({
		title: `Search | ${siteName}`,
		description: 'Find articles by title, content, category or tags.',
		url: '/blogs/search',
		image: ogImageUrl,
		type: 'website',
	});
}

// Utility function to generate structured data for blog posts
export function generateBlogPostStructuredData(post: BlogPost) {
	const fullUrl = `${siteUrl}/blogs/${post.slug}`;
	const ogImageUrl = `${siteUrl}/api/og/blog/${post.slug}`;

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
			url: `${siteUrl}/about`,
		},
		publisher: {
			'@type': 'Person',
			name: siteName,
			logo: {
				'@type': 'ImageObject',
				url: `${siteUrl}/logo.png`,
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
