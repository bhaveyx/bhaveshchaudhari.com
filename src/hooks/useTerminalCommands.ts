"use client"

import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useBlogStore } from "@/stores/blog-store"
// import { useTerminalStore } from "@/stores/terminal-store"
import { CONTACT_EMAIL, SOCIAL_LINKS, WEBSITE_URL } from "@/constants"

interface Command {
    name: string
    description: string
    action: (args: string[]) => string | string[] | Promise<string | string[]>
    usage?: string
    examples?: string[]
}

export function useTerminalCommands() {
    const currentDirectory = "~"
    const router = useRouter()
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    const blogPosts = useBlogStore((state) => state.blogPosts)
    const isLoadingBlogs = useBlogStore((state) => state.isLoading)
    const searchPosts = useBlogStore((state) => state.searchPosts)

    // const {
    //     closeTerminal,
    //     minimizeTerminal,
    //     setTheme: setTerminalTheme,
    //     theme: terminalTheme,
    //     setOpacity,
    //     resetTerminal,
    // } = useTerminalStore()

    const commands: Record<string, Command> = {
        help: {
            name: "help",
            description: "Show available commands",
            usage: "help [command]",
            examples: ["help", "help ls", "help search"],
            action: (args) => {
                if (args.length > 0) {
                    const cmd = commands[args[0]]
                    if (cmd) {
                        return [
                            `Command: ${cmd.name}`,
                            `Description: ${cmd.description}`,
                            cmd.usage ? `Usage: ${cmd.usage}` : "",
                            cmd.examples ? `Examples: ${cmd.examples.join(", ")}` : "",
                        ].filter(Boolean)
                    }
                    return `Command '${args[0]}' not found. Type 'help' to see all commands.`
                }

                return [
                    "Available commands:",
                    "",
                    "## Information:",
                    "  help [cmd]      - Show help (optionally for specific command)",
                    "  about           - Learn about me",
                    "  whoami          - Display current user",
                    "  date            - Show current date and time",
                    "",
                    "## Contact:",
                    "  contact         - Get my contact information",
                    "",
                    "## Navigation:",
                    "  open <target>   - Open blog post or other available targets (type open to see options)",
                    "  goto <page>     - Navigate to different pages",
                    "",
                    "## Blog & Content:",
                    "  blog            - See latest blog posts",
                    "  search <term>   - Search through blog posts",
                    "  featured        - Show featured posts",
                    "  recent [num]    - Show recent posts",
                    "",
                    "## File System:",
                    "  pwd             - Show current directory",
                    "  cat <file>      - Display file contents",
                    "",
                    "## Projects:",
                    "  projects        - View my featured projects",
                    "## Must Try:",
                    "  rm -rf /        - You may test that assumption at your convenience ",
                    // "",
                    // "🎨 Terminal Control:",
                    // "  theme           - Toggle terminal theme",
                    // "  opacity <0-100> - Set terminal opacity",
                    // "  minimize        - Minimize terminal",
                    // "  close           - Close terminal",
                    // "  reset           - Reset terminal position/size",
                    // "",
                    // "💡 Global Shortcuts:",
                    // "  Ctrl + `        - Toggle terminal anywhere",
                    // "  Ctrl + Shift + T - Alternative toggle",
                    // "  Escape          - Close terminal",
                    "",
                    "💡 Tips:",
                    "  ↑/↓ arrows     - Command history",
                    "  Tab            - Auto-complete commands",
                    "  clear           - Clear terminal history",
                    // "  Drag header    - Move terminal",
                    // "  Drag corner    - Resize terminal",
                ]
            },
        },

        pwd: {
            name: "pwd",
            description: "Print working directory",
            action: () => currentDirectory,
        },

        cat: {
            name: "cat",
            description: "Display file contents",
            usage: "cat <filename>",
            examples: ["cat about.md", "cat contact.txt"],
            action: (args) => {
                if (args.length === 0) {
                    return "cat: missing file operand"
                }

                const filename = args[0]

                if (filename === "about.md") {
                    return [
                        "# About Bhavesh Chaudhari",
                        "",
                        "Full-Stack Developer & Builder",
                        "Location: India",
                        "",
                        "## About Me",
                        "Hi, I’m Bhavesh. I love building things with code.",
                        "As AI reshapes everything faster than we can imagine,",
                        "I’m using this space to document my thoughts,",
                        "experiments, and lessons as I lay the foundation",
                        "for something bigger.",
                        "",
                        "## Interests",
                        "- Web technologies & scalable systems",
                        "- SaaS, Indie Hacking",
                        "- AI & how it changes how we build",
                        "- Sharing what I learn",
                    ];
                }

                if (filename === "contact.txt") {
                    return [
                        "Contact Information",
                        "==================",
                        "",
                        `Email: ${CONTACT_EMAIL}`,
                        `GitHub: ${SOCIAL_LINKS.github}`,
                        `LinkedIn: ${SOCIAL_LINKS.linkedin}`,
                        `Twitter: ${SOCIAL_LINKS.twitter}`,
                        `Website: ${WEBSITE_URL}`,
                    ]
                }

                return `cat: ${filename}: No such file or directory`
            },
        },

        about: {
            name: "about",
            description: "About Bhavesh Chaudhari",
            action: () => [
                "╭─────────────────────────────────────────╮",
                "│              ABOUT ME                   │",
                "╰─────────────────────────────────────────╯",
                "",
                "Full-Stack Developer & Builder",
                "Location: India",
                "",
                "Hi, I’m Bhavesh. I love building things with code.",
                "As AI reshapes everything faster than we can imagine,",
                "I’m using this space to document my thoughts,",
                "experiments, and lessons as I lay the foundation",
                "for something bigger.",
                "",
                "## Interests",
                "- Web technologies & scalable systems",
                "- SaaS, Indie Hacking",
                "- AI & how it changes how we build",
                "- Sharing what I learn",
            ],
        },

        whoami: {
            name: "whoami",
            description: "Display current user",
            action: () => "bhavesh",
        },

        "rm -rf /": {
            name: "rm -rf /",
            description: "Try on your own risk",
            action: () => {
                //    setTimeout(()=>{
                //      window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0", "_blank")
                //    }, 200)
                return [
                    "╭──────────────────────────────────────────────╮",
                    "│         YOU KNOW THE RULES AND SO DO I       │",
                    "╰──────────────────────────────────────────────╯",
                    "rick:⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⡿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣻⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⡽⣯⣻⣻⡽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣻⣻",
                    "rick:⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⡿⣿⣿⣿⣿⣿⣿⡿⣻⣻⣻⣻⣻⣻⡽⣯⣟⢷⠍⠟⠉⠛⢿⢿⣻⣻⢿⣿⣿⣯⣻⡽⣯⣻⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣻⢯",
                    "rick:⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣻⣻⣻⣻⡟⡅⠀⠀⠀⠠⠀⠀⠆⡹⣻⣻⡽⣯⣻⡽⣯⣻⡽⣻⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣻⣻⣻",
                    "rick:⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣻⣿⡟⡛⡜⡜⣎⢦⢶⣖⡴⡀⠠⣿⣿⣿⣟⣟⣟⣟⣟⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣻⣻⣻⣻",
                    "rick:⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣻⣻⢆⢭⢎⢎⢞⡝⣝⡽⡽⡣⢂⣟⢯⢯⢯⣿⣻⣻⡽⣻⡽⣻⣻⣿⣿⣿⣿⣿⣿⣿⡿⣟⣿⣿⣿⣿⣻",
                    "rick:⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣟⢧⡒⡔⢆⢯⢎⠚⡜⡇⣼⣿⣿⣯⣻⣻⣻⣻⢯⣿⣿⣻⣻⣻⣻⢿⣿⣿⣿⣿⡿⣻⣻⣻⣟⣿⣿",
                    "rick:⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⢹⢧⢣⢣⠡⡋⡯⣫⢯⡹⣹⣿⣿⣿⣿⣯⣻⣻⣻⣿⣿⣻⣻⣻⣿⣟⣟⢿⣿⣿⣿⣿⣻⢿⣿⣿⣿",
                    "rick:⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠧⢣⢢⢌⣍⡹⡽⣹⣽⣿⣿⣿⣿⣿⡽⣯⣻⢯⣻⢯⣻⣻⣿⣿⣿⣿⣻⣻⣻⣻⢿⢿⣿⣿⣿⣿",
                    "rick:⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⡽⣍⢎⢎⢝⢏⢏⣝⢿⣿⣿⣿⣿⣿⣿⣻⡽⣯⣻⣻⣿⣿⣟⢿⣿⢿⣻⣻⣿⣿⢿⣿⣿⣿⣿⣿⣿",
                    "rick:⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣟⣟⣟⡜⡜⡜⡝⡭⣫⢫⠂⢫⣿⣿⣿⣟⢯⣻⣻⣻⡽⣻⣿⣿⣿⣟⣿⣿⣿⣻⣟⣟⣿⣿⣿⣿⣿⣿⣿",
                    "rick:⣿⣿⣿⣿⢿⡿⣿⢿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⡿⡽⡻⡿⣇⢣⢣⠱⡱⡱⣽⣿⠀⠀⠀⠀⠐⢉⠍⡛⢿⢯⣻⣻⣿⣿⡿⣿⣿⣿⣿⣟⣟⣿⣿⣿⣿⣿⣿⣿⣿",
                    "rick:⣿⣿⣿⣿⣿⣿⣿⣿⣟⢿⣿⣿⣿⡿⣿⣿⣟⢿⣻⣻⡿⣏⢋⠀⠀⠀⣹⣻⡇⢣⠱⣥⣻⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣻⣿⣿⣿⣟⣟⣟⡽⣻⣿⡿⡿⣿⣿⣿",
                    "rick:⣿⣿⣿⣿⣿⢿⣿⣿⣿⢿⣻⣿⢿⣿⣿⢿⣻⣻⣻⡃⠀⠀⠀⠀⠀⠀⠠⠠⡣⢢⠱⡉⠙⠛⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣻⡽⣻⣿⢯⣻⣿⣿⢯⣻⣿⣿⣿⣿⣿⣿",
                    "rick:⣿⣿⣿⣿⢿⣻⣻⣿⣟⣟⣟⣿⣿⣿⣿⣿⡿⣟⣟⠄⠀⠀⠀⠀⠀⠀⠀⢀⢆⡑⠡⠉⠋⠖⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣻⢯⣻⡽⣻⣻⡿⣯⢿⣿⣿⣿⣿⣿",
                    "rick:⣿⣻⣟⣟⣿⣿⣿⣿⣟⣟⣟⣟⣿⣿⣿⣿⣟⣟⡽⡄⠀⠀⠀⠀⠀⠀⠀⢀⠁⣯⠚⠹⠶⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣻⢯⢯⣻⣿⣿⣻⣻⣻⣿⣿⣿⣿⣿",
                    "rick:⣿⣟⢿⣿⣿⣿⣿⣿⣻⣿⡿⣻⣻⣿⣿⣿⢿⣻⢯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⣟⠖⡖⡤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⢿⣻⣿⣻⣿⣿⣿⣿⣿⣻⢯⣻⣻⣻",
                    "rick:⣿⣻⣻⣿⣿⣿⣿⣻⣽⣿⣿⣟⣟⢿⣿⣿⡿⣻⣻⠀⠀⠀⠀⠀⠀⠀⠀⠀⢦⢢⣠⣀⠀⠀⠀⠀⠩⡛⡝⡜⡖⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿",
                    "rick:⣿⣻⣻⣻⣿⣿⡿⣻⣿⣿⣻⣻⣿⣿⡿⣿⣻⣻⣻⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⡜⠈⠁⠀⠀⠀⠀⠀⠌⣌⢎⡜⡜⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣻⣿⣿⡿⣟⢿⣿⣿⣿",
                    "rick:⣟⣿⣿⣿⡽⡽⡽⣻⣹⡽⣿⣿⣿⣻⣻⣻⣻⡽⣻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢢⠣⠒⠀⠀⠀⠀⠀⠀⠎⢎⢎⢎⢎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⡽⣿⣿⣻⣻⣻⢿⣿⣿",
                    "rick:⣿⣿⢿⣿⣯⣫⣏⢯⣫⣿⣿⣿⣿⣟⣟⣟⣟⡽⡽⠀⡀⠀⠀⠀⠀⢀⢀⠀⠰⡰⠤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡝⡽⡽⣿⣿⣿⣻⡝⡽",
                    "rick:⣯⣯⣯⣯⢯⣫⢫⣻⡿⣻⣿⣿⣿⣿⣿⣻⡽⡽⣭⠂⠀⡰⡱⠡⠢⢂⠆⠀⢠⠰⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⢯⢫⣫⡿⣻⣿⣿⣿⣻⡹",
                    "rick:⡿⡿⣻⣻⣻⢭⣚⢧⢫⣻⣿⣿⡿⡽⡽⡽⡽⣹⣝⢇⠄⠀⠀⠄⠄⠄⡐⠀⠄⡐⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡝⣝⡽⣹⢽⢯⡻⣻⣟⢯⢫⣚⣟⣟⣟⣟⣟⣟⡝",
                    "rick:⣯⣻⡽⣯⣻⡜⡵⡽⣎⢭⣻⡝⡽⣽⡽⣝⣝⣝⡝⣗⢭⢎⠀⠀⠂⠂⠀⠀⠀⡐⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣹⣝⣝⡝⣝⡽⡽⡹⣚⠵⡭⢯⢯⢯⣻⡽⡽⣣",
                    "rick:⣟⣟⡽⣯⢯⢎⢎⢯⣏⡗⡝⣝⡽⣻⢯⣫⢫⢫⣫⣻⢯⡳⡱⡱⡱⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⡝⡝⡝⣝⡝⡝⡭⣫⢫⢭⣚⣝⣝⣝⡽⣹⣹⢧",
                    "rick:⢏⠯⢫⢫⢫⢪⢎⢯⢏⠳⡹⡹⣻⡿⡯⣫⢫⡹⡹⡽⡽⡹⡸⡜⡄⠀⠀⢀⢂⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡭⡭⣫⡹⡹⡭⣫⢫⢫⣚⡜⡝⡝⣝⣝⢽⡹⡭",
                ]
            },
        },

        date: {
            name: "date",
            description: "Show current date and time",
            action: () => new Date().toString(),
        },

        blog: {
            name: "blog",
            description: "Latest blog posts",
            action: () => {
                if (isLoadingBlogs) {
                    return "Loading blog posts..."
                }

                if (blogPosts.length === 0) {
                    return [
                        "╭─────────────────────────────────────────╮",
                        "│             NO POSTS FOUND              │",
                        "╰─────────────────────────────────────────╯",
                        "",
                        "No blog posts available at the moment.",
                        "Check back later for new content!",
                    ]
                }

                const output = [
                    "╭─────────────────────────────────────────╮",
                    "│             LATEST POSTS                │",
                    "╰─────────────────────────────────────────╯",
                    "",
                    `Found ${blogPosts.length} blog post${blogPosts.length === 1 ? "" : "s"}:`,
                    "",
                ]

                blogPosts.slice(0, 10).forEach((post, index) => {
                    const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })

                    output.push(`${index + 1}. ${post.title}`)
                    output.push(`   📅 ${date} | ⏱️ ${post.readingTime}`)
                    output.push(`   📂 ${post.category} | 🏷️ ${post.tags.slice(0, 3).join(", ")}`)
                    output.push(`   📝 ${post.excerpt.slice(0, 80)}${post.excerpt.length > 80 ? "..." : ""}`)
                    if (post.featured) {
                        output.push(`   ⭐ Featured Post`)
                    }
                    output.push("")
                })

                if (blogPosts.length > 10) {
                    output.push(`... and ${blogPosts.length - 10} more posts`)
                    output.push("")
                }

                output.push("💡 Use 'open blog <number>' to read a specific post")
                output.push("🔍 Use 'search <term>' to find posts by keyword")
                output.push("📖 Visit /blogs to see all posts")

                return output
            },
        },

        search: {
            name: "search",
            description: "Search blog posts",
            usage: "search <keyword>",
            examples: ["search react", "search performance", "search typescript"],
            action: (args) => {
                if (args.length === 0) {
                    return [
                        "Usage: search <keyword>",
                        "",
                        "Search through blog posts by title, content, or tags.",
                        "",
                        "Examples:",
                        "  search react",
                        "  search performance",
                        "  search typescript",
                        "",
                        "💡 Tip: Use 'blog' command first to see available posts",
                    ]
                }

                const searchTerm = args.join(" ")
                const matchingPosts = searchPosts(searchTerm)

                if (matchingPosts.length === 0) {
                    return [
                        `No posts found matching "${searchTerm}"`,
                        "",
                        "💡 Try different keywords or use 'blog' to see all posts",
                    ]
                }

                const output = [
                    `╭─────────────────────────────────────────╮`,
                    `│         SEARCH RESULTS (${matchingPosts.length})              │`,
                    `╰─────────────────────────────────────────╯`,
                    "",
                    `Found ${matchingPosts.length} post${matchingPosts.length === 1 ? "" : "s"} matching "${searchTerm}":`,
                    "",
                ]

                matchingPosts.slice(0, 5).forEach((post) => {
                    const originalIndex = blogPosts.findIndex((p) => p.slug === post.slug) + 1
                    const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                    })

                    output.push(`${originalIndex}. ${post.title}`)
                    output.push(`   📅 ${date} | 📂 ${post.category}`)
                    output.push(`   📝 ${post.excerpt.slice(0, 80)}${post.excerpt.length > 80 ? "..." : ""}`)
                    output.push("")
                })

                if (matchingPosts.length > 5) {
                    output.push(`... and ${matchingPosts.length - 5} more results`)
                    output.push("")
                }

                output.push("💡 Use 'open blog <number>' to read a specific post")

                return output
            },
        },

        featured: {
            name: "featured",
            description: "Show featured blog posts",
            action: () => {
                const featuredPosts = useBlogStore.getState().getFeaturedPosts()

                if (featuredPosts.length === 0) {
                    return "No featured posts available."
                }

                const output = [
                    "╭─────────────────────────────────────────╮",
                    "│           FEATURED POSTS                │",
                    "╰─────────────────────────────────────────╯",
                    "",
                ]

                featuredPosts.forEach((post, index) => {
                    const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })

                    output.push(`${index + 1}. ⭐ ${post.title}`)
                    output.push(`   📅 ${date} | ⏱️ ${post.readingTime}`)
                    output.push(`   📂 ${post.category}`)
                    output.push(`   📝 ${post.excerpt.slice(0, 80)}${post.excerpt.length > 80 ? "..." : ""}`)
                    output.push("")
                })

                return output
            },
        },

        recent: {
            name: "recent",
            description: "Show recent blog posts",
            usage: "recent [number]",
            examples: ["recent", "recent 3", "recent 10"],
            action: (args) => {
                const limit = args.length > 0 ? Number.parseInt(args[0]) || 5 : 5
                const recentPosts = useBlogStore.getState().getRecentPosts(limit)

                if (recentPosts.length === 0) {
                    return "No recent posts available."
                }

                const output = [
                    "╭─────────────────────────────────────────╮",
                    `│         RECENT POSTS (${limit})              │`,
                    "╰─────────────────────────────────────────╯",
                    "",
                ]

                recentPosts.forEach((post, index) => {
                    const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })

                    output.push(`${index + 1}. ${post.title}`)
                    output.push(`   📅 ${date} | ⏱️ ${post.readingTime}`)
                    output.push(`   📂 ${post.category}`)
                    if (post.featured) {
                        output.push(`   ⭐ Featured Post`)
                    }
                    output.push("")
                })

                return output
            },
        },

        projects: {
            name: "projects",
            description: "Featured projects",
            action: () => {
                const output = [
                    "╭─────────────────────────────────────────╮",
                    "│            FEATURED PROJECTS            │",
                    "╰─────────────────────────────────────────╯",
                    "No featured project added at the moment. Visit: https://github.com/bhaveyx",
                    "",
                ]

                output.push("🔗 More projects: https://github.com/bhaveyx")

                return output
            },
        },

        contact: {
            name: "contact",
            description: "Contact information",
            action: () => [
                "╭─────────────────────────────────────────╮",
                "│            CONTACT INFO                 │",
                "╰─────────────────────────────────────────╯",
                "",
                `Email: ${CONTACT_EMAIL}`,
                `GitHub: ${SOCIAL_LINKS.github}`,
                `LinkedIn: ${SOCIAL_LINKS.linkedin}`,
                `Twitter: ${SOCIAL_LINKS.twitter}`,
                `Website: ${WEBSITE_URL}`,
                "",
            ],
        },

        // minimize: {
        //     name: "minimize",
        //     description: "Minimize terminal",
        //     action: () => {
        //         minimizeTerminal()
        //         return "Terminal minimized. Click the terminal icon to restore."
        //     },
        // },

        // close: {
        //     name: "close",
        //     description: "Close terminal",
        //     action: () => {
        //         setTimeout(() => closeTerminal(), 500)
        //         return "Closing terminal... Use Ctrl+` to reopen."
        //     },
        // },

        // opacity: {
        //     name: "opacity",
        //     description: "Set terminal opacity",
        //     usage: "opacity <0-100>",
        //     examples: ["opacity 80", "opacity 100"],
        //     action: (args) => {
        //         if (args.length === 0) {
        //             return (
        //                 "Usage: opacity <0-100>. Current opacity: " + Math.round(useTerminalStore.getState().opacity * 100) + "%"
        //             )
        //         }

        //         const value = Number.parseInt(args[0])
        //         if (isNaN(value) || value < 0 || value > 100) {
        //             return "Invalid opacity value. Please use a number between 0 and 100."
        //         }

        //         setOpacity(value / 100)
        //         return `Terminal opacity set to ${value}%`
        //     },
        // },

        // reset: {
        //     name: "reset",
        //     description: "Reset terminal position and size",
        //     action: () => {
        //         resetTerminal()
        //         return "Terminal position and size reset to defaults."
        //     },
        // },

        // theme: {
        //     name: "theme",
        //     description: "Toggle terminal theme",
        //     action: () => {
        //         const newTheme = terminalTheme === "retro" ? "modern" : "retro"
        //         setTerminalTheme(newTheme)

        //         if (newTheme === "modern") {
        //             setTheme(theme === "dark" ? "light" : "dark")
        //         }

        //         return `Terminal theme switched to: ${newTheme} ${newTheme === "retro" ? "(green on black)" : "(modern colors)"}`
        //     },
        // },

        clear: {
            name: "clear",
            description: "Clear terminal",
            action: () => "CLEAR_TERMINAL",
        },

        open: {
            name: "open",
            description: "Open blog post or navigate to page",
            usage: "open <target>",
            examples: ["open blog 1", "open twitter", "open github"],
            action: async (args) => {
                if (args.length === 0) {
                    return [
                        "Usage: open <target>",
                        "",
                        "Available targets:",
                        "• blog <number>  - Open specific blog post",
                        "• twitter         - Open Twitter profile",
                        "• github         - Open GitHub profile",
                        "• linkedin       - Open LinkedIn profile",
                        "",
                        "Examples:",
                        "  open blog 1",
                        "  open twitter",
                        "  open github",
                    ]
                }

                const target = args[0]
                const param = args[1]

                if (target === "blog") {
                    if (!param) {
                        return "Please specify a blog post number. Use 'blog' to see available posts."
                    }

                    const postIndex = Number.parseInt(param) - 1
                    if (isNaN(postIndex) || postIndex < 0 || postIndex >= blogPosts.length) {
                        return `Invalid post number. Please use a number between 1 and ${blogPosts.length}.`
                    }

                    const post = blogPosts[postIndex]
                    setTimeout(() => {
                        router.push(`/blogs/${post.slug}`)
                    }, 1000)
                    return `Opening: ${post.title}`
                }

                if (target === "twitter" || target === "x") {
                    setTimeout(() => {
                        window.open(SOCIAL_LINKS.twitter, "_blank")
                    }, 1000)
                    return "Opening Twitter profile..."
                }

                if (target === "github") {
                    setTimeout(() => {
                        window.open(SOCIAL_LINKS.github, "_blank")
                    }, 1000)
                    return "Opening GitHub profile..."
                }

                if (target === "linkedin") {
                    setTimeout(() => {
                        window.open(SOCIAL_LINKS.linkedin, "_blank")
                    }, 1000)
                    return "Opening LinkedIn profile..."
                }

                return `Unknown target: ${target}. Type 'open' for usage.`
            },
        },

        goto: {
            name: "goto",
            description: "Navigate to different pages",
            usage: "goto <page>",
            examples: ["goto blog"],
            action: async (args) => {
                if (args.length === 0) {
                    return [
                        "Usage: goto <page>",
                        "",
                        "Available pages:",
                        "• home      - Go to homepage",
                        "• blog      - Go to blog listing",
                        "",
                        "Examples:",
                        "  goto home",
                        "  goto blog",
                    ]
                }

                const page = args[0]

                switch (page) {
                    case "home":
                        if (pathname === "/") {
                            return "You are already on the homepage."
                        }
                        setTimeout(() => {
                            router.push("/")
                        }, 1000)
                        return "Navigating to homepage..."
                    case "blog":
                        if (pathname === "/blog") {
                            return "You are already on the blog page."
                        }
                        setTimeout(() => {
                            router.push("/blogs")
                        }, 1000)
                        return "Navigating to blog..."
                    default:
                        return `Unknown page: ${page}. Type 'goto' for available pages.`
                }
            },
        },
    }

    return {
        commands,
        currentDirectory,
        setTheme,
        theme,
    }
}
