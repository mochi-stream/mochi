import webPush from "web-push";

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_KEY || "",
  privateKey: process.env.PRIVATE_VAPID_KEY || "",
};

webPush.setVapidDetails(
  "mailto:push@domain.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export default webPush;