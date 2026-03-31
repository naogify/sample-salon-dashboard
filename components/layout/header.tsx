"use client";

import { usePathname } from "next/navigation";
import { Store } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";

function getPageTitle(pathname: string): string {
  if (pathname === "/") return "ダッシュボード";
  const item = NAV_ITEMS.find(
    (nav) => nav.href !== "/" && pathname.startsWith(nav.href)
  );
  return item?.label ?? "";
}

export function Header() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 pl-14 md:px-6">
      <h1 className="text-lg font-bold text-foreground">{title}</h1>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm text-muted-foreground">
          <Store className="h-4 w-4" />
          <span>all</span>
        </div>

        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
          YM
        </div>
      </div>
    </header>
  );
}
