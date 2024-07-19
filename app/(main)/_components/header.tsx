"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import SearchDialog from "./search";
import { RedirectToSignIn, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";

import { UserButton } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between sticky left-0 right-0 top-0 z-50 bg-gradient-to-b from-background from-5% to-background/0 px-4 lg:px-8 py-6 fade-in">
      <div className="flex gap-8 items-center">
        <h1 className="text-2xl select-none">
          <Link href="/">Mochi.</Link>
        </h1>
        <div className="hidden lg:flex gap-4">
          <Link
            href="#"
            className="transition-colors hover:text-muted-foreground"
          >
            TV Series
          </Link>
          <Link
            href="#"
            className="transition-colors hover:text-muted-foreground"
          >
            Movies
          </Link>
          <Link
            href="#"
            className="transition-colors hover:text-muted-foreground"
          >
            Collections
          </Link>
        </div>
      </div>
      <div className="flex gap-5 lg:gap-7 items-center">
        <SearchDialog />
        <SignedOut>
            <Button>Become a Member</Button>
        </SignedOut>
        <SignedIn>
          <Bell className="w-5 h-5 text-primary cursor-pointer" />
            {/* <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage src="#" alt="@user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar> */}
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
