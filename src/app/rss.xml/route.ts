import { generateRSSFeed } from "@/lib/rss"

export async function GET() {
  const rss = generateRSSFeed()

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
