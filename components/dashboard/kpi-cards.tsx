import { Wallet, Users, UserPlus, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type KpiItem = {
  label: string;
  value: string;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
};

export function KpiCards({ data, periodLabel = "本日" }: {
  periodLabel?: string;
  data: {
    sales: number;
    salesChange: number;
    customerCount: number;
    customerCountChange: number;
    newCustomerRate: number;
    newCustomerRateChange: number;
    avgSpend: number;
    avgSpendChange: number;
  };
}) {
  const items: KpiItem[] = [
    {
      label: `${periodLabel}売上`,
      value: `¥${data.sales.toLocaleString()}`,
      change: data.salesChange,
      icon: Wallet,
    },
    {
      label: "入客数",
      value: `${data.customerCount}名`,
      change: data.customerCountChange,
      icon: Users,
    },
    {
      label: "新規率",
      value: `${data.newCustomerRate}%`,
      change: data.newCustomerRateChange,
      icon: UserPlus,
    },
    {
      label: "平均客単価",
      value: `¥${data.avgSpend.toLocaleString()}`,
      change: data.avgSpendChange,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-kpi-card rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <item.icon className="h-5 w-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{item.value}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp
              className={cn(
                "h-3 w-3",
                item.change >= 0 ? "text-success" : "text-danger rotate-180"
              )}
            />
            <span
              className={cn(
                "text-xs font-medium",
                item.change >= 0 ? "text-success" : "text-danger"
              )}
            >
              {item.change >= 0 ? "+" : ""}
              {item.change}%
            </span>
            <span className="text-xs text-muted-foreground">前週比</span>
          </div>
        </div>
      ))}
    </div>
  );
}
