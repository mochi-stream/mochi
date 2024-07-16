import type { Metadata } from "next";
import ProfileHeader from "./_components/header";

export const metadata: Metadata = {
  title: "Mochi | User",
  description: "Description",
};

export default function ProfilePage() {
  return (
    <div className="flex w-full px-4 lg:px-8 py-6">
      <ProfileHeader />
    </div>
  );
}
