"use client";

import Link from "next/link";
import SearchDialog from "./search";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "./context";

import NotificationsDialog from "./notifications";
import AvatarDialog from "./avatar";

export default function Header() {
  const me = useUser();
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
          <div className="gap-2 flex">
            <Link href={"/join"}>
              <Button variant="secondary">Become a Member</Button>
            </Link>
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          {me ? (
            <>
              <NotificationsDialog userid={me.id} />
              <AvatarDialog user={me} />
            </>
          ) : (
            <>
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </>
          )}
        </SignedIn>
      </div>
    </header>
  );
}
