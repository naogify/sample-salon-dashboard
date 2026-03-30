import { Clock } from "lucide-react";
import type { MenuItem } from "@/lib/types";

export function MenuCard({ item, onAdd }: { item: MenuItem; onAdd: (item: MenuItem) => void }) {
  return (
    <button onClick={() => onAdd(item)}
      className="border border-border rounded-xl p-4 text-left hover:border-primary/50 hover:shadow-sm transition-all">
      <div className="font-medium text-sm mb-1">{item.name}</div>
      <div className="text-primary font-bold text-base">¥{item.price.toLocaleString()}</div>
      <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
        <Clock className="h-3 w-3" />{item.duration}分
      </div>
    </button>
  );
}
