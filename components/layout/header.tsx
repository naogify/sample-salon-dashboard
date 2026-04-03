"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Store, Bell, Moon, LogOut, User } from "lucide-react";
import { NAV_ITEMS, STORES } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [userName, setUserName] = React.useState("山田 美咲");
  const [userEmail, setUserEmail] = React.useState("yamada@salon.jp");
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const storeLabel = Object.fromEntries(STORES.map((s) => [s.id, s.name]));

  const initials = userName
    .split(/\s+/)
    .map((s) => s[0])
    .join("")
    .slice(0, 2);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 pl-16 md:px-6">
      <h1 className="text-lg font-bold text-foreground">{title}</h1>

      <div className="flex items-center gap-3">
        <Select value={selectedStore} onValueChange={(value) => { if (value !== null) setSelectedStore(value); }}>
          <SelectTrigger size="sm">
            <Store className="h-4 w-4 text-muted-foreground" />
            <SelectValue>
              {(value: string) => storeLabel[value] ?? value}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {STORES.map((store) => (
              <SelectItem key={store.id} value={store.id} label={store.name}>
                {store.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog>
          <DialogTrigger>
            <button
              className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="ユーザー設定を開く"
            >
              {initials}
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>ユーザー設定</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              {/* Profile section */}
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{userName}</p>
                  <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                </div>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  名前
                </label>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">メールアドレス</label>
                <Input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  className="flex items-center justify-between py-2 px-1 rounded-md hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => setNotifications(!notifications)}
                >
                  <span className="flex items-center gap-2 text-sm">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    通知
                  </span>
                  <span
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      notifications ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
                        notifications ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-between py-2 px-1 rounded-md hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  <span className="flex items-center gap-2 text-sm">
                    <Moon className="h-4 w-4 text-muted-foreground" />
                    ダークモード
                  </span>
                  <span
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      darkMode ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
                        darkMode ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </span>
                </button>
              </div>

              {/* Logout */}
              <div className="pt-2 border-t border-border">
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                  <LogOut className="h-4 w-4" />
                  ログアウト
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
