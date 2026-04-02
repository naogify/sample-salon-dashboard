"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Store } from "lucide-react";
import { NAV_ITEMS, STORES } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [selectedStore, setSelectedStore] = React.useState("all");

  const selectedStoreName =
    STORES.find((s) => s.id === selectedStore)?.name ?? "";

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 pl-14 md:px-6">
      <h1 className="text-lg font-bold text-foreground">{title}</h1>

      <div className="flex items-center gap-3">
        <Select value={selectedStore} onValueChange={setSelectedStore}>
          <SelectTrigger size="sm">
            <Store className="h-4 w-4 text-muted-foreground" />
            <SelectValue>{selectedStoreName}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {STORES.map((store) => (
              <SelectItem key={store.id} value={store.id} label={store.name}>
                {store.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
          YM
        </div>
      </div>
    </header>
  );
}
