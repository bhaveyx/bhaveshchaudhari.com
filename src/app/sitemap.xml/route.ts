import { generateSitemap } from "@/lib/rss"

export async function GET() {
  const sitemap = generateSitemap()

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
