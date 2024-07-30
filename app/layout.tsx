/**
 * The root layout for the application. This wraps all pages in a global
 * theme provider, clerk provider, and header.
 */

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";

import { ClerkProvider } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import { UserProvider } from "./_components/context";

import ApolloWrapper from "./_components/apollo";

import Header from "./_components/header";
import NextTopLoader from "nextjs-toploader";

import { Toaster } from "sonner";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={{
              baseTheme: dark,
            }}
          >
            <ApolloWrapper>
              {/* <SignedIn>
                <UserProvider>
                  <div className="relative">
                    <NextTopLoader
                      color="#ffffff"
                      showSpinner={false}
                      height={2}
                    />
                    <Header />
                    <Toaster />
                    <div className="absolute inset-0 bg-purple-950 bg-[size:20px_20px] opacity-15 blur-[100px] -z-50"></div>
                    {children}
                  </div>
                </UserProvider>
              </SignedIn>
              <SignedOut>
                <div className="relative">
                  <NextTopLoader
                    color="#ffffff"
                    showSpinner={false}
                    height={2}
                  />
                  <Header />
                  <Toaster /> */}
                  <div className="absolute inset-0 bg-purple-950 bg-[size:20px_20px] opacity-15 blur-[100px] -z-50"></div>
                  {children}
                {/* </div>
              </SignedOut> */}
            </ApolloWrapper>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
