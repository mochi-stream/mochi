/**
 * ProfileHeader component displays the user's profile information.
 *
 * @param {Object} props - The component props.
 * @param {User} props.user - The user object containing the user's information.
 */ 

import { useEffect, useState } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { User } from "@prisma/client";

import { Actions } from "./actions";

import { useAuth } from "@clerk/nextjs";

import { getFollowersCount, getFollowingsCount } from "@/services/follow";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileHeader({ user }: { user: User }) {
  // Get the user's ID from Clerk
  const { userId } = useAuth();

  // State variables to store the user's followers and followings counts
  const [followersCount, setFollowersCount] = useState<number>(-1);
  const [followingsCount, setFollowingsCount] = useState<number>(-1);

  // Fetch the followers and followings counts on component mount
  useEffect(() => {
    if (!user.id) return;
    getFollowersCount(user.id).then(setFollowersCount);
    getFollowingsCount(user.id).then(setFollowingsCount);
  }, [user.id]);

  // Render the user's profile information
  return (
    <div className="flex items-center space-x-4 py-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src={user.imageUrl} alt="User Avatar" />
        <AvatarFallback className="text-lg">
          {user.username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="pr-4 flex flex-row gap-6">
        <div className="flex flex-col">
          <p className="font-semibold text-lg">@{user.username}</p>
          {followersCount > -1 && followingsCount > -1 ? (
            <p className="text-sm text-gray-400 mt-2">
              {followersCount} Followers · {followingsCount} Following
            </p>
          ) : (
            <Skeleton className="h-4 w-40 mt-2" />
          )}
        </div>
        {userId && userId === user.externalUserId ? (
          <></>
        ) : (
          <Actions profileId={user.id} />
        )}
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
    <div className="flex items-center space-x-4 py-4">
      <Avatar className="w-24 h-24">
        <Skeleton className="w-full h-full" />
      </Avatar>
      <div className="pr-4 flex flex-col">
        <Skeleton className="h-4 w-60" />
        <Skeleton className="h-4 w-40 mt-2" />
      </div>
    </div>
  );
}
