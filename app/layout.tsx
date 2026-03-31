import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "#She nail & eyelash POS",
  description: "Salon POS Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-background text-foreground antialiased">
        <Sidebar />
        <div className="md:ml-60 min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 p-4 pt-16 md:p-6 md:pt-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
