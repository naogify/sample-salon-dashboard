"use client";

import { useState, useMemo } from "react";
import { MenuSearch } from "@/components/pos/menu-search";
import { CategoryTabs } from "@/components/pos/category-tabs";
import { MenuGrid } from "@/components/pos/menu-grid";
import { Cart } from "@/components/pos/cart";
import { menuItems, staffList } from "@/lib/mock-data";
import type { Category, MenuItem } from "@/lib/types";

type CartItem = { menuItem: MenuItem; quantity: number };

export default function PosPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "すべて">("すべて");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "すべて" || item.category === activeCategory;
      const matchesSearch = search === "" || item.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === item.id);
      if (existing) return prev.map((ci) => ci.menuItem.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci);
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const removeFromCart = (menuItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.menuItem.id !== menuItemId));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:h-[calc(100vh-64px-48px)]">
      <div className="md:flex-[1.2] overflow-y-auto">
        <MenuSearch value={search} onChange={setSearch} />
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
        <MenuGrid items={filteredItems} onAdd={addToCart} cartItems={cartItems} />
      </div>
      <div className="md:flex-[0.8] bg-muted/30 rounded-xl p-4 border border-border">
        <Cart items={cartItems} staffList={staffList} onRemove={removeFromCart} />
      </div>
    </div>
  );
}
