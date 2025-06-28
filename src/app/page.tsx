import { generateHomepageMetadata } from "@/lib/og-utils"
import { Terminal } from "@/components/terminal/terminal"
import { GridHeader } from "@/components/ui/grid-header"
import Link from "next/link"
import { Github, Linkedin, Twitter, ChevronsRight } from "lucide-react"

export const metadata = generateHomepageMetadata()

export default function HomePage() {
    return (
        <div className="h-[calc(100vh-56px)] bg-gradient-to-t from-green-50 dark:from-black to-transparent transition-colors relative">
            <GridHeader />

            <div className="max-w-4xl w-[90%] mx-auto py-20  flex flex-col items-center justify-center h-full gap-8">
                <header className="w-full max-w-2xl">
                    <div className="border p-6 mb-8 rounded-md font-mono">
                        <p className=" mb-4">
                            bhavesh-chaudhari/about.md
                        </p>
                        <h1 className="block  font-extrabold">
                            Hi, I am Bhavesh Chaudhari. I love to build things with my code. Δ ThinkLearnExecute.
                        </h1>

                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center text-muted-foreground text-xl">
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
