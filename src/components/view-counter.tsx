'use client'

import { useEffect, useRef, useState } from 'react'

export const ViewCounter = ({ slug, type }: { slug: string, type: 'blog' | 'thought' }) => {
    const [views, setViews] = useState(0)
    const isViewRegistered = useRef(false)

    useEffect(() => {
        const fetchViews = async () => {
            try {
                const res = await fetch(`/api/views/${type}/${slug}`)
                const data = await res.json()
                setViews(data.views || 1)
            } catch (error) {
                console.error('Error fetching views:', error)
            }
        }

        const incrementViews = async () => {
            try {
                await fetch(`/api/views/${type}/${slug}`, { method: 'POST' })
            } catch (error) {
                console.error('Error incrementing views:', error)
            }
        }

        if (!isViewRegistered.current) {
            incrementViews()
            isViewRegistered.current = true
        }
        fetchViews()
    }, [slug, type])

    if (!views) {
        return <div></div>;
    }

    if (type === 'blog') {
        return <span>{views.toLocaleString()} views</span>
    }

    if (type === 'thought') {
        return (
            <span className="flex items-center gap-1">
                {views.toLocaleString()}{" "}
                view{views !== 1 ? 's' : ''}
            </span>
        )
    }

    return <span>{views.toLocaleString()} view{views !== 1 ? 's' : ''}</span>
}
