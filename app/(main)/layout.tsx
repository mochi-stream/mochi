import Header from "./_components/header";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NextTopLoader color="#ffffff" showSpinner={false} height={2} />
      <Header />
      <Toaster />
      {children}
    </div>
  );
}
