"use client";

import Link from "next/link";

import { useUser } from "./context";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import SearchDialog from "./search";
import LibraryDialog from "./library";
import NotificationsDialog from "./notifications";

import AvatarDialog from "./avatar";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const me = useUser();
  const pathname = usePathname();
  const hasAnime = pathname.includes('/anime/');
  return (
    <header className={cn(
      'flex items-center justify-between left-0 right-0 top-0 z-[999] bg-gradient-to-b from-background/80 to-background/0 px-4 lg:px-8 py-6 fade-in',
      {
        'fixed': hasAnime,
        'sticky': !hasAnime
      }
    )}>
      <div className="flex gap-8 items-center">
        <h1 className="text-2xl select-none">
          <Link href="/">Mochi.</Link>
        </h1>
        <div className="hidden lg:flex gap-4">
          <Link
            href="/search"
            className="transition-colors hover:text-muted-foreground"
          >
            Discover
          </Link>
          <Link
            href="#"
            className="transition-colors text-muted-foreground cursor-not-allowed hover:text-muted-foreground"
          >
            Schedule
          </Link>
          <Link
            href="#"
            className="transition-colors text-muted-foreground cursor-not-allowed hover:text-muted-foreground"
          >
            News
          </Link>
          <Link
            href="#"
            className="transition-colors text-muted-foreground cursor-not-allowed hover:text-muted-foreground"
          >
            Community
          </Link>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <SearchDialog />
        <SignedOut>
          <div className="gap-2 flex">
            <Link href={"/join"}>
              <Button variant="secondary" className="hidden sm:block">
                Become a Member
              </Button>
            </Link>
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          {me.user ? (
            <>
              <NotificationsDialog userid={me.user.id} />
              <LibraryDialog />
              <AvatarDialog user={me.user} />
            </>
          ) : (
            <>
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </>
          )}
        </SignedIn>
      </div>
    </header>
  );
}
