import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { BlogPost } from "@/lib/blog"

interface BlogState {
    blogPosts: BlogPost[]
    isLoading: boolean
    searchCache: Map<string, BlogPost[]>

    setBlogPosts: (posts: BlogPost[]) => void
    setIsLoading: (loading: boolean) => void

    searchPosts: (query: string) => BlogPost[]
    getPostBySlug: (slug: string) => BlogPost | undefined
    getFeaturedPosts: () => BlogPost[]
    getPostsByCategory: (category: string) => BlogPost[]
    getPostsByTag: (tag: string) => BlogPost[]
    getCategories: () => string[]
    getTags: () => string[]
    getRecentPosts: (limit?: number) => BlogPost[]
    getRelatedPosts: (currentPost: BlogPost, limit?: number) => BlogPost[]

    clearSearchCache: () => void
}

export const useBlogStore = create<BlogState>()(
    devtools(
        (set, get) => ({
            blogPosts: [],
            isLoading: false,
            searchCache: new Map(),

            setBlogPosts: (posts) => set({ blogPosts: posts }, false, "setBlogPosts"),

            setIsLoading: (loading) => set({ isLoading: loading }, false, "setIsLoading"),

            searchPosts: (query: string) => {
                const state = get()
                const trimmedQuery = query.trim().toLowerCase()

                if (!trimmedQuery) return state.blogPosts

                if (state.searchCache.has(trimmedQuery)) {
                    return state.searchCache.get(trimmedQuery)!
                }

                const results = state.blogPosts.filter(
                    (post) =>
                        post.title.toLowerCase().includes(trimmedQuery) ||
                        post.excerpt.toLowerCase().includes(trimmedQuery) ||
                        post.content.toLowerCase().includes(trimmedQuery) ||
                        post.tags.some((tag) => tag.toLowerCase().includes(trimmedQuery)) ||
                        post.category.toLowerCase().includes(trimmedQuery),
                )

                set(
                    (state) => ({
                        searchCache: new Map(state.searchCache).set(trimmedQuery, results),
                    }),
                    false,
                    "cacheSearchResults",
                )

                return results
            },

            getPostBySlug: (slug: string) => {
                return get().blogPosts.find((post) => post.slug === slug)
            },

            getFeaturedPosts: () => {
                return get().blogPosts.filter((post) => post.featured)
            },

            getPostsByCategory: (category: string) => {
                return get().blogPosts.filter((post) => post.category === category)
            },

            getPostsByTag: (tag: string) => {
                return get().blogPosts.filter((post) => post.tags.includes(tag))
            },

            getCategories: () => {
                const posts = get().blogPosts
                return [...new Set(posts.map((post) => post.category))].sort()
            },

            getTags: () => {
                const posts = get().blogPosts
                return [...new Set(posts.flatMap((post) => post.tags))].sort()
            },

            getRecentPosts: (limit = 5) => {
                return get()
                    .blogPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
                    .slice(0, limit)
            },

            getRelatedPosts: (currentPost: BlogPost, limit = 3) => {
                const posts = get().blogPosts.filter((post) => post.slug !== currentPost.slug)

                const postsWithScores = posts.map((post) => {
                    let score = 0

                    if (post.category === currentPost.category) {
                        score += 3
                    }

                    const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag))
                    score += sharedTags.length * 2

                    const daysDiff =
                        Math.abs(new Date(post.publishedAt).getTime() - new Date(currentPost.publishedAt).getTime()) /
                        (1000 * 60 * 60 * 24)

                    if (daysDiff < 30) score += 1
                    if (daysDiff < 7) score += 1

                    return { post, score }
                })

                return postsWithScores
                    .filter(({ score }) => score > 0)
                    .sort((a, b) => b.score - a.score)
                    .slice(0, limit)
                    .map(({ post }) => post)
            },

            clearSearchCache: () => set({ searchCache: new Map() }, false, "clearSearchCache"),
        }),
        {
            name: "blog-store",
        },
    ),
)

export const useBlogPosts = () => useBlogStore((state) => state.blogPosts)
export const useBlogLoading = () => useBlogStore((state) => state.isLoading)
export const useBlogSearch = () => useBlogStore((state) => state.searchPosts)
export const useFeaturedPosts = () => useBlogStore((state) => state.getFeaturedPosts())
export const useBlogCategories = () => useBlogStore((state) => state.getCategories())
export const useBlogTags = () => useBlogStore((state) => state.getTags())
export const useRecentPosts = (limit?: number) => useBlogStore((state) => state.getRecentPosts(limit))

// initialize store with data from server
export const initializeBlogStore = (posts: BlogPost[]) => {
    useBlogStore.getState().setBlogPosts(posts)
}

export const usePostBySlug = (slug: string) => useBlogStore((state) => state.getPostBySlug(slug))

export const useRelatedPosts = (currentPost: BlogPost, limit?: number) =>
    useBlogStore((state) => state.getRelatedPosts(currentPost, limit))
