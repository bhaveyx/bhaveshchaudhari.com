import { SubscribeForm } from "./subscribe-form";
import type React from "react"
import Image from "next/image"
import { TableOfContents } from "./table-of-contents"
import { Calendar, Clock } from "lucide-react"
import type { BlogPostWithTOC } from "@/lib/blog"
import { ViewCounter } from "./view-counter"
import dynamic from "next/dynamic"
import { Socials } from "./socials";

const GiscusComments = dynamic(() => import("./giscus").then(mod => mod.GiscusComments))

interface BlogLayoutProps {
    children: React.ReactNode
    post: BlogPostWithTOC 
}

export function BlogLayout({ children, post }: BlogLayoutProps) {
    return (
        <div className="min-h-screen transition-colors">
            <div className="max-w-5xl w-[90%] mx-auto py-12">
                <div className="flex flex-col md:flex-row gap-8 md:gap-20">
                    <article className="md:w-[calc(100%-270px)] md:pb-28">
                        <header className="mb-10">
                            {/* <div className="flex items-center gap-2 mb-4">
                                <Badge
                                    variant="secondary"
                                    className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                                >
                                    {post.category}
                                </Badge>
                                {post.featured && <Badge className="bg-emerald-600 text-white">Featured</Badge>}
                            </div> */}

                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
                                {post.title}
                            </h1>
                            {/* {post.tags.length > 0 && (
                                <div className="flex items-center gap-2 mb-8">
                                    <Tag className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-xs border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )} */}

                            <div className="flex items-center flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-10">
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
                                <div className="flex items-center gap-1">
                                    <ViewCounter slug={post.slug} type={"blog"} />
                                </div>
                            </div>
                        </header>

                        <div className="max-w-none">{children}</div>

                        <GiscusComments />
                    </article>

                    <aside className="pb-12 md:w-[270px]">
                        <div className="sticky top-24 space-y-8">
                            <TableOfContents tocItems={post.toc} />

                            <div className="border bg-emerald-50/50 dark:bg-green-900/10 rounded-lg p-6 md:p-4">
                                <div className="flex flex-col items-center gap-6 mb-4">
                                    <Image
                                        src={post.authorImage || "/placeholder.svg"}
                                        alt={post.author}
                                        width={48}
                                        height={48}
                                        className="rounded-full border-2 border-emerald-300 md:hidden dark:border-emerald-700"
                                    />
                                    <div className="text-center">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{post.author}</h4>
                                    </div>
                                    <div className="flex gap-4 md:gap-6 items-center text-muted-foreground text-xl">
                                        <Socials />
                                    </div>
                                    <div className="w-full">
                                        <SubscribeForm />
                                    </div>
                                </div>
                            </div>

                            {/* {post.tags.length > 0 && (
                                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-xs hover:bg-emerald-50 dark:hover:bg-emerald-900/20 cursor-pointer border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )} */}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
