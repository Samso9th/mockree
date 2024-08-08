"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    IconCreditCard,
    IconDeviceImac,
    IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

type Props = {}

const DashSidebar = (props: Props) => {
    const { user } = useUser();
    const Content = {
        author: user?.firstName || "User",
        authorAvatar: user?.imageUrl || "/avatar.svg",
    };
    const links = [
        {
            label: "Interviews",
            href: "/dashboard",
            icon: (
                <IconDeviceImac className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Billing",
            href: "#",
            icon: (
                <IconCreditCard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Settings",
            href: "#",
            icon: (
                <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-black min-h-screen min-w-screen">
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <div className="md:sticky md:top-0 md:h-screen">
                    <SidebarBody className="justify-between gap-10">
                        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                            {open ? <Logo /> : <LogoIcon />}
                            <div className="mt-8 flex flex-col gap-2">
                                {links.map((link, idx) => (
                                    <SidebarLink key={idx} link={link} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <SidebarLink
                                link={{
                                    label: Content.author,
                                    href: "#",
                                    icon: (
                                        <Image
                                            src={Content.authorAvatar}
                                            alt={Content.author}
                                            width={50}
                                            height={50}
                                            className="h-7 w-7 flex-shrink-0 rounded-full"
                                        />
                                    ),
                                }}
                            />
                        </div>
                    </SidebarBody>
                </div>
            </Sidebar>
        </div>
    );
}
export const Logo = () => {
    return (
        <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <Image
                src="/icon.svg"
                alt="Icon"
                height={32}
                width={40}
                className="flex-shrink-0"
            />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-extrabold text-lg text-black dark:text-white whitespace-pre"
            >
                Mockree
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <Image
                src="/icon.svg"
                alt="Icon"
                height={32}
                width={40}
                className="flex-shrink-0"
            />
        </Link>
    );
};

export default DashSidebar