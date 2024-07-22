/**
 * ProfileHeader component displays the user's profile information.
 *
 * @param {Object} props - The component props.
 * @param {User} props.user - The user object containing the user's information.
 */

import Link from "next/link";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Actions } from "./actions";

import { useAuth } from "@clerk/nextjs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

import { ProfileUser } from "@/types/user";

import { Check } from "lucide-react";

export function ProfileHeader({ user }: { user: ProfileUser }) {
  // Get the user's ID from Clerk
  const { userId } = useAuth();

  // Render the user's profile information
  return (
    <div className="relative py-12 select-none">
      <div className="absolute inset-0 bg-cover bg-center opacity-75 bg-[url('https://s4.anilist.co/file/anilistcdn/media/anime/banner/153288-JNsWuMPMAuJL.jpg')]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-foreground opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-primary-foreground opacity-80"></div>
      <div className="relative z-10 flex flex-col space-y-4 lg:space-y-0 lg:flex-row items-center px-6 lg:px-12 space-x-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.imageUrl} alt="User Avatar" />
          <AvatarFallback className="text-lg">
            {user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="pr-4 flex flex-col gap-4 lg:flex-row lg:justify-between w-[60%] lg:w-full">
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center justify-center">
              <p className="font-semibold text-lg select-text">
                @{user.username}
              </p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="ml-2 h-6">
                      <Check className="w-4 h-4" />
                      <p className="text-xs ml-1">Staff</p>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This user is a staff member of Mochi</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-sm mt-2">
              {user.following.length} Followers · {user.followedBy.length}{" "}
              Followings
            </p>
          </div>
          {userId && userId === user.externalUserId ? (
            <Link href={`/settings/profile`}>
              <Button variant="default" size="sm" className="w-full lg:w-auto">
                Edit Profile
              </Button>
            </Link>
          ) : (
            <Actions profileId={user.id} />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * ProfileHeaderSkeleton component displays a skeleton version of the user's profile information.
 *
 * @returns {JSX.Element} - The skeleton component.
 */
export function ProfileHeaderSkeleton() {
  return (
    <div>
      <div className="flex items-center space-x-4 py-6 px-6 lg:px-12">
        <Avatar className="w-24 h-24">
          <Skeleton className="w-full h-full" />
        </Avatar>
        <div className="pr-4 flex flex-col">
          <Skeleton className="h-4 w-60" />
          <Skeleton className="h-4 w-40 mt-2" />
        </div>
      </div>
    </div>
  );
}
