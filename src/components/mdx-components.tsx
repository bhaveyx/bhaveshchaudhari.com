import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"
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

		// If it's a code block (has language), use syntax highlighter
		if (match) {
			return (
				<CodeHighlighter language={language} {...props}>
					{String(children).replace(/\n$/, "")}
				</CodeHighlighter>
			)
		}

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

	Callout: ({
		type = "info",
		children,
		title,
	}: { type?: "info" | "warning" | "success" | "error"; children: React.ReactNode; title?: string }) => {
		const icons = {
			info: InfoIcon,
			warning: AlertTriangleIcon,
			success: CheckCircleIcon,
			error: XCircleIcon,
		}

		const colors = {
			info: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200",
			warning:
				"border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200",
			success:
				"border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200",
			error: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200",
		}

		const Icon = icons[type]

		return (
			<Alert className={`my-6 ${colors[type]}`}>
				<Icon className="h-4 w-4" />
				{title && <AlertTitle>{title}</AlertTitle>}
				<AlertDescription className="mt-2">{children}</AlertDescription>
			</Alert>
		)
	},

	CodeBlock: ({ title, children, language }: { title?: string; children: React.ReactNode; language?: string }) => (
		<CodeHighlighter title={title} language={language}>
			{String(children)}
		</CodeHighlighter>
	),

	InfoCard: ({ title, children }: { title: string; children: React.ReactNode }) => (
		<Card className="my-8 border-l-4 border-l-emerald-500 dark:bg-gray-800">
			<CardHeader>
				<CardTitle className="text-lg text-gray-900 dark:text-white">{title}</CardTitle>
			</CardHeader>
			<CardContent className="text-gray-800 dark:text-gray-200">{children}</CardContent>
		</Card>
	),

	QuickTip: ({ children }: { children: React.ReactNode }) => (
		<div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 my-6">
			<div className="flex items-start gap-3">
				<div className="bg-emerald-500 text-white rounded-full p-1 mt-0.5">
					<InfoIcon className="h-3 w-3" />
				</div>
				<div className="text-sm text-emerald-800 dark:text-emerald-200">{children}</div>
			</div>
		</div>
	),

	TechStack: ({ technologies }: { technologies: string[] }) => (
		<div className="my-6">
			<h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Technologies Used:</h4>
			<div className="flex flex-wrap gap-2">
				{technologies.map((tech) => (
					<Badge
						key={tech}
						variant="secondary"
						className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
					>
						{tech}
					</Badge>
				))}
			</div>
		</div>
	),

	Button: ({
		children,
		href,
		variant = "default",
	}: { children: React.ReactNode; href?: string; variant?: "default" | "outline" }) => {
		if (href) {
			return (
				<Link href={href}>
					<Button
						variant={variant}
						className={
							variant === "default"
								? "gradient-emerald text-white"
								: "border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
						}
					>
						{children}
					</Button>
				</Link>
			)
		}
		return (
			<Button
				variant={variant}
				className={
					variant === "default"
						? "gradient-emerald text-white"
						: "border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
				}
			>
				{children}
			</Button>
		)
	},
}

const AlertTitle = ({ children }: { children: React.ReactNode }) => (
	<h5 className="mb-1 font-medium leading-none tracking-tight">{children}</h5>
)
