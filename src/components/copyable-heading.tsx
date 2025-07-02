"use client"

import { useState } from "react"
import { Check, Link as LinkIcon } from "lucide-react"
import { createSlug } from "@/lib/utils"

interface CopyableHeadingProps {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    children: React.ReactNode
    className?: string
}

export function CopyableHeading({ as: Tag, children, className, ...props }: CopyableHeadingProps) {
    const slug = createSlug(String(children))
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        const url = `${window.location.origin}${window.location.pathname}#${slug}`
        navigator.clipboard.writeText(url)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <Tag className={`group relative ${className}`} id={slug} {...props}>
            {children}
            <button
                onClick={handleCopy}
                className="absolute -left-10 cursor-pointer top-1/2 -translate-y-1/2 p-2 rounded-md opacity-0 group-hover:bg-gray-50 dark:group-hover:bg-green-50/10  group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Copy link"
            >
                {isCopied ? (
                    <Check className="w-4 h-4 text-green-500" />
                ) : (
                    <LinkIcon className="w-4 h-4 text-gray-400" />
                )}
            </button>
        </Tag>
    )
}
