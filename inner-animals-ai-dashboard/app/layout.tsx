import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { QueryProvider } from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Inner Animals AI Platform",
  description: "Complete AI/ML Operations Dashboard for Enterprise Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-body antialiased bg-neural-dark text-white">
        <QueryProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
