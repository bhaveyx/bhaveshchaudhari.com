import { SOCIAL_LINKS } from '@/constants'
import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export function Socials() {
    return (
        <>
            <Link className="inline-flex items-center rounded-full bg-gradient-to-t from-[rgba(215,215,215,0.6)] to-[rgba(255,255,255,1)] dark:from-transparent dark:to-black dark:border p-2 text-base font-medium text-neutral-600  dark:text-neutral-200 hover:shadow-sm hover:shadow-green-300 transition-all" href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
                <Github size={18} />
            </Link>
            <Link className="inline-flex items-center rounded-full bg-gradient-to-t from-[rgba(215,215,215,0.6)] to-[rgba(255,255,255,1)] dark:from-transparent dark:to-black dark:border p-2 text-base font-medium text-neutral-600 dark:text-neutral-200 hover:shadow-sm hover:shadow-green-300 transition-all" href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter size={18} />
            </Link>
            <Link className="inline-flex items-center rounded-full bg-gradient-to-t from-[rgba(215,215,215,0.6)] to-[rgba(255,255,255,1)] dark:from-transparent dark:to-black dark:border p-2 text-base font-medium text-neutral-600 dark:text-neutral-200 hover:shadow-sm hover:shadow-green-300 transition-all" href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={18} />
            </Link>
        </>
    )
}
