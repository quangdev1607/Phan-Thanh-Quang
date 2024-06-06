"use client";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

import Link from "next/link";
import { ToggleDarkMode } from "./ToggleDarkMode";

export function Navbar() {
    return (
        <div className=" py-2 px-5 flex items-center justify-between shadow-xl bg-white">
            <Link href={"/"}>
                <span className="text-2xl dark:text-primary-foreground font-sans italic font-semibold">Fancy Form</span>
            </Link>

            <div className="flex items-center gap-x-4 ">
                <ToggleDarkMode />
                <div>
                    <Button variant={"outline"} asChild>
                        <Link className="flex gap-x-2 items-center" href={"https://github.com/quangdev1607/Phan-Thanh-Quang"}>
                            <Star width={15} height={15} fill="yellow" />
                            <span>Github</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
