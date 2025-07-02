'use client'

import { useEffect, useRef, useState } from 'react'

export const ViewCounter = ({ slug }: { slug: string }) => {
    const [views, setViews] = useState(0)
    const isViewRegistered = useRef(false)

    useEffect(() => {
        const fetchViews = async () => {
            try {
                const res = await fetch(`/api/views/${slug}`)
                const data = await res.json()
                setViews(data.views)
            } catch (error) {
                console.error('Error fetching views:', error)
            }
        }

        const incrementViews = async () => {
            try {
                await fetch(`/api/views/${slug}`, { method: 'POST' })
            } catch (error) {
                console.error('Error incrementing views:', error)
            }
        }

        if (!isViewRegistered.current) {
            incrementViews()
            isViewRegistered.current = true
        }
        fetchViews()
    }, [slug])

    if (!views) {
        return null;
    }

    return <span>{views.toLocaleString()} views</span>
}
