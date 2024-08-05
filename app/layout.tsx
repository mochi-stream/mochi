/**
 * The root layout for the application. This wraps all pages in a global
 * theme provider, clerk provider, and header.
 */

import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { UserProvider } from "./_components/context";

import ApolloWrapper from "./_components/apollo";

import Header from "./_components/header";
import NextTopLoader from "nextjs-toploader";

import { Toaster } from "sonner";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Stream Your Favorite Anime Ad-free - Mochi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-aeonik">
          <ClerkProvider>
            <ApolloWrapper>
              <UserProvider>
                <div className="relative">
                  <NextTopLoader
                    color="#ffffff"
                    showSpinner={false}
                    height={2}
                  />
                  <Header />
                  <Toaster position="bottom-center" />
                  {children}
                </div>
              </UserProvider>
            </ApolloWrapper>
          </ClerkProvider>
      </body>
    </html>
  );
}
