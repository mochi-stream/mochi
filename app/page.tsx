"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// import Spotlight from "./_components/spotlight";
import Trending from "./_components/trending";
import Popular from "./_components/popular";
// import Upcoming from "./_components/upcoming";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/search");
  }, [router]);
  return (
    <div>
      {/* <Spotlight /> */}
      <Trending />
      <Popular />
      {/* <Upcoming /> */}
    </div>
  );
}
