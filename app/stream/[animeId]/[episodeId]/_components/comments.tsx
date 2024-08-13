// TODO: Sort from DB

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Check,
  FlagIcon,
  Loader,
  ReplyIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  ArrowDown,
  ArrowUp,
  TrashIcon,
  ArrowDownUp,
  PencilIcon,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  getEpisodeComments,
  createComment as createCommentService,
} from "@/services/comments";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNowStrict } from "date-fns";
import { useUser } from "@/app/_components/context";
import Link from "next/link";
import { toast } from "sonner";
import { Comment } from "@/types/anime";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { onDeleteComment } from "@/actions/comment";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

export default function Comments({
  animeId,
  episodeId,
}: {
  animeId: string;
  episodeId: string;
}) {
  const quantity = 3;

  const [sortOption, setSortOption] = useState<'newest' | 'oldest'>('newest');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState("");
  const { user, isAuthenticated } = useUser();
  const [posting, setPosting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State for showing the emoji picker

  const [isExpanded, setIsExpanded] = useState(false);
  const displayedList = isExpanded ? comments : comments?.slice(0, quantity);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSortChange = (value: string) => {
    // Use a type assertion to safely cast the value
    const sortOption = value as 'newest' | 'oldest';

    if (sortOption === 'newest' || sortOption === 'oldest') {
      setSortOption(sortOption);
      const sortedComments = [...comments].sort((a, b) => {
        if (sortOption === 'newest') {
          return b.createdAt.getTime() - a.createdAt.getTime();
        } else {
          return a.createdAt.getTime() - b.createdAt.getTime();
        }
      });
      setComments(sortedComments);
    }
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
    if (!isAuthenticated || !user?.id) {
      toast.error("You must be logged in to post a comment.");
      return;
    }

    if (commentContent.trim() === "") {
      toast.error("Comment content cannot be empty.");
      return;
    }

    // Regular expression to detect URLs in the comment content
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    if (urlRegex.test(commentContent)) {
      toast.error("Links are not allowed in comments.");
      return;
    }

    setPosting(true);
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

  const handleKeyDown = (e: {
    ctrlKey: any;
    key: string;
    preventDefault: () => void;
  }) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      handlePostComment();
    }

    if (e.key === "Escape" && showEmojiPicker) {
      setShowEmojiPicker(false);
    }


    if (e.ctrlKey && e.key === "e") {
      e.preventDefault();
      setShowEmojiPicker(!showEmojiPicker);
    }

  };

  const onEmojiClick = (e: { native: string }) => {
    setCommentContent((prev) => prev + e.native);
  };

  const handleDeleteComment = async (commentId: string) => {
    try {

      if (!isAuthenticated || !user?.id) {
        toast.error("Action Forbidden");
        return;
      }

      // Call the deleteComment service
      toast.promise(
        onDeleteComment({ commentId, userId: user.id })
          .then(() =>
            setComments(comments.filter((comment) => comment.id !== commentId))
          ),
        {
          loading: 'Deleting...',
          success: () => "Comment deleted successfully!",
          error: "Failed to delete comment. Please try again.",
        }
      );
    } catch (error) {
      toast.error("Failed to delete comment. Please try again.");
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[1.4rem]">Comments</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="shrink-0">
              <ArrowDownUp className="w-4 h-4 mr-2" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]" align="end">
            <DropdownMenuRadioGroup value={sortOption} onValueChange={handleSortChange}>
              <DropdownMenuRadioItem value="newest">
                Newest
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">
                Oldest
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isAuthenticated && (
        <div className="flex gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src={user?.imageUrl} alt="@user" />
            <AvatarFallback>
              {user?.username && user?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow relative">
            <Textarea
              value={commentContent}
              disabled={posting}
              onKeyDown={handleKeyDown}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write your comment"
            />
            <Button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-0 top-0 mt-2 mr-2"
              variant="ghost"
            >
              😊
            </Button>

            {showEmojiPicker && (
              <div className="absolute right-0 top-12 z-[99]">
                <Picker
                  data={data}
                  onEmojiSelect={onEmojiClick}
                  onClickOutside={() => setShowEmojiPicker(false)}
                  theme="dark"
                  onKeyDown={handleKeyDown}
                />
              </div>
            )}
          </div>
          <Button
            onClick={handlePostComment}
            className="mt-2"
            disabled={posting}
          >
            {posting ? (
              <>
                <Loader className="h-3 w-3 animate-spin mr-2" />
                Posting
              </>
            ) : (
              "Post"
            )}
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
          <div className="relative grid gap-6">
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
                        href={`/u/${comment.user ? comment.user.username : "u/unknown"
                          }`}
                      >
                        @{comment.user ? comment.user.username : "unknown"}
                      </Link>
                    </div>
                    <span className="select-none text-muted-foreground">•</span>
                    <div className="text-gray-500 text-xs dark:text-gray-400">
                      {formatDistanceToNowStrict(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                    {new Date(comment.updatedAt) >
                      new Date(comment.createdAt) ? (
                      <span className="text-gray-500 text-xs dark:text-gray-400">
                        Edited
                      </span>
                    ) : null}
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
                    {comment.userId === user?.id ? (
                      <>
                        <Button variant="ghost" size="sm">
                          <PencilIcon className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          className="text-red-400"
                          size="sm"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <TrashIcon className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </>
                    ) : (
                      <Button variant="ghost" size="sm">
                        <FlagIcon className="w-4 h-4 mr-1" />
                        Report
                      </Button>
                    )}
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
                                  href={`/u/${reply.user
                                    ? reply.user.username
                                    : "u/unknown"
                                    }`}
                                >
                                  @
                                  {reply.user ? reply.user.username : "unknown"}
                                </Link>
                              </div>
                              <span className="select-none text-muted-foreground">
                                •
                              </span>
                              <div className="text-gray-500 text-xs dark:text-gray-400">
                                {formatDistanceToNowStrict(
                                  new Date(reply.createdAt),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </div>
                              {new Date(reply.updatedAt) >
                                new Date(reply.createdAt) ? (
                                <span className="text-gray-500 text-xs dark:text-gray-400">
                                  Edited
                                </span>
                              ) : null}
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
                              {reply.userId === user?.id ? (
                                <>
                                  <Button variant="ghost" size="sm">
                                    <PencilIcon className="w-4 h-4 mr-1" />
                                    Edit
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    className="text-red-400"
                                    size="sm"
                                  >
                                    <TrashIcon className="w-4 h-4 mr-1" />
                                    Delete
                                  </Button>
                                </>
                              ) : (
                                <Button variant="ghost" size="sm">
                                  <FlagIcon className="w-4 h-4 mr-1" />
                                  Report
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {!isExpanded && comments.length > quantity && (
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
                <span>{isExpanded ? "Show Less" : "Show More"}</span>
                {isExpanded ? (
                  <ArrowUp className="ml-1 h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4 ml-1" />
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
