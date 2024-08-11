import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FlagIcon, ReplyIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

export default function Comments() {
    return (<div className="grid gap-6">
        <h2 className="text-[1.4rem]">Comments</h2>
        <div className="text-sm flex items-start gap-4">
            <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="grid gap-1.5">
                <div className="flex items-center gap-2">
                    <div className="font-semibold">@user</div>
                    <span className="select-none text-muted-foreground">•</span>
                    <div className="text-gray-500 text-xs dark:text-gray-400">5 months ago</div>
                </div>
                <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, est quod officia error dolore sequi rem voluptatum? Nam, perspiciatis fuga!</div>
                <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm">
                        <ThumbsUpIcon className="w-4 h-4 mr-2" />
                        1
                    </Button>
                    <Button variant="ghost" size="sm">
                        <ThumbsDownIcon className="w-4 h-4 mr-2" />
                        0
                    </Button>
                    <Button variant="ghost" size="sm">
                        <ReplyIcon className="w-4 h-4 mr-1" />
                        Reply
                    </Button>
                    <Button variant="ghost" size="sm">
                        <FlagIcon className="w-4 h-4 mr-1" />
                        Report
                    </Button>
                </div>
            </div>
        </div>
    </div>);
}