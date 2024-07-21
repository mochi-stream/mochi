"use client";

import { toast } from "sonner";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { onFollow, onUnfollow } from "@/actions/follow";
import { isFollowingUser } from "@/services/follow";

import { useAuth } from "@clerk/nextjs";

interface ActionsProps {
  profileId: string;
}

export function Actions({ profileId }: ActionsProps) {
  const { userId } = useAuth();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (userId === profileId) return setIsFollowing(false);
    async function fetchIsFollowing() {
      const isFollowing = await isFollowingUser(profileId);
      setIsFollowing(isFollowing);
    }
    fetchIsFollowing();
  }, [userId, profileId]);

  function handleFollow() {
    startTransition(() => {
      onFollow(profileId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch((error) => toast.error(error.message));
    });
  }
  function handleUnfollow() {
    startTransition(() => {
      onUnfollow(profileId)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch((error) => toast.error(error.message));
    });
  }
  function toggleFollow() {
    if (!userId) {
      return router.push("/sign-in");
    }
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  }
  return (
    <Button
      disabled={isPending}
      onClick={toggleFollow}
      variant="default"
      size="sm"
      className="w-full lg:w-auto"
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}

export function ActionsSkeleton() {
  return <Skeleton className="h-10 w-full lg:w-24" />;
}
