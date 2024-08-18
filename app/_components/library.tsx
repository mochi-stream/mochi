"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LibraryBig, LibraryIcon } from "lucide-react";

export default function LibraryDialog() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="w-8 h-8 relative flex items-center justify-center">
                    <LibraryBig className="w-5 h-5 text-primary cursor-pointer" />
                </div>
            </DropdownMenuTrigger>
        </DropdownMenu>
    );
}
