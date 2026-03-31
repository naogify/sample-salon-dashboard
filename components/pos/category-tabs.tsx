import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

const CATEGORIES: (Category | "すべて")[] = ["すべて", "まつエク", "まつげパーマ", "ネイル", "アイブロウ", "セルフ脱毛", "オプション", "オフ"];

export function CategoryTabs({ active, onChange }: { active: Category | "すべて"; onChange: (category: Category | "すべて") => void }) {
  return (
    <div className="flex gap-1.5 flex-wrap mb-4">
      {CATEGORIES.map((category) => (
        <button key={category} onClick={() => onChange(category)}
          className={cn("px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
            active === category ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
          )}>{category}</button>
      ))}
    </div>
  );
}
