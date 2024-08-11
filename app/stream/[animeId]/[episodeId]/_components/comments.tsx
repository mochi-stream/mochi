import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Check, FlagIcon, ReplyIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea"

export default function Comments() {
    return (<div className="grid gap-6">
        <h2 className="text-[1.4rem]">Comments</h2>
        <div className="flex gap-4">
            <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Textarea placeholder="Write your comment" />
            <Button>Post</Button>
        </div>
        <div className="text-sm flex items-start gap-4">
            <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="grid gap-1.5">
                <div className="flex items-center gap-2">
                    <div className="font-semibold">User</div>
                    <span className="select-none text-muted-foreground">•</span>
                    <div className="text-gray-500 text-xs dark:text-gray-400">3 days ago</div>
                </div>
                <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, est quod officia error dolore sequi rem voluptatum? Nam, perspiciatis fuga!</div>
                <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm">
                        <ThumbsUpIcon className="w-4 h-4 mr-2" />
                        14
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
                <div className="ml-8 mt-4">
                    <div className="text-sm flex items-start gap-4">
                        <Avatar className="w-10 h-10 border">
                            <AvatarImage src="/placeholder-user2.jpg" alt="@anotheruser" />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1.5">
                            <div className="flex items-center gap-2">
                                <div className="font-semibold inline-flex items-center">Another User <Check className="h-3 w-3 ml-2" /></div>
                                <span className="select-none text-muted-foreground">•</span>
                                <div className="text-gray-500 text-xs dark:text-gray-400">2 days ago</div>
                            </div>
                            <div>@user Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum labore officia doloribus tempore fugit laudantium eligendi officiis! Dolorum, ut ullam.</div>
                            <div className="flex items-center gap-6">
                                <Button variant="ghost" size="sm">
                                    <ThumbsUpIcon className="w-4 h-4 mr-2" />
                                    3
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
                </div>
            </div>
        </div>
    </div>);
}