import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const blogDirectory = path.join(process.cwd(), 'src/data/blog');

export interface BlogPost {
	slug: string;
	title: string;
	publishedAt: string;
	excerpt: string;
	content: string;
	readingTime: string;
	category: string;
	tags: string[];
	metaDescription: string;
	keywords: string[];
	featured: boolean;
	author: string;
	authorImage: string;
}

export interface BlogPostMatter {
	title: string;
	publishedAt: string;
	excerpt: string;
	category: string;
	tags: string[];
	metaDescription: string;
	keywords: string[];
	featured?: boolean;
	author?: string;
	authorImage?: string;
}

export function getAllBlogPosts(): BlogPost[] {
	const fileNames = fs.readdirSync(blogDirectory);
	const allPostsData = fileNames
		.filter((name) => name.endsWith('.mdx'))
		.map((fileName) => {
			const slug = fileName.replace(/\.mdx$/, '');
			const fullPath = path.join(blogDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, 'utf8');
			const { data, content } = matter(fileContents);
			const frontmatter = data as BlogPostMatter;
			const stats = readingTime(content);

			return {
				slug,
				title: frontmatter.title,
				publishedAt: frontmatter.publishedAt,
				excerpt: frontmatter.excerpt,
				content,
				readingTime: stats.text,
				category: frontmatter.category,
				tags: frontmatter.tags || [],
				metaDescription: frontmatter.metaDescription,
				keywords: frontmatter.keywords || [],
				featured: frontmatter.featured || false,
				author: frontmatter.author || 'Bhavesh Chaudhari',
				authorImage:
					frontmatter.authorImage || 'https://github.com/bhavesh-chaudhari.png',
			};
		});

	return allPostsData.sort((a, b) =>
		new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1,
	);
}

export function getBlogPost(slug: string): BlogPost | null {
	try {
		const fullPath = path.join(blogDirectory, `${slug}.mdx`);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const { data, content } = matter(fileContents);
		const frontmatter = data as BlogPostMatter;
		const stats = readingTime(content);

		return {
			slug,
			title: frontmatter.title,
			publishedAt: frontmatter.publishedAt,
			excerpt: frontmatter.excerpt,
			content,
			readingTime: stats.text,
			category: frontmatter.category,
			tags: frontmatter.tags || [],
			metaDescription: frontmatter.metaDescription,
			keywords: frontmatter.keywords || [],
			featured: frontmatter.featured || false,
			author: frontmatter.author || 'Bhavesh Chaudhari',
			authorImage:
				frontmatter.authorImage || 'https://github.com/bhavesh-chaudhari.png',
		};
	} catch {
		return null;
	}
}

export function getBlogPostSlugs(): string[] {
	const fileNames = fs.readdirSync(blogDirectory);
	return fileNames
		.filter((name) => name.endsWith('.mdx'))
		.map((fileName) => fileName.replace(/\.mdx$/, ''));
}
