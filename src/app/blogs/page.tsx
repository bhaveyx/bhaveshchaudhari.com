import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog";
import { generateBlogListMetadata, generateBlogListStructuredData } from "@/lib/og-utils";

export const metadata = generateBlogListMetadata();

export default function BlogsPage() {
    const blogPosts = getAllBlogPosts();

    return (
        <>
            <div className="min-h-screen transition-colors">
                <header className="max-w-4xl mx-auto px-6 py-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Thoughts & <span className="text-emerald-600 dark:text-emerald-400">Insights</span>
                    </h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Welcome to my blog.
                    </p>
                </header>

                <main className="max-w-4xl mx-auto px-6 pb-20">
                    <div className="space-y-8">
                        {blogPosts.map((post) => (
                            <Link key={post.slug} href={`/blogs/${post.slug}`}>
                                <article className="group py-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 -mx-6 px-6 rounded-lg">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">
                                                {post.category}
                                            </span>
                                            {post.featured && (
                                                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded">
                                                    FEATURED
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200 leading-tight">
                                            {post.title}
                                        </h2>

                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{post.excerpt}</p>

                                        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <time dateTime={post.publishedAt}>
                                                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </time>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{post.readingTime}</span>
                                            </div>
                                        </div>

                                        {post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {post.tags.slice(0, 4).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {post.tags.length > 4 && (
                                                    <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                                        +{post.tags.length - 4} more
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>

                    {blogPosts.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-gray-600 dark:text-gray-400 text-lg">No blog posts found.</p>
                        </div>
                    )}
                </main>
            </div>
            <script
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBlogListStructuredData()),
                }}
                type="application/ld+json"
            />
        </>
    )
}
