import { generateHomepageOGImage } from "@/lib/og-image"

export const runtime = "edge"

export async function GET() {
    try {
        return await generateHomepageOGImage()
    } catch (error) {
        console.error("Error generating homepage OG image:", error)
        return new Response("Failed to generate image", { status: 500 })
    }
}
