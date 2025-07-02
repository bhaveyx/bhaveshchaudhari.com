import type { NextRequest } from "next/server"
import { generateOGImage } from "@/lib/og-image"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const title = searchParams.get("title") || "Bhavesh Chaudhari"
    const description = searchParams.get("description") || "Programmer. Bringing Ideas To Life. Δ ThinkLearnExecute."
    const category = searchParams.get("category") || undefined
    const tags = searchParams.get("tags")?.split(",") || []
    const type = (searchParams.get("type") as "blog" | "homepage" | "page") || "page"

    return await generateOGImage({
      title,
      description,
      category,
      tags,
      type,
    })
  } catch (error) {
    console.error("Error in OG route:", error)
    return new Response("Failed to generate image", { status: 500 })
  }
}
