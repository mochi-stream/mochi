"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="flex items-center justify-between sticky left-0 right-0 top-0 z-50 bg-gradient-to-b from-background to-background/0 px-8 py-6 fade-in">
      <div className="flex gap-8 items-center">
        <h1 className="text-2xl select-none">Mochi.</h1>
        <div className="hidden lg:flex gap-4">
          <Link
            href="/about"
            className="transition-colors hover:text-muted-foreground"
          >
            TV Series
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-muted-foreground"
          >
            Movies
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-muted-foreground"
          >
            Collections
          </Link>
        </div>
      </div>
      <div className="flex gap-7 items-center">
        <Search className="w-5 h-5 text-primary cursor-pointer" />
        <Bell className="w-5 h-5 text-primary cursor-pointer" />
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage src="#" alt="@user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
