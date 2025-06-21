import fs from "fs"
import path from "path"
import { getAllBlogPosts } from "./blog"

export function generateRSSFeed() {
  const posts = getAllBlogPosts()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bhaveshchaudhari.com"

  const rssItems = posts
    .map((post) => {
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${siteUrl}/blogs/${post.slug}</link>
      <guid>${siteUrl}/blogs/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>Bhavesh Chaudhari</author>
      <category>${post.category}</category>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    })
    .join("\n")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bhavesh Chaudhari - Blog</title>
    <description>Thoughts and insights about web development, technology, and programming</description>
    <link>${siteUrl}</link>
    <language>en-us</language>
    <managingEditor>bhic2030@gmail.com (Bhavesh Chaudhari)</managingEditor>
    <webMaster>bhic2030@gmail.com (Bhavesh Chaudhari)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
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
  const posts = getAllBlogPosts()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bhaveshchaudhari.com"

  const postUrls = posts
    .map((post) => {
      return `
  <url>
    <loc>${siteUrl}/blogs/${post.slug}</loc>
    <lastmod>${new Date(post.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    })
    .join("")

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/blogs</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>${postUrls}
</urlset>`

  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemap)

  return sitemap
}
