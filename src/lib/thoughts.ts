import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { createSlug } from './utils';

const thoughtsDirectory = path.join(process.cwd(), 'src/data/thoughts');

export interface ThoughtPost {
    slug: string;
    title: string;
    publishedAt: string;
    
    content: string;
    readingTime: string;
    
    
    metaDescription: string;
    keywords: string[];
    featured: boolean;
    author: string;
    authorImage: string;
}

export interface ThoughtPostMatter {
    title: string;
    publishedAt: string;
    
    
    
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

export interface ThoughtPostWithTOC extends ThoughtPost {
    toc: TocItem[]
}

export function getAllThoughtPosts(): ThoughtPost[] {
    const fileNames = fs.readdirSync(thoughtsDirectory);
    const allPostsData = fileNames
        .filter((name) => name.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, '');
            const fullPath = path.join(thoughtsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);
            const frontmatter = data as ThoughtPostMatter;
            const stats = readingTime(content);

            return {
                slug,
                title: frontmatter.title,
                publishedAt: frontmatter.publishedAt,

                content,
                readingTime: stats.text,
                
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

export function getThoughtPost(slug: string): ThoughtPostWithTOC | null {
    try {
        const fullPath = path.join(thoughtsDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const frontmatter = data as ThoughtPostMatter;
        const stats = readingTime(content);

        const toc = extractTocAndBody(content).toc;

        return {
            slug,
            title: frontmatter.title,
            publishedAt: frontmatter.publishedAt,
            
            content,
            toc, 
            readingTime: stats.text,
            
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

export function getThoughtPostSlugs(): string[] {
    const fileNames = fs.readdirSync(thoughtsDirectory);
    return fileNames
        .filter((name) => name.endsWith('.mdx'))
        .map((fileName) => fileName.replace(/\.mdx$/, ''));
}
