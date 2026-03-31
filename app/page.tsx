"use client";

import { useState } from "react";
import { PeriodTabs } from "@/components/dashboard/period-tabs";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { StaffKpiTable } from "@/components/dashboard/staff-kpi-table";
import { CategorySales } from "@/components/dashboard/category-sales";
import {
  dashboardKpi,
  staffList,
  staffKpiData,
  categorySalesData,
} from "@/lib/mock-data";
import type { Period } from "@/lib/mock-data";

const PERIOD_LABELS: Record<Period, string> = {
  今日: "本日",
  今週: "今週",
  今月: "今月",
  カスタム: "期間",
};

function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>("今日");
  const [customRange, setCustomRange] = useState({ from: todayStr(), to: todayStr() });

  return (
    <div className="space-y-6">
      <PeriodTabs
        active={period}
        onActiveChange={setPeriod}
        customRange={customRange}
        onCustomRangeChange={setCustomRange}
      />
      <KpiCards data={dashboardKpi[period]} periodLabel={PERIOD_LABELS[period]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StaffKpiTable staffList={staffList} kpiData={staffKpiData[period]} />
        <CategorySales data={categorySalesData[period]} />
      </div>
    </div>
  );
}
