"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeHighlighterProps {
	children: string
	language?: string
	title?: string
	showLineNumbers?: boolean
}

export function CodeHighlighter({
	children,
	language = "javascript",
	title,
	showLineNumbers = true,
}: CodeHighlighterProps) {
	const [copied, setCopied] = useState(false)
	const [isDark] = useState(true);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(children)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error("Failed to copy code:", err)
		}
	}

	return (
		<div className="relative group my-6">
			{title && (
				<div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 text-sm font-medium rounded-t-lg border-b border-gray-700">
					<span>{title}</span>
					<span className="text-xs text-gray-400 uppercase">{language}</span>
				</div>
			)}

			<div className="relative">
				<SyntaxHighlighter
					language={language}
					style={isDark ? oneDark : oneLight}
					showLineNumbers={showLineNumbers}
					customStyle={{
						margin: 0,
						borderRadius: title ? "0 0 0.5rem 0.5rem" : "0.5rem",
						fontSize: "0.875rem",
						lineHeight: "1.5",
					}}
					lineNumberStyle={{
						minWidth: "3em",
						paddingRight: "1em",
						color: "#6b7280",
						borderRight: "1px solid #374151",
						marginRight: "1em",
					}}
				>
					{children.trim()}
				</SyntaxHighlighter>

				<Button
					variant="ghost"
					size="sm"
					onClick={copyToClipboard}
					className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 hover:bg-gray-600 text-gray-200 h-8 w-8 p-0"
					aria-label="Copy code"
				>
					{copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
				</Button>
			</div>
		</div>
	)
}
