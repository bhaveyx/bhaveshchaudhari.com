import { generateHomepageMetadata } from "@/lib/og-utils"
import { Terminal } from "@/components/terminal/terminal"
import { GridHeader } from "@/components/ui/grid-header"
import Link from "next/link"
import { Github, Linkedin, Twitter, ChevronsRight } from "lucide-react"

export const metadata = generateHomepageMetadata()

export default function HomePage() {
    return (
        <div className="bg-gradient-to-t min-h-[calc(100vh-56px)] from-white dark:from-black to-transparent transition-colors relative">
            <GridHeader />

            <div className="max-w-4xl w-[90%] mx-auto py-10 flex flex-col items-center h-full gap-8">
                <header className="w-full max-w-2xl flex flex-col items-start gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-6 font-sans">
                            Hi, I am Bhavesh
                        </h1>
                        <p className="font-roboto text-neutral-800">
                            I love to build things with my code. In an era where AI is reshaping everything, and will keep doing so faster than we can imagine, I want this space to be a living journal of my thoughts, experiments, and the lessons I pick up along the way as I evolve and build the foundation for something bigger.
                        </p>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <div className="flex gap-4 md:gap-6 items-center text-muted-foreground text-xl">
                            <Link className="inline-flex items-center rounded-full bg-gradient-to-t from-[rgba(215,215,215,0.6)] to-[rgba(255,255,255,1)] dark:from-transparent dark:to-black dark:border p-2 text-base font-medium text-neutral-600  dark:text-neutral-200 hover:shadow-sm hover:shadow-green-300 transition-all" href="https://github.com/bhavesh-chaudhari" target="_blank" rel="noopener noreferrer">
                                <Github size={18} />
                            </Link>
                            <Link className="inline-flex items-center rounded-full bg-gradient-to-t from-[rgba(215,215,215,0.6)] to-[rgba(255,255,255,1)] dark:from-transparent dark:to-black dark:border p-2 text-base font-medium text-neutral-600 dark:text-neutral-200 hover:shadow-sm hover:shadow-green-300 transition-all" href="https://twitter.com/roninbhavesh" target="_blank" rel="noopener noreferrer">
                                <Twitter size={18} />
                            </Link>
                            <Link className="inline-flex items-center rounded-full bg-gradient-to-t from-[rgba(215,215,215,0.6)] to-[rgba(255,255,255,1)] dark:from-transparent dark:to-black dark:border p-2 text-base font-medium text-neutral-600 dark:text-neutral-200 hover:shadow-sm hover:shadow-green-300 transition-all" href="https://linkedin.com/in/bhaveshc0" target="_blank" rel="noopener noreferrer">
                                <Linkedin size={18} />
                            </Link>
                        </div>
                        <Link href="/blogs" className="inline-flex items-center rounded-full bg-gradient-to-t from-[rgba(215,215,215,0.6)] to-[rgba(255,255,255,1)] dark:from-transparent dark:to-black dark:border px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-200 hover:shadow-sm hover:shadow-green-300 transition-all">
                            <span>
                                Read latest posts
                            </span>
                            <span className="ml-1 inline-flex">
                                <ChevronsRight size={16}></ChevronsRight>
                            </span>
                        </Link>
                    </div>
                </header>

                <section className="w-full">
                    <div className="text-center mb-8">
                        <p className="text-gray-600 dark:text-gray-400">
                            Type{" "}
                            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-emerald-600 dark:text-emerald-400">
                                help
                            </code>{" "}
                            to get started
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <Terminal />
                    </div>
                </section>
            </div>
        </div>
    )
}
