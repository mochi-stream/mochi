import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

export default function ProfileHeader() {
  return (
    <div className="flex items-center space-x-4 p-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src="/path/to/image.png" alt="User Avatar" />{" "}
        <AvatarFallback className="text-lg">A</AvatarFallback>
      </Avatar>
      <div className="pr-4 flex flex-row gap-6">
        <div className="flex flex-col">
          <p className="font-semibold text-lg">Winter</p>
          <p className="text-sm text-gray-400">@winter</p>
          <p className="text-sm text-gray-400 mt-1">
            8 Followers · 20 Following
          </p>
        </div>
        <Button className="ml-auto mt-auto">Follow</Button>{" "}
      </div>
    </div>
  );
}
