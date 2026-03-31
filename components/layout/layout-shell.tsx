"use client";

import { useState, useCallback } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      <div className="lg:ml-60 min-h-screen flex flex-col">
        <Header onMenuToggle={openSidebar} />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </>
  );
}
