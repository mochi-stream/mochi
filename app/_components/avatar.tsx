/**
 * A component that displays the user's avatar and a dropdown menu with various
 * actions related to the user.
 *
 * @param user - The user object containing the user's information.
 * @returns The AvatarDialog component.
 */

"use client";

import Link from "next/link";

import { ClerkUser } from "@/types/user";
import { useClerk } from "@clerk/nextjs";

import { CloudIcon, UserCircle, LogOutIcon, SettingsIcon, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { toast } from "sonner";

import { useUser } from "./context";

export default function AvatarDialog({ user }: { user: ClerkUser }) {

  const { isAuthenticated } = useUser();

  const { signOut } = useClerk();
  const toastShow = () => {
    toast.promise(async () => {
      await signOut();
      window.location.reload();
    }, {
      loading: "You are being signed out",
      success: "You have been signed out",
      error: "Failed to sign out",
      duration: 2000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage src={user.imageUrl} alt={`@${user.username}`} />
          <AvatarFallback>
            {user.username && user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px] p-4 space-y-2 mt-2 mr-4">
        <DropdownMenuLabel>{`@${user.username}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col space-y-2">
          <Link href={`/user/${user.username}`}>
            <DropdownMenuItem>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href={`/settings`}>
            <DropdownMenuItem>
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <CloudIcon className="mr-2 h-4 w-4" />
          <span>MAL Sync</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-400" onClick={toastShow}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
