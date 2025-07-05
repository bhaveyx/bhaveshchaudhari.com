import type { NextRequest } from "next/server"
import { getThoughtPost } from "@/lib/thoughts"
import { generateThoughtPostOGImage } from "@/lib/og-image"

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params
    const post = getThoughtPost(slug)

    if (!post) {
      return new Response("Thought post not found", { status: 404 })
    }

    return await generateThoughtPostOGImage(post)
  } catch (error) {
    console.error("Error generating thought OG image:", error)
    return new Response("Failed to generate image", { status: 500 })
  }
}
