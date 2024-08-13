/**
 * The root layout for the application. This wraps all pages in a global
 * theme provider, clerk provider, and header.
 */

import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes';

import { UserProvider } from "./_components/context";

import ApolloWrapper from "./_components/apollo";

import Header from "./_components/header";
import Footer from "./_components/footer";

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
        <ClerkProvider appearance={{
          baseTheme: dark
        }}>
          <ApolloWrapper>
            <UserProvider>
              <div className="relative flex flex-col min-h-screen">
                <NextTopLoader
                  color="#ffffff"
                  showSpinner={false}
                  height={2}
                />
                <Header />
                {children}
                <Toaster position="bottom-center" duration={3000} />
                <Footer />
              </div>
            </UserProvider>
          </ApolloWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
}
