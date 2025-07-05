import fs from "fs"
import path from "path"
import { getAllBlogPosts } from "./blog"
import { getAllThoughtPosts } from "./thoughts"
import { WEBSITE_URL } from "@/constants"

export function generateRSSFeed() {
    const blogPosts = getAllBlogPosts()
    const thoughtPosts = getAllThoughtPosts()

    const allPosts = [...blogPosts, ...thoughtPosts].sort((a, b) =>
        new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
    )

    const rssItems = allPosts
        .map((post) => {
            const link = 'category' in post ? `${WEBSITE_URL}/blogs/${post.slug}` : `${WEBSITE_URL}/thoughts/${post.slug}`
            return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${'excerpt' in post ? post.excerpt : post.metaDescription}]]></description>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>Bhavesh Chaudhari</author>
      ${'category' in post && post.category ? `<category>${post.category}</category>` : ''}
      ${'tags' in post && Array.isArray(post.tags) && post.tags.length > 0 ? post.tags.map((tag) => `<category>${tag}</category>`).join("") : ''}
    </item>`
        })
        .join("\n")

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bhavesh Chaudhari - Blog</title>
    <description>I love to build things with my code. In an era where AI is reshaping everything, and will keep doing so faster than we can imagine, I am using this space as a living journal of my thoughts, experiments, and the lessons I pick up along the way as I progress and lay the foundation for something bigger.</description>
    <link>${WEBSITE_URL}</link>
    <language>en-us</language>
    <managingEditor>bhic2030@gmail.com (Bhavesh Chaudhari)</managingEditor>
    <webMaster>bhic2030@gmail.com (Bhavesh Chaudhari)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${WEBSITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`

    // Write RSS feed to public directory
    const publicDir = path.join(process.cwd(), "public")
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true })
    }

    fs.writeFileSync(path.join(publicDir, "rss.xml"), rss)

    return rss
}

export function generateSitemap() {
    const blogPosts = getAllBlogPosts()
    const thoughtPosts = getAllThoughtPosts()

    const allPosts = [...blogPosts, ...thoughtPosts].sort((a, b) =>
        new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
    )

    const postUrls = allPosts
        .map((post) => {
            const link = 'category' in post ? `${WEBSITE_URL}/blogs/${post.slug}` : `${WEBSITE_URL}/thoughts/${post.slug}`
            return `
  <url>
    <loc>${link}</loc>
    <lastmod>${new Date(post.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
        })
        .join("")

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${WEBSITE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${WEBSITE_URL}/blogs</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>${postUrls}
</urlset>`

    fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemap)

    return sitemap
}
