import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Staff } from "@/lib/types";

type StaffKpi = {
  staffId: string;
  customerCount: number;
  newCount: number;
  repeatRate: number;
  avgSpend: number;
  hourlyRevenue: number;
  totalSales: number;
};

export function StaffKpiTable({
  staffList,
  kpiData,
}: {
  staffList: Staff[];
  kpiData: StaffKpi[];
}) {
  const topStaffId = kpiData
    .filter((k) => k.totalSales > 0)
    .sort((a, b) => b.totalSales - a.totalSales)[0]?.staffId;

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-base font-bold mb-4">スタッフ別KPI</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>スタッフ名</TableHead>
            <TableHead>役職</TableHead>
            <TableHead className="text-right">入客数</TableHead>
            <TableHead className="text-right">新規数</TableHead>
            <TableHead className="text-right">リピート率</TableHead>
            <TableHead className="text-right">客単価</TableHead>
            <TableHead className="text-right">時間単価</TableHead>
            <TableHead className="text-right">売上合計</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...staffList]
            .sort((a, b) => {
              const aKpi = kpiData.find((k) => k.staffId === a.id);
              const bKpi = kpiData.find((k) => k.staffId === b.id);
              return (bKpi?.totalSales ?? 0) - (aKpi?.totalSales ?? 0);
            })
            .map((staff) => {
            const kpi = kpiData.find((k) => k.staffId === staff.id);
            const isOnLeave = staff.status === "leave";
            const isTop = staff.id === topStaffId;

            return (
              <TableRow
                key={staff.id}
                className={cn(isOnLeave && "opacity-40")}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {isTop && (
                      <span className="flex items-center gap-0.5 text-xs text-amber-500 font-bold">
                        <Trophy className="h-3.5 w-3.5" />
                        TOP
                      </span>
                    )}
                    <span className="font-medium">{staff.name}</span>
                    {isOnLeave && (
                      <span className="text-xs text-muted-foreground">
                        {staff.leaveReason}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {staff.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {isOnLeave ? "—" : kpi?.customerCount}
                </TableCell>
                <TableCell className="text-right">
                  {isOnLeave ? "—" : kpi?.newCount}
                </TableCell>
                <TableCell className="text-right">
                  {isOnLeave ? "—" : `${kpi?.repeatRate}%`}
                </TableCell>
                <TableCell className="text-right">
                  {isOnLeave ? "—" : `¥${kpi?.avgSpend.toLocaleString()}`}
                </TableCell>
                <TableCell className="text-right">
                  {isOnLeave
                    ? "—"
                    : `¥${kpi?.hourlyRevenue.toLocaleString()}`}
                </TableCell>
                <TableCell className="text-right">
                  {isOnLeave ? "—" : `¥${kpi?.totalSales.toLocaleString()}`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
