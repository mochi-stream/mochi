"use client";

import { toast } from "sonner";

import Player from "@/components/anime/player";
import useNetworkStatus from "@/app/_components/networkstatus";

export default function WatchPage() {
  const { isOnline } = useNetworkStatus();

  if (!isOnline) {
    toast.error("You are offline. Please connect to the internet.");
  }

  return (
    <div className="grid grid-cols-12 gap-4 py-6 px-6 lg:px-12">
      <div className="col-span-8">
        <Player
        // title="test"
        // src="https://www032.vipanicdn.net/streamhls/391c75f71441aa24bd03e1c9184f63ee/ep.1.1709555216.1080.m3u8"
        />
      </div>
    </div>
  );
}
