import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Check,
    FlagIcon,
    Loader,
    ReplyIcon,
    ThumbsDownIcon,
    ThumbsUpIcon,
    ArrowDown, ArrowUp
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { getEpisodeComments, createComment as createCommentService } from "@/services/comments";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@/app/_components/context";
import Link from "next/link";
import { toast } from "sonner";
import { Comment } from "@/types/anime";

export default function Comments({
    animeId,
    episodeId,
}: {
    animeId: string;
    episodeId: string;
}) {
    const quantity = 3;

    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [commentContent, setCommentContent] = useState("");
    const { user, isAuthenticated } = useUser();
    const [posting, setPosting] = useState(false);

    const [isExpanded, setIsExpanded] = useState(false);
    const displayedList = isExpanded ? comments : comments?.slice(0, quantity);
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };


    useEffect(() => {
        async function fetchComments() {
            setLoading(true);
            try {
                const fetchedComments = await getEpisodeComments({
                    animeId,
                    episodeId,
                    limit: 10,
                    page: 1,
                });
                setComments(fetchedComments);
            } catch (error) {
                toast.error("Failed to load comments. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchComments();
    }, [animeId, episodeId]);

    async function handlePostComment() {
        setPosting(true);
        if (!isAuthenticated || !user?.id) {
            toast.error("You must be logged in to post a comment.");
            return;
        }

        if (commentContent.trim() === "") {
            toast.error("Comment content cannot be empty.");
            return;
        }

        try {
            const newComment = await createCommentService({
                animeId,
                episodeId,
                content: commentContent,
                userId: user.id,
                username: user.username,
                imageUrl: user.imageUrl,
            });

            // Update comments list with new comment
            setComments([newComment, ...comments]);
            setCommentContent(""); // Clear the textarea
            toast.success("Comment posted successfully!");
        } catch (error) {
            toast.error("Failed to post comment. Please try again.");
        } finally {
            setPosting(false);
        }
    }

    return (
        <div className="grid gap-6">
            <h2 className="text-[1.4rem]">Comments</h2>
            {isAuthenticated && (
                <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                        <AvatarImage src={user?.imageUrl} alt="@user" />
                        <AvatarFallback>
                            {user?.username && user?.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <Textarea
                        value={commentContent}
                        disabled={posting}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Write your comment"
                    />
                    <Button onClick={handlePostComment} className="mt-2" disabled={posting}>
                        {posting ? <><Loader className="h-3 w-3 animate-spin mr-2" />Posting</> : 'Post'}
                    </Button>
                </div>
            )}
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
            ) : comments.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm">
                    No comments yet, Be the first one?
                </div>
            ) : (
                <>
                    <div className="relative">
                        {displayedList.map((comment) => (
                            <div key={comment.id} className="text-sm flex items-start gap-4">
                                <Avatar className="w-10 h-10 border">
                                    {comment.user ? (
                                        <>
                                            <Link href={`/u/${comment.user.username}`}>
                                                <AvatarImage
                                                    src={comment.user.imageUrl}
                                                    alt={`@${comment.user.username}`}
                                                />
                                            </Link>
                                            <AvatarFallback>
                                                {comment.user.username.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </>
                                    ) : (
                                        <AvatarFallback>U</AvatarFallback>
                                    )}
                                </Avatar>
                                <div className="grid gap-1.5">
                                    <div className="flex items-center gap-2">
                                        <div className="font-semibold">
                                            <Link
                                                href={`/u/${comment.user ? comment.user.username : "u/unknown"}`}
                                            >
                                                @{comment.user ? comment.user.username : "unknown"}
                                            </Link>
                                        </div>
                                        <span className="select-none text-muted-foreground">•</span>
                                        <div className="text-gray-500 text-xs dark:text-gray-400">
                                            {formatDistanceToNow(new Date(comment.createdAt), {
                                                addSuffix: true,
                                            })}
                                        </div>
                                    </div>
                                    <div>{comment.content}</div>
                                    <div className="flex items-center gap-6">
                                        <Button variant="ghost" size="sm">
                                            <ThumbsUpIcon className="w-4 h-4 mr-2" />
                                            {comment.likesCount}
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <ThumbsDownIcon className="w-4 h-4 mr-2" />
                                            {comment.dislikesCount}
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
                                                <div
                                                    key={reply.id}
                                                    className="text-sm flex items-start gap-4"
                                                >
                                                    <Avatar className="w-10 h-10 border">
                                                        {reply.user ? (
                                                            <>
                                                                <Link href={`/u/${reply.user.username}`}>
                                                                    <AvatarImage
                                                                        src={reply.user.imageUrl}
                                                                        alt={`@${reply.user.username}`}
                                                                    />
                                                                </Link>
                                                                <AvatarFallback>
                                                                    {reply.user.username.charAt(0).toUpperCase()}
                                                                </AvatarFallback>
                                                            </>
                                                        ) : (
                                                            <AvatarFallback>U</AvatarFallback>
                                                        )}
                                                    </Avatar>
                                                    <div className="grid gap-1.5">
                                                        <div className="flex items-center gap-2">
                                                            <div className="font-semibold inline-flex items-center">
                                                                <Link
                                                                    href={`/u/${reply.user ? reply.user.username : "u/unknown"}`}
                                                                >
                                                                    @
                                                                    {reply.user
                                                                        ? reply.user.username
                                                                        : "unknown"}
                                                                </Link>
                                                            </div>
                                                            <span className="select-none text-muted-foreground">
                                                                •
                                                            </span>
                                                            <div className="text-gray-500 text-xs dark:text-gray-400">
                                                                {formatDistanceToNow(new Date(reply.createdAt), {
                                                                    addSuffix: true,
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div>{reply.content}</div>
                                                        <div className="flex items-center gap-6">
                                                            <Button variant="ghost" size="sm">
                                                                <ThumbsUpIcon className="w-4 h-4 mr-2" />
                                                                {reply.likesCount}
                                                            </Button>
                                                            <Button variant="ghost" size="sm">
                                                                <ThumbsDownIcon className="w-4 h-4 mr-2" />
                                                                {reply.dislikesCount}
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
                        ))}
                        {!isExpanded && (
                            <div className="absolute inset-0 bg-gradient-to-t from-10% from-background via-[transparent] to-transparent opacity-90 rounded-lg pointer-events-none"></div>
                        )}

                    </div>

                    {comments.length > quantity && (
                        <div className="flex justify-center mt-4 w-full">
                            <Button
                                onClick={toggleExpanded}
                                variant={"secondary"}
                                className="flex items-center"
                            >
                                <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
                                {isExpanded ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="h-4 w-4 ml-1" />}
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
