"use client";

import { useEffect, useState } from "react";

import { ProfileHeader, ProfileHeaderSkeleton } from "./_components/header";
import Activity from "./_components/activity";

import { getUserByUsername } from "@/lib/user";
import { notFound } from "next/navigation";

import { User } from "@prisma/client";

import { useUser } from "@/app/_components/context";

interface UserPageProps {
  params: {
    username: string;
  };
}

export default function UserPage({ params }: UserPageProps) {
  const me = useUser();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserByUsername(params.username);
        setUser(fetchedUser);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.username]);

  if (error) return <div>Error: {error.message}</div>;
  if (loading)
    return (
      <div className="flex flex-col w-full px-6 lg:px-12 py-6">
        <ProfileHeaderSkeleton />
      </div>
    );
  if (!user) notFound();

  return (
    <div className="flex flex-col w-full px-6 lg:px-12 py-6">
      <ProfileHeader user={user} />
      <Activity />
    </div>
  );
}
