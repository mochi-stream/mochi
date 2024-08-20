"use client";

import { ApolloProvider } from "@apollo/client";
import { useEffect, useState } from "react";
import { apolloClient, initializeApolloClient } from "@/lib/apolloClient";

export default function ApolloWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const setupClient = async () => {
      await initializeApolloClient();
      setIsReady(true);
    };

    setupClient();
  }, []);

  if (!isReady) return null; // or a loading spinner

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}