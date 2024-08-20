import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AddToCollection as AddToCollectionType } from "@/types/anime";
import sanitizeHtml from "sanitize-html";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/app/_components/context";
import { Status } from "@prisma/client";
import { onChangeCollection, onDeleteCollection } from "@/actions/collection";
import { getCollection } from "@/services/collection";
import { Loader, Trash } from "lucide-react";

// Map Status enums to user-friendly strings
const statusLabels: { [key in Status]: string } = {
  [Status.ON_HOLD]: "On Hold",
  [Status.COMPLETED]: "Completed",
  [Status.DROPPED]: "Dropped",
  [Status.PLAN_TO_WATCH]: "Planning",
  [Status.WATCHING]: "Watching",
};

export default function AddToCollection({
  anime,
  shownAddToCollection,
  setShownAddToCollection,
}: {
  anime: AddToCollectionType;
  shownAddToCollection: boolean;
  setShownAddToCollection: (value: boolean) => void;
}) {

  const [noExistingCollection, setNoExistingCollection] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [collection, setCollection] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { isAuthenticated, user } = useUser();

  useEffect(() => {
    if (user?.id && isAuthenticated) {
      (async () => {
        try {
          setIsFetching(true);
          setSelectedStatus("");
          const fetchedCollection = await getCollection(user.id, anime.id);
          setNoExistingCollection(
            !fetchedCollection || fetchedCollection.status === null
          );
          setCollection(fetchedCollection?.status || null);
          setSelectedStatus(fetchedCollection?.status || "");
        } finally {
          setIsFetching(false);
        }
      })();
    }
  }, [user, anime.id]);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handleUpdateCollection = async () => {
    if (user?.id && selectedStatus && selectedStatus !== collection) {
      setIsUpdating(true);
      try {
        await onChangeCollection({
          animeId: anime.id,
          userId: user.id,
          status: selectedStatus as Status,
        });
        setCollection(selectedStatus as Status);
        toast.success("Collection updated successfully.");
        setShownAddToCollection(false);
      } catch (error) {
        toast.error("Failed to update collection. Please try again later.");
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleDeleteCollection = async () => {
    if (user?.id && collection) {
      setIsUpdating(true);
      try {
        await onDeleteCollection({
          animeId: anime.id,
          userId: user.id,
        });
        setCollection(null);
        toast.success("Collection deleted successfully.");
        setShownAddToCollection(false);
      } catch (error) {
        toast.error("Failed to delete collection. Please try again later.");
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const sanitizedDescription = sanitizeHtml(anime.description || "", {
    allowedTags: [],
    allowedAttributes: {},
  });
  const trimmedDescription =
    sanitizedDescription.length > 150
      ? `${sanitizedDescription.substring(0, 150)}...`
      : sanitizedDescription;

  return (
    <Dialog open={shownAddToCollection} onOpenChange={setShownAddToCollection}>
      {isAuthenticated ? (
        <DialogContent>
          <h2 className="text-xl">
            {noExistingCollection
              ? "Add to Collection"
              : "Update Collection"}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Image
                src={anime.coverImage}
                alt={anime.title}
                width={300}
                height={300}
                className="rounded-md"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-1">
              <div>
                <h2 className="text-xl font-semibold">{anime.title}</h2>
                <p className="text-sm text-muted-foreground">{trimmedDescription}</p>
              </div>
              <div className="mt-2 flex flex-col gap-2">
                <Select
                  value={selectedStatus || ""}
                  disabled={isFetching || isUpdating}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Status).map((status) => (
                      <SelectItem key={status} value={status}>
                        {statusLabels[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex w-full justify-between gap-2">
                  <Button
                    onClick={handleUpdateCollection}
                    disabled={isFetching || isUpdating}
                    className="w-full"
                  >
                    {noExistingCollection ? "Add to Collection" : "Update Collection"}
                    {isFetching || isUpdating && <Loader className="h-4 w-4 ml-2 animate-spin" />}
                  </Button>
                  <Button variant={"ghost"} size={"icon"} onClick={handleDeleteCollection}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to add anime to your watch list.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex custom-dialog-footer items-center">
            <div className="flex justify-end space-x-2">
              <div className="gap-2 flex">
                <Button onClick={() => setShownAddToCollection(false)} variant="ghost">
                  Close
                </Button>
                <Link href={"/login"}>
                  <Button>Login</Button>
                </Link>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
