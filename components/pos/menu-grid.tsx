import { MenuCard } from "./menu-card";
import type { MenuItem } from "@/lib/types";

export function MenuGrid({ items, onAdd }: { items: MenuItem[]; onAdd: (item: MenuItem) => void }) {
  if (items.length === 0) {
    return <div className="text-center text-muted-foreground py-12 text-sm">該当するメニューがありません</div>;
  }
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (<MenuCard key={item.id} item={item} onAdd={onAdd} />))}
    </div>
  );
}
