import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { User } from "@prisma/client";

export default function ProfileHeader({ user }: { user: User }) {
  return (
    <div className="flex items-center space-x-4 p-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src={user.imageUrl} alt="User Avatar" />
        <AvatarFallback className="text-lg">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="pr-4 flex flex-row gap-6">
        <div className="flex flex-col">
          <p className="font-semibold text-lg">{user.username}</p>
          <p className="text-sm text-gray-400">@{user.username}</p>
          <p className="text-sm text-gray-400 mt-1">
            8 Followers · 20 Following
          </p>
        </div>
        <Button className="ml-auto mt-auto">Follow</Button>
      </div>
    </div>
  );
}
