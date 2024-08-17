import webPush from "@/lib/web-push";
import { db } from "@/lib/db";

type PushSubscriptionKeys = {
  p256dh: string;
  auth: string;
};

type PushSubscription = {
  endpoint: string;
  keys: PushSubscriptionKeys;
};

export async function POST(req: Request) {
  try {
    const { userId, title, message } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "User not authenticated",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch subscriptions for the specific Clerk user
    const subscriptions = await db.pushSubscription.findMany({
      where: { userId },
    });

    const payload = JSON.stringify({
      title,
      message,
    });

    const notifications = subscriptions.map((subscription) => {
      const keys: PushSubscriptionKeys =
        subscription.keys as PushSubscriptionKeys; // Use directly

      const pushSubscription: PushSubscription = {
        endpoint: subscription.endpoint,
        keys,
      };

      return webPush.sendNotification(pushSubscription, payload);
    });

    await Promise.all(notifications);

    return new Response(JSON.stringify({ message: "Notifications sent." }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to send notifications:", error);
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
