export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center flex-1">
      {children}
    </div>
  );
}
