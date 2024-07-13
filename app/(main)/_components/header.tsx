"use client";

import Link from "next/link";
import SearchInput from "./search-input";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 select-none">
      <div className="flex gap-12 items-center">
        <h1 className="text-2xl">Mochi.</h1>
        <div className="hidden lg:flex">
          <Button variant="link" size="link">
            <Link href="/">Home</Link>
          </Button>
          <Button variant="link" size="link">
            <Link href="/about">Anime</Link>
          </Button>
          <Button variant="link" size="link">
            <Link href="/contact">Collection</Link>
          </Button>
          <Button variant="link" size="link">
            <Link href="/contact">News</Link>
          </Button>
        </div>
      </div>
      <div className="flex gap-4">
        <SearchInput />
        <Button variant="secondary">Login</Button>
        <Button>Get Started</Button>
      </div>
    </header>
  );
}
