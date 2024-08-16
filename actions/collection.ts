import { changeCollection, deleteCollection } from "@/services/collection";
import { toast } from "sonner";
import { Status } from "@prisma/client";

export async function onChangeCollection({
  animeId,
  userId,
  status,
}: {
  animeId: string;
  userId: string;
  status: Status;
}) {
  try {
    const collection = await changeCollection({ animeId, userId, status });
    toast.success("Collection updated.");
    return collection;
  } catch (error) {
    toast.error("Failed to change collection. Please try again later.");
    throw error;
  }
}

export async function onDeleteCollection({
  animeId,
  userId,
}: {
  animeId: string;
  userId: string;
}) {
  try {
    await deleteCollection(animeId, userId);
    toast.success("Anime removed from deleted.");
    return;
  } catch (error) {
    toast.error("Failed to delete collection. Please try again later.");
    throw error;
  }
}
