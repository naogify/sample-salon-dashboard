"use client";

import { useState } from "react";
import { Clock, ShoppingCart } from "lucide-react";
import type { MenuItem } from "@/lib/types";

export function MenuCard({ item, onAdd, quantity }: { item: MenuItem; onAdd: (item: MenuItem) => void; quantity: number }) {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    onAdd(item);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  const inCart = quantity > 0;

  return (
    <button onClick={handleClick}
      className={`relative border rounded-xl p-4 text-left transition-all ${
        inCart
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border hover:border-primary/50 hover:shadow-sm"
      } ${animate ? "scale-95" : "scale-100"}`}>
      {inCart && (
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {quantity}
        </span>
      )}
      <div className="font-medium text-sm mb-1">{item.name}</div>
      <div className="text-primary font-bold text-base">¥{item.price.toLocaleString()}</div>
      <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
        <Clock className="h-3 w-3" />{item.duration}分
      </div>
    </button>
  );
}
