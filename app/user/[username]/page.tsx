/**
 * UserPage component represents the user profile page.
 * It fetches the user data based on the provided username and renders the profile header and activity components.
 */

"use client";

import { useEffect, useState } from "react";

import { ProfileHeader, ProfileHeaderSkeleton } from "./_components/header";
import Activity from "./_components/activity";

import { getUserByUsername } from "@/lib/user";
import { notFound } from "next/navigation";

import { User } from "@prisma/client";

import { useUser } from "@/app/_components/context";

interface UserPageProps {
  /**
   * Object containing the username.
   */
  params: {
    username: string;
  };
}

export default function UserPage({ params }: UserPageProps) {
  // Get the currently logged in user
  const me = useUser();

  // State variables to store the user data, loading status, and error
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch the user data on component mount or when the username changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data by username
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

  // Render appropriate content based on the loading, error, and user states
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (loading) {
    return (
      <div className="flex flex-col w-full px-6 lg:px-12 py-6">
        <ProfileHeaderSkeleton />
      </div>
    );
  }
  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full px-6 lg:px-12 py-6">
      {/* Render the profile header with the user data */}
      <ProfileHeader user={user} />
      {/* Render the activity component */}
      <Activity />
    </div>
  );
}
