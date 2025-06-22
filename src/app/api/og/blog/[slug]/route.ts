import type { NextRequest } from "next/server"
import { getBlogPost } from "@/lib/blog"
import { generateBlogPostOGImage } from "@/lib/og-image"

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params
    const post = getBlogPost(slug)

    if (!post) {
      return new Response("Blog post not found", { status: 404 })
    }

    return await generateBlogPostOGImage(post)
  } catch (error) {
    console.error("Error generating blog OG image:", error)
    return new Response("Failed to generate image", { status: 500 })
  }
}
