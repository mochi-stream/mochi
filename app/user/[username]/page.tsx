/**
 * UserPage component represents the user profile page.
 * It fetches the user data based on the provided username and renders the profile header and activity components.
 */

"use client";

import { useEffect, useState } from "react";

import { ProfileHeader, ProfileHeaderSkeleton } from "./_components/header";
// import Activity from "./_components/activity";
import Bio from "./_components/bio";
import Collection from "./_components/collection";

import { getUserByUsername } from "@/lib/user";
import { notFound } from "next/navigation";

import { ProfileUser } from "@/types/user";

import { useUser } from "@/app/_components/context";

interface UserPageProps {
  params: {
    username: string;
  };
}

export default function UserPage({ params }: UserPageProps) {
  // Get the currently logged in user
  const me = useUser();

  // State variables to store the user data, loading status, and error
  const [user, setUser] = useState<ProfileUser | null>(null);
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

  // Set the page title
  useEffect(() => {
    if (user) {
      document.title = `@${user.username} | Mochi`;
    }
  }, [user]);

  // Render appropriate content based on the loading, error, and user states
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (loading) {
    return (
      <div className="flex flex-col w-full py-6">
        <ProfileHeaderSkeleton />
      </div>
    );
  }
  if (!user) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col w-full">
        {/* Render the profile header with the user data */}
        <ProfileHeader user={user} />
        {/* Render the activity component */}
        {/* <Activity /> */}
        {user.bio && (
          <div className="grid grid-cols-12 gap-8 w-full p-8 lg:px-12">
            <div className="col-span-8">
              <Bio content={user.bio} />
            </div>
          </div>
        )}
        <Collection />
      </div>
    </>
  );
}
