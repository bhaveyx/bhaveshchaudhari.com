import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
// import { GlobalTerminal } from "@/components/terminal/global/global-terminal";
// import { getAllBlogPosts } from "@/lib/blog";
import Script from "next/script";

const geistSans = Geist({
    variable: "--font-geist-sans",
    weight: ["400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const poppins = Poppins({
    variable: "--font-poppins",
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

const roboto = Roboto({
    variable: "--font-roboto",
    weight: ["300", "400", "500", "600", "700", "800", "900"],
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

    // const posts = getAllBlogPosts()

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="Bhavesh Chaudhari" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
                <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
                <Script
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
                />
                <Script
                    id="gtag-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                      });
                    `,
                    }}
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${roboto.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
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
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
