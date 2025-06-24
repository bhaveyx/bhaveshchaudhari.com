import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/navbar";
import { GlobalTerminal } from "@/components/terminal/global/global-terminal";
import { getAllBlogPosts } from "@/lib/blog";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Bhavesh Chaudhari",
    description: "Yes",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const posts = getAllBlogPosts()

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="bhaveshchaudhari.com" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
                <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <header>
                        <Navbar />
                    </header>
                    <main className="pt-14">
                        {children}
                    </main>
                    {/* <GlobalTerminal posts={posts} /> */}
                </ThemeProvider>
            </body>
        </html>
    );
}
