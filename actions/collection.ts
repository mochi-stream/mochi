import { changeCollection, deleteCollection } from "@/services/collection";
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
  const collection = await changeCollection({ animeId, userId, status });
  return collection;
}

export async function onDeleteCollection({
  animeId,
  userId,
}: {
  animeId: string;
  userId: string;
}) {
  await deleteCollection(animeId, userId);
  return;
}
