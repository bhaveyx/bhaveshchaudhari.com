import { compileMDX } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/components/mdx-components"

export async function compileBlogPost(source: string) {
  try {
    const { content } = await compileMDX({
      source,
      components: mdxComponents,
      options: {
        parseFrontmatter: false, // gray-matter is used for frontmatter parsing
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
          format: "mdx",
        },
      },
    })
    return content
  } catch (error) {
    console.error("Error compiling MDX:", error)
    throw new Error(`Failed to compile MDX: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
