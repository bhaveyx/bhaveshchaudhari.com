import type React from "react"
import Link from "next/link"
import { ViewCounter } from "./view-counter"
import { UpvoteButton } from "./upvote-button"
import type { ThoughtPostWithTOC } from "@/lib/thoughts"

interface ThoughtLayoutProps {
    children: React.ReactNode
    post: ThoughtPostWithTOC
}

export function ThoughtLayout({ children, post }: ThoughtLayoutProps) {
    return (
        <div className="min-h-screen transition-colors">
            <div className="max-w-2xl w-[90%] mx-auto py-12">
                <article>
                    <header className="mb-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                            <Link href="/" className="hover:underline">Home</Link>
                            <span className="mx-1">/</span>
                            <Link href="/thoughts" className="hover:underline">Thoughts</Link>
                            <span className="mx-1">/</span>
                            <span>{post.title}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        </div>
                    </header>

                    <div className="max-w-none">{children}</div>

                    <footer className="mt-8 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <ViewCounter slug={post.slug} type="thought" />
                        <UpvoteButton slug={post.slug} type="thought" />
                    </footer>
                </article>
            </div>
        </div>
    )
}
