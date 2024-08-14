import {
  createSubscription,
  deleteSubscription,
} from "@/services/subscriptions";

import { toast } from "sonner";

export async function subscribe({
  animeId,
  userId,
}: {
  animeId: string;
  userId: string;
}) {
  try {
    const subscription = await createSubscription({ animeId, userId });
    toast.success("Subscribed for updates.");
    return subscription;
  } catch (error) {
    toast.error("Failed to subscribe to anime. Please try again later.");
    throw error;
  }
}

export async function unsubscribe({
  animeId,
  userId,
}: {
  animeId: string;
  userId: string;
}) {
  try {
    await deleteSubscription({ animeId, userId });
    toast.success("Unsubscribed from updates.");
  } catch (error) {
    toast.error("Failed to unsubscribe from anime. Please try again later.");
    throw error;
  }
}
