'use client'

import { useEffect, useState } from 'react'
import { ArrowBigUp} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export const UpvoteButton = ({ slug, type }: { slug: string, type: 'blog' | 'thought' }) => {
    const [upvotes, setUpvotes] = useState(0)
    const [hasUpvoted, setHasUpvoted] = useState(false)

    useEffect(() => {
        const fetchUpvotes = async () => {
            try {
                const res = await fetch(`/api/upvotes/${type}/${slug}`)
                const data = await res.json()
                setUpvotes(data.upvotes)
            } catch (error) {
                console.error('Error fetching upvotes:', error)
            }
        }
        fetchUpvotes()

        const localUpvoted = localStorage.getItem(`upvoted-${type}-${slug}`)
        if (localUpvoted) {
            setHasUpvoted(true)
        }
    }, [slug, type])

    const handleUpvote = async () => {
        if (hasUpvoted) return

        try {
            await fetch(`/api/upvotes/${type}/${slug}`, { method: 'POST' })
            setUpvotes((prev) => prev + 1)
            setHasUpvoted(true)
            localStorage.setItem(`upvoted-${type}-${slug}`, 'true')
        } catch (error) {
            console.error('Error upvoting:', error);
            toast.error('Failed to upvote. Please try again later.')
        }
    }

    if(!upvotes){
        return <div></div>
    }

    return (
        <button
            onClick={handleUpvote}
            disabled={hasUpvoted}
            className={
                cn(
                    'flex items-center cursor-pointer gap-1 px-3 py-1 rounded-full transition-colors duration-200',
                    hasUpvoted
                        ? 'bg-emerald-500 text-white cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400'
                )
            }
        >
            <ArrowBigUp className="w-5 h-5 stroke-[1.2px]" />
            <span>Upvote</span>
            <span className='block min-w-4'>{upvotes.toLocaleString()}</span>
        </button>
    )
}
