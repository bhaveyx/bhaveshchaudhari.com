import Link from "next/link";
import { getAllThoughtPosts } from "@/lib/thoughts";
import { generateThoughtListMetadata, generateThoughtListStructuredData } from "@/lib/og-utils";
import { GridHeader } from "@/components/ui/grid-header";

export const metadata = generateThoughtListMetadata();

export default function ThoughtsPage() {
    const thoughtPosts = getAllThoughtPosts();

    return (
        <>
            <div className="min-h-[calc(100vh-56px)] transition-colors relative">
                <GridHeader />
                <header className="max-w-4xl mx-auto px-6 py-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Thoughts
                    </h1>
                </header>

                <main className="max-w-4xl mx-auto px-6 pb-20">
                    <div className="space-y-8 w-fit mx-auto">
                        {thoughtPosts.map((post) => (
                            <Link key={post.slug} href={`/thoughts/${post.slug}`} className="flex items-center gap-4 py-2 hover:underline">
                                <time className="opacity-60" dateTime={post.publishedAt}>
                                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </time>
                                <h2 className="">
                                    {post.title}
                                </h2>
                            </Link>
                        ))}
                    </div>

                    {thoughtPosts.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-gray-600 dark:text-gray-400">No thoughts found.</p>
                        </div>
                    )}
                </main>
            </div>
            <script
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateThoughtListStructuredData()),
                }}
                type="application/ld+json"
            />
        </>
    )
}