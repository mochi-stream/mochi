import { NextRequest } from "next/server";

import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";

type PushSubscriptionKeys = {
  p256dh: string;
  auth: string;
};

type PushSubscription = {
  endpoint: string;
  keys: PushSubscriptionKeys;
};

export async function POST(req: NextRequest) {
  try {
    const subscription = (await req.json()) as PushSubscription;

    const { userId } = getAuth(req);

    if (!userId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "User not authenticated",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Save subscription to the database
    await db.pushSubscription.create({
      data: {
        endpoint: subscription.endpoint,
        keys: subscription.keys,
        userId,
      },
    });

    return new Response(JSON.stringify({ message: "Subscription saved." }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to save subscription:", error);
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
