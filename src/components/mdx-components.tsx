import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { CodeHighlighter } from "./syntax-highlighter"

export const mdxComponents = {
	h1: ({ children, ...props }: any) => (
		<h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-12 mb-6 leading-tight scroll-mt-24" {...props}>
			{children}
		</h1>
	),

	h2: ({ children, ...props }: any) => (
		<h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-5 leading-tight scroll-mt-24" {...props}>
			{children}
		</h2>
	),

	h3: ({ children, ...props }: any) => (
		<h3
			className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 leading-tight scroll-mt-24"
			{...props}
		>
			{children}
		</h3>
	),

	h4: ({ children, ...props }: any) => (
		<h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3 leading-tight scroll-mt-24" {...props}>
			{children}
		</h4>
	),

	h5: ({ children, ...props }: any) => (
		<h5 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-2 leading-tight scroll-mt-24" {...props}>
			{children}
		</h5>
	),

	h6: ({ children, ...props }: any) => (
		<h6
			className="text-base font-semibold text-gray-900 dark:text-white mt-6 mb-2 leading-tight scroll-mt-24"
			{...props}
		>
			{children}
		</h6>
	),

	p: ({ children, ...props }: any) => (
		<p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-6" {...props}>
			{children}
		</p>
	),

	ul: ({ children, ...props }: any) => (
		<ul className="list-disc list-inside text-gray-800 dark:text-gray-200 mb-6 space-y-2 ml-4" {...props}>
			{children}
		</ul>
	),

	ol: ({ children, ...props }: any) => (
		<ol className="list-decimal list-inside text-gray-800 dark:text-gray-200 mb-6 space-y-2 ml-4" {...props}>
			{children}
		</ol>
	),

	li: ({ children, ...props }: any) => (
		<li className="leading-relaxed" {...props}>
			{children}
		</li>
	),

	blockquote: ({ children, ...props }: any) => (
		<blockquote
			className="border-l-4 border-emerald-500 pl-6 italic text-gray-700 dark:text-gray-300 my-8 bg-emerald-50 dark:bg-emerald-900/20 py-4 rounded-r-lg"
			{...props}
		>
			{children}
		</blockquote>
	),

	code: ({ children, className, ...props }: any) => {
		const match = /language-(\w+)/.exec(className || "")
		const language = match ? match[1] : "text"

		// if it's a code block (has language), use syntax highlighter
		if (match) {
			return (
				<CodeHighlighter language={language} {...props}>
					{String(children).replace(/\n$/, "")}
				</CodeHighlighter>
			)
		}

		// inline code
		return (
			<code
				className="bg-gray-100 dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded text-sm font-mono"
				{...props}
			>
				{children}
			</code>
		)
	},

	pre: ({ children, ...props }: any) => {
		// let the code component handle pre blocks
		return <>{children}</>
	},

	img: ({ src, alt, ...props }: any) => (
		<Image
			src={src || "/placeholder.svg"}
			alt={alt}
			width={800}
			height={400}
			className="rounded-lg shadow-lg my-8 w-full h-auto"
			{...props}
		/>
	),

	a: ({ href, children, ...props }: any) => {
		const isExternal = href?.startsWith("http")
		const Component = isExternal ? "a" : Link

		return (
			<Component
				href={href}
				className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline font-medium transition-colors"
				{...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
				{...props}
			>
				{children}
			</Component>
		)
	},

	strong: ({ children, ...props }: any) => (
		<strong className="font-semibold text-gray-900 dark:text-white" {...props}>
			{children}
		</strong>
	),
}