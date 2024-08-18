import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { endpoint } = await req.json();

    if (!endpoint) {
      return new Response(
        JSON.stringify({ success: false, error: "Endpoint is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Delete the subscription from the database
    const result = await db.pushSubscription.deleteMany({
      where: {
        endpoint,
      },
    });

    if (result.count === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Subscription not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Unsubscribed successfully." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to unsubscribe:", error);
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
