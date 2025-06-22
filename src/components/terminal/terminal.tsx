import { getAllBlogPosts } from '@/lib/blog'
import React from 'react'
import { TerminalClient } from './terminal-client'

export function Terminal() {
    const posts = getAllBlogPosts()

    return (
        <TerminalClient posts={posts} />
    )
}
