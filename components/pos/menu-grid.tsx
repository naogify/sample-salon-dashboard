import { MenuCard } from "./menu-card";
import type { MenuItem } from "@/lib/types";

type CartItem = { menuItem: MenuItem; quantity: number };

export function MenuGrid({ items, onAdd, cartItems }: { items: MenuItem[]; onAdd: (item: MenuItem) => void; cartItems: CartItem[] }) {
  if (items.length === 0) {
    return <div className="text-center text-muted-foreground py-12 text-sm">該当するメニューがありません</div>;
  }
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => {
        const cartItem = cartItems.find((ci) => ci.menuItem.id === item.id);
        return <MenuCard key={item.id} item={item} onAdd={onAdd} quantity={cartItem?.quantity ?? 0} />;
      })}
    </div>
  );
}
