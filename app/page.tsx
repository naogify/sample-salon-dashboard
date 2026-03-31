"use client";

import { useState, useMemo } from "react";
import { PeriodTabs } from "@/components/dashboard/period-tabs";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { StaffKpiTable } from "@/components/dashboard/staff-kpi-table";
import { CategorySales } from "@/components/dashboard/category-sales";
import {
  staffList,
  computeDashboardKpi,
  computeStaffKpi,
  computeCategorySales,
} from "@/lib/mock-data";
import type { Period } from "@/lib/mock-data";

const PERIOD_LABELS: Record<Period, string> = {
  今日: "本日",
  今週: "今週",
  今月: "今月",
  カスタム: "期間",
};

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function todayStr() {
  return toDateStr(new Date());
}

function getDateRange(
  period: Period,
  customRange: { from: string; to: string }
): { from: string; to: string } {
  const today = new Date();
  const t = toDateStr(today);
  if (period === "今日") return { from: t, to: t };
  if (period === "今週") {
    const day = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
    return { from: toDateStr(monday), to: t };
  }
  if (period === "今月") {
    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    return { from: toDateStr(first), to: t };
  }
  return customRange;
}

function getPrevDateRange(
  period: Period,
  curr: { from: string; to: string }
): { from: string; to: string } {
  if (period === "今日") {
    const d = new Date(curr.from);
    d.setDate(d.getDate() - 1);
    const s = toDateStr(d);
    return { from: s, to: s };
  }
  if (period === "今週") {
    const f = new Date(curr.from);
    const t = new Date(curr.to);
    f.setDate(f.getDate() - 7);
    t.setDate(t.getDate() - 7);
    return { from: toDateStr(f), to: toDateStr(t) };
  }
  if (period === "今月") {
    const currFrom = new Date(curr.from);
    const prevFirst = new Date(currFrom.getFullYear(), currFrom.getMonth() - 1, 1);
    const prevLast = new Date(currFrom.getFullYear(), currFrom.getMonth(), 0);
    return { from: toDateStr(prevFirst), to: toDateStr(prevLast) };
  }
  return curr;
}

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>("今日");
  const [customRange, setCustomRange] = useState({ from: todayStr(), to: todayStr() });

  const dateRange = useMemo(
    () => getDateRange(period, customRange),
    [period, customRange]
  );
  const prevRange = useMemo(
    () => getPrevDateRange(period, dateRange),
    [period, dateRange]
  );

  const kpiData = useMemo(
    () => computeDashboardKpi(dateRange.from, dateRange.to, prevRange.from, prevRange.to),
    [dateRange, prevRange]
  );
  const staffKpi = useMemo(
    () => computeStaffKpi(dateRange.from, dateRange.to),
    [dateRange]
  );
  const categorySales = useMemo(
    () => computeCategorySales(dateRange.from, dateRange.to),
    [dateRange]
  );

  return (
    <div className="space-y-6">
      <PeriodTabs
        active={period}
        onActiveChange={setPeriod}
        customRange={customRange}
        onCustomRangeChange={setCustomRange}
      />
      <KpiCards data={kpiData} periodLabel={PERIOD_LABELS[period]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StaffKpiTable staffList={staffList} kpiData={staffKpi} />
        <CategorySales data={categorySales} />
      </div>
    </div>
  );
}
