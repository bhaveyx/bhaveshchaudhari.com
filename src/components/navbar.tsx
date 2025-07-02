"use client"
import React, { useState, useEffect, useRef, } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
// import { TerminalTrigger } from "./terminal/global/terminal-trigger";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [hasScrolled, setHasScrolled] = useState(false)
    const pathname = usePathname()

    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                // navRef.current.style.background = "white";
                // navRef.current.style.borderBottom = "1px solid #e5e7eb";
                setHasScrolled(true)
            } else {
                setHasScrolled(false)
                // navRef.current.style.background = "transparent";
                // navRef.current.style.borderBottom = "none";
            }
        };

        window.removeEventListener("scroll", handleScroll);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            return window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <nav
                ref={navRef}
                className={cn(
                    "flex z-20 fixed w-full dark:shadow-gray-500 justify-center h-14",
                    hasScrolled &&
                    "bg-white/60 dark:bg-black/10 border-b backdrop-blur",
                )}
            >
                <div className={
                    cn(
                        "flex items-center justify-between max-w-2xl w-[90%]",
                        pathname !== "/" && "max-w-5xl"
                    )
                }>
                    <div className="flex">
                        <ul
                            role={"navigation"}
                        >
                            <li key={"home"}>
                                <Link
                                    className="w-full pb-4 md:py-0 leading-none flex flex-row items-center gap-4"
                                    href={"/"}
                                >
                                    <Image className="rounded-full" width={30} height={30} src={"https://github.com/bhavesh-chaudhari.png"} alt={"profile image"} />
                                    <span className="font-semibold text-lg">
                                        bhaveyx
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex gap-4 items-center">
                        <ThemeSwitcher />
                        {/* <TerminalTrigger variant="button" /> */}
                    </div>
                </div>
            </nav>
        </>
    );
};
