import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Authentication - Mochi",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-grow justify-center items-center flex-1">
      {children}
    </div>
  );
}
