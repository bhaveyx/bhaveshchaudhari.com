import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { createSlug } from './utils';

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

export interface TocItem {
    id: string
    text: string
    level: number
}

export interface BlogPostWithTOC extends BlogPost {
    toc: TocItem[]
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

export function extractTocAndBody(markdown: string): { body: string; toc: TocItem[] } {
    const lines = markdown.split("\n");
    let postBodyModified = "";
    const toc: TocItem[] = [];

    for (let line of lines) {
        const append = true;

        // H2
        if (line.startsWith("## ")) {
            const text = line.replace("## ", "").replace(/\\/g, "");
            const id = createSlug(text);
            toc.push({ id, text, level: 2 });

            // Inject id into markdown (if needed)
            line = `## ${text}`;
        }

        // H3
        else if (line.startsWith("### ")) {
            const text = line.replace("### ", "").replace(/\\/g, "");
            const id = createSlug(text);
            toc.push({ id, text, level: 3 });

            line = `### ${text}`;
        }

        else if (line.startsWith("#### ")) {
            const text = line.replace("#### ", "").replace(/\\/g, "");
            const id = createSlug(text);
            toc.push({ id, text, level: 4 });

            line = `#### ${text}`;
        }

        if (append) postBodyModified += `${line}\n`;
    }

    return { body: postBodyModified, toc };
}

export function getBlogPost(slug: string): BlogPostWithTOC | null {
    try {
        const fullPath = path.join(blogDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const frontmatter = data as BlogPostMatter;
        const stats = readingTime(content);

        const toc = extractTocAndBody(content).toc;

        return {
            slug,
            title: frontmatter.title,
            publishedAt: frontmatter.publishedAt,
            excerpt: frontmatter.excerpt,
            content,
            toc, // 🆕 added
            readingTime: stats.text,
            category: frontmatter.category,
            tags: frontmatter.tags || [],
            metaDescription: frontmatter.metaDescription,
            keywords: frontmatter.keywords || [],
            featured: frontmatter.featured || false,
            author: frontmatter.author || 'Bhavesh Chaudhari',
            authorImage: frontmatter.authorImage || 'https://github.com/bhavesh-chaudhari.png',
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
