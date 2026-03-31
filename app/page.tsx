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

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PeriodTabs />
      <KpiCards data={dashboardKpi.today} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StaffKpiTable staffList={staffList} kpiData={staffKpiData} />
        <CategorySales data={categorySalesData} />
      </div>
    </div>
  );
}
