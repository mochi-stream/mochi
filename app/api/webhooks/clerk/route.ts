/**
 * Handles Clerk webhooks.
 *
 * This API route is used to handle Clerk webhooks. It verifies the webhook using the
 * `svix` library and the `WEBHOOK_SECRET` environment variable. If the webhook is
 * valid, it will create, update or delete a user in the database based on the event
 * type.
 *
 * @param req - The request object.
 */

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  /**
   * The Clerk webhook secret.
   *
   * This environment variable is set in the Clerk dashboard and is used to verify
   * the webhook.
   */
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env"
    );
  }

  /**
   * The headers sent by Clerk.
   *
   * Clerk sends the following headers:
   * - `svix-id`: The ID of the webhook.
   * - `svix-timestamp`: The timestamp of the webhook.
   * - `svix-signature`: The signature of the webhook.
   */
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  /**
   * The payload of the webhook.
   *
   * The payload is a JSON object that contains the event data.
   */
  const payload = await req.json();
  const body = JSON.stringify(payload);

  /**
   * The webhook object.
   *
   * The webhook object is used to verify the webhook.
   */
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    /**
     * Verify the webhook.
     *
     * If the webhook is valid, it will return a `WebhookEvent` object.
     */
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return new Response("Error occured", {
      status: 400,
    });
  }

  /**
   * Handle the event.
   *
   * Based on the event type, it will create, update or delete a user in the
   * database.
   */
  const eventType = evt.type;
  if (eventType === "user.created") {
    await db.user.create({
      data: {
        email: payload.data.id,
        id: payload.data.id,
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  }
  if (eventType === "user.updated") {
    await db.user.update({
      where: {
        id: payload.data.id,
      },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  }
  if (eventType === "user.deleted") {
    await db.user.delete({
      where: {
        id: payload.data.id,
      },
    });
  }

  return new Response("", { status: 200 });
}
