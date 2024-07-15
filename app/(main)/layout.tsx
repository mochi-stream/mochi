import Header from "./_components/header";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <NextTopLoader color="#ffffff" showSpinner={false} height={2} />
      <Header />
      <Toaster />
      <div className="absolute inset-0 bg-purple-950 bg-[size:20px_20px] opacity-15 blur-[100px] -z-50"></div>
      {children}
    </div>
  );
}
