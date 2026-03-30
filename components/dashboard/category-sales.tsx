import { CATEGORY_COLORS } from "@/lib/constants";
import type { Category } from "@/lib/types";

type CategorySale = {
  category: Category;
  count: number;
  amount: number;
  percentage: number;
};

export function CategorySales({ data }: { data: CategorySale[] }) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-base font-bold mb-4">カテゴリ別売上</h3>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.category}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[item.category] }}
                />
                <span className="text-sm font-medium">{item.category}</span>
                <span className="text-xs text-muted-foreground">
                  ({item.count}件)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">
                  ¥{item.amount.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: CATEGORY_COLORS[item.category],
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <span className="text-sm font-bold">合計</span>
        <span className="text-sm font-bold">¥{total.toLocaleString()}</span>
      </div>
    </div>
  );
}
