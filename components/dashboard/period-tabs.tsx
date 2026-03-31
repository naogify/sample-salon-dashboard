"use client";

import { cn } from "@/lib/utils";
import type { Period } from "@/lib/mock-data";

const PERIODS: Period[] = ["今日", "今週", "今月", "カスタム"];

function formatDate(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function toInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getPeriodDateLabel(period: Period): string {
  const today = new Date();
  if (period === "今日") {
    return formatDate(today);
  }
  if (period === "今週") {
    const day = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
    return `${formatDate(monday)} 〜 ${formatDate(today)}`;
  }
  if (period === "今月") {
    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    return `${formatDate(first)} 〜 ${formatDate(today)}`;
  }
  return "";
}

export function PeriodTabs({
  active,
  onActiveChange,
  customRange,
  onCustomRangeChange,
}: {
  active: Period;
  onActiveChange: (period: Period) => void;
  customRange?: { from: string; to: string };
  onCustomRangeChange?: (range: { from: string; to: string }) => void;
}) {
  const dateLabel =
    active === "カスタム" && customRange
      ? ""
      : getPeriodDateLabel(active);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
      <div className="flex gap-1 bg-muted rounded-lg p-1">
        {PERIODS.map((period) => (
          <button
            key={period}
            onClick={() => onActiveChange(period)}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
              active === period
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {period}
          </button>
        ))}
      </div>
      {active === "カスタム" && customRange && onCustomRangeChange ? (
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={customRange.from}
            onChange={(e) =>
              onCustomRangeChange({ ...customRange, from: e.target.value })
            }
            className="border border-border rounded-md px-2 py-1 text-sm bg-background"
          />
          <span className="text-sm text-muted-foreground">〜</span>
          <input
            type="date"
            value={customRange.to}
            onChange={(e) =>
              onCustomRangeChange({ ...customRange, to: e.target.value })
            }
            className="border border-border rounded-md px-2 py-1 text-sm bg-background"
          />
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">{dateLabel}</span>
      )}
    </div>
  );
}
