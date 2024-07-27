"use client";

import { useContext } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { dashboardConfig } from "@/config/dashboard";
import { docsConfig } from "@/config/docs";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

interface NavBarProps {
    scroll?: boolean;
    large?: boolean;
}

export function NavBar({ scroll = false }: NavBarProps) {
    const scrolled = useScroll(50);

    const selectedLayout = useSelectedLayoutSegment() as keyof typeof configMap | null;
    const dashBoard = selectedLayout === "dashboard";
    const documentation = selectedLayout === "docs";
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const configMap = {
        docs: docsConfig.mainNav,
        dashboard: dashboardConfig.mainNav,
    };

    const links =
        (selectedLayout && configMap[selectedLayout]) || marketingConfig.mainNav;

    return (
        <header
            className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${scroll ? (scrolled ? "border-b" : "bg-transparent") : "border-b"
                }`}
        >
            <MaxWidthWrapper
                className="flex h-14 items-center justify-between py-4"
                large={documentation}
            >
                <div className="flex gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <Icons.logo />
                        <span className="font-urban text-xl font-bold">
                            {siteConfig.name}
                        </span>
                    </Link>

                    {/* {links && links.length > 0 ? (
                        <nav className="hidden gap-6 md:flex">
                            {(admin ? adminConfig.mainNav : links).map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.disabled ? "#" : item.href}
                                    prefetch={true}
                                    className={cn(
                                        "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                                        item.href.startsWith(`/${selectedLayout}`)
                                            ? "text-foreground"
                                            : "text-foreground/60",
                                        item.disabled && "cursor-not-allowed opacity-80",
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    ) : null} */}
                </div>

                <div className="flex items-center space-x-3">
                    {isLoaded && userId ? (
                        <>
                            <Link
                                href={"/dashboard"}
                                className="hidden md:block"
                            >
                                <Button
                                    className="gap-2 px-4 rounded-full"
                                    variant="default"
                                    size="sm"  
                                >
                                    <span>Dashboard</span>
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Link
                            href={"/dashboard"}
                            className="hidden md:block"
                        >
                            <Button
                                className="hidden gap-2 px-4 md:flex rounded-full"
                                variant="default"
                                size="sm"
                            >
                                <span>Sign In</span>
                                <Icons.arrowRight className="size-4" />
                            </Button>
                        </Link>
                    )}
                </div>
            </MaxWidthWrapper>
        </header>
    );
}