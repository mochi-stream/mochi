"use client";

import { useEffect, useState } from "react";

import ProfileHeader from "./_components/header";

import { getUserByUsername } from "@/lib/user";
import { notFound } from "next/navigation";

import { User } from "@prisma/client";

interface UserPageProps {
  params: {
    username: string;
  };
}

export default function UserPage({ params }: UserPageProps) {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) notFound();

  return (
    <div className="flex w-full px-4 lg:px-8 py-6">
      <ProfileHeader user={user} />
    </div>
  );
}
