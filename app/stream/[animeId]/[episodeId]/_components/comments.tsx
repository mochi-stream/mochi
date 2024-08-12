import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, FlagIcon, ReplyIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { getEpisodeComments } from "@/services/comments";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@/app/_components/context";

interface Comment {
    id: string;
    content: string;
    createdAt: Date;
    user?: {
        username: string;
        imageUrl: string;
    };
    likes: number;
    dislikes: number;
    replies: Comment[];
}

// export default function Comments({ animeId, episodeId }: { animeId: string; episodeId: string }) {
//     const [comments, setComments] = useState<Comment[]>([]);
//     const [loading, setLoading] = useState(true);
//     const { user, isAuthenticated } = useUser()

export default function Comments({ animeId, episodeId }: { animeId: string; episodeId: string }) {
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchComments() {
            setLoading(true);
            const fetchedComments = await getEpisodeComments({ animeId, episodeId, limit: 10, page: 1 });
            setComments(fetchedComments);
            setLoading(false);
        }

        fetchComments();
    }, [animeId, episodeId]);

    return (
        <div className="grid gap-6">
            <h2 className="text-[1.4rem]">Comments</h2>
            <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Textarea placeholder="Write your comment" />
                <Button>Post</Button>
            </div>
            {loading ? (
                <div className="grid gap-6">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <div className="flex-1 grid gap-3">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id} className="text-sm flex items-start gap-4">
                        <Avatar className="w-10 h-10 border">
                            {comment.user ? (
                                <>
                                    <AvatarImage src={comment.user.imageUrl} alt={`@${comment.user.username}`} />
                                    <AvatarFallback>{comment.user.username.charAt(0).toUpperCase()}</AvatarFallback>
                                </>
                            ) : (
                                <AvatarFallback>U</AvatarFallback>
                            )}
                        </Avatar>
                        <div className="grid gap-1.5">
                            <div className="flex items-center gap-2">
                                <div className="font-semibold">{comment.user ? comment.user.username : "Unknown User"}</div>
                                <span className="select-none text-muted-foreground">•</span>
                                <div className="text-gray-500 text-xs dark:text-gray-400">
                                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                </div>
                            </div>
                            <div>{comment.content}</div>
                            <div className="flex items-center gap-6">
                                <Button variant="ghost" size="sm">
                                    <ThumbsUpIcon className="w-4 h-4 mr-2" />
                                    {comment.likes.length}
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <ThumbsDownIcon className="w-4 h-4 mr-2" />
                                    {comment.dislikes.length}
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
                            {comment.replies.length > 0 && (
                                <div className="ml-8 mt-4">
                                    {comment.replies.map((reply) => (
                                        <div key={reply.id} className="text-sm flex items-start gap-4">
                                            <Avatar className="w-10 h-10 border">
                                                {reply.user ? (
                                                    <>
                                                        <AvatarImage src={reply.user.imageUrl} alt={`@${reply.user.username}`} />
                                                        <AvatarFallback>{reply.user.username.charAt(0).toUpperCase()}</AvatarFallback>
                                                    </>
                                                ) : (
                                                    <AvatarFallback>U</AvatarFallback>
                                                )}
                                            </Avatar>
                                            <div className="grid gap-1.5">
                                                <div className="flex items-center gap-2">
                                                    <div className="font-semibold inline-flex items-center">
                                                        {reply.user ? reply.user.username : "Unknown User"}
                                                    </div>
                                                    <span className="select-none text-muted-foreground">•</span>
                                                    <div className="text-gray-500 text-xs dark:text-gray-400">
                                                        {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                                                    </div>
                                                </div>
                                                <div>{reply.content}</div>
                                                <div className="flex items-center gap-6">
                                                    <Button variant="ghost" size="sm">
                                                        <ThumbsUpIcon className="w-4 h-4 mr-2" />
                                                        {reply.likes.length}
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <ThumbsDownIcon className="w-4 h-4 mr-2" />
                                                        {reply.dislikes.length}
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
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
