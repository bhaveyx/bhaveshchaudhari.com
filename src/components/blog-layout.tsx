import type React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { TableOfContents } from "./table-of-contents"
import { Calendar, Clock, Tag } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface BlogLayoutProps {
	children: React.ReactNode
	post: BlogPost
}

export function BlogLayout({ children, post }: BlogLayoutProps) {
	return (
		<div className="min-h-screen transition-colors">
			<div className="max-w-6xl mx-auto py-12">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
					<article className="lg:col-span-3">
						<header className="mb-12">
							<div className="flex items-center gap-2 mb-4">
								<Badge
									variant="secondary"
									className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
								>
									{post.category}
								</Badge>
								{post.featured && <Badge className="bg-emerald-600 text-white">Featured</Badge>}
							</div>

							<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
								{post.title}
							</h1>
							<p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">{post.excerpt}</p>

							{post.tags.length > 0 && (
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
							)}

							<div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-8">
								<div className="flex items-center gap-3">
									<Image
										src={post.authorImage || "/placeholder.svg"}
										alt={post.author}
										width={40}
										height={40}
										className="rounded-full border-2 border-emerald-200 dark:border-emerald-800"
									/>
									<span className="font-medium text-gray-900 dark:text-white">{post.author}</span>
								</div>
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
						</header>

						<div className="max-w-none">{children}</div>
					</article>

					<aside className="lg:col-span-1">
						<div className="sticky top-24 space-y-8">
							<TableOfContents />

							<div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6">
								<div className="flex items-center gap-3 mb-4">
									<Image
										src={post.authorImage || "/placeholder.svg"}
										alt={post.author}
										width={48}
										height={48}
										className="rounded-full border-2 border-emerald-300 dark:border-emerald-700"
									/>
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-white">{post.author}</h4>
										<p className="text-sm text-emerald-600 dark:text-emerald-400">Developer & Writer</p>
									</div>
								</div>
								<p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
									Passionate about building innovative solutions and sharing knowledge through writing.
								</p>
							</div>

							{post.tags.length > 0 && (
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
							)}
						</div>
					</aside>
				</div>
			</div>
		</div>
	)
}
