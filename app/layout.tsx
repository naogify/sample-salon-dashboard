import type { Metadata } from "next";
import { LayoutShell } from "@/components/layout/layout-shell";
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
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
