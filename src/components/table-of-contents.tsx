"use client"

import { useScrollSpy } from "@/hooks/useScrollSpy"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { TocItem } from "@/lib/blog"

interface TableOfContentsProps {
    className?: string
    tocItems: TocItem[]
}

export function TableOfContents({ className, tocItems }: TableOfContentsProps) {
    const activeId = useScrollSpy(tocItems.map(item => `#${item.id}`), {
        rootMargin: "-80px 0% -30% 0%",
        threshold: 0.6,
    });

    if (tocItems.length === 0) return null;

    const TocContent = ({ withDrawerClose = false }: { withDrawerClose?: boolean }) => (
        <nav>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white uppercase tracking-wide mb-4">
                Table of Contents
            </h3>

            <ul className="space-y-1 text-sm">
                {tocItems.map((item) => {
                    const isActive = activeId === item.id;
                    const paddingLeft = (item.level - 2) * 12 + (item.level ?? 8);

                    const link = (
                        <a
                            href={`#${item.id}`}
                            className={cn(
                                "text-left transition-all duration-200 block w-full py-2 px-3 rounded-md text-sm leading-5",
                                isActive
                                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                                    : "text-gray-700 dark:text-gray-300"
                            )}
                            aria-current={isActive ? "location" : undefined}
                        >
                            {item.text}
                        </a>
                    );


                    return (
                        <li key={item.id} style={{ paddingLeft: `${paddingLeft}px` }}>
                            {withDrawerClose ? (
                                <DrawerClose asChild>
                                    {link}
                                </DrawerClose>
                            ) : (
                                link
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );

    return (
        <>
            <div className={cn("hidden md:block", className)}>
                <TocContent />
            </div>

            <div className="md:hidden">
                <Drawer >
                    <DrawerTrigger asChild>
                        <button
                            className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
                            aria-label="Open table of contents"
                        >
                            <Menu size={20} />
                        </button>
                    </DrawerTrigger>
                    <DrawerContent className="max-h-[80vh]">
                        <DrawerHeader>
                            <DrawerTitle>Table of Contents</DrawerTitle>
                        </DrawerHeader>
                        <div className="px-4 pb-6 overflow-y-auto">
                            <TocContent withDrawerClose />
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
}
