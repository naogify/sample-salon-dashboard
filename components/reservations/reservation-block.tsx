import { Badge } from "@/components/ui/badge";
import { SOURCE_COLORS, RESERVATION_STATUS_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Reservation, Customer, MenuItem } from "@/lib/types";

export function ReservationBlock({
  reservation, customer, menuItems, timelineStartHour, timelineEndHour,
}: {
  reservation: Reservation; customer: Customer | undefined; menuItems: MenuItem[];
  timelineStartHour: number; timelineEndHour: number;
}) {
  const totalMinutes = (timelineEndHour - timelineStartHour) * 60;
  const [startH, startM] = reservation.startTime.split(":").map(Number);
  const [endH, endM] = reservation.endTime.split(":").map(Number);
  const startOffset = (startH - timelineStartHour) * 60 + startM;
  const duration = (endH - timelineStartHour) * 60 + endM - startOffset;
  const leftPercent = (startOffset / totalMinutes) * 100;
  const widthPercent = (duration / totalMinutes) * 100;

  const menuNames = reservation.menuItemIds
    .map((id) => menuItems.find((m) => m.id === id)?.name)
    .filter(Boolean).join(", ");

  const statusColors: Record<string, string> = {
    completed: "bg-green-100 text-green-700",
    in_progress: "bg-blue-100 text-blue-700",
    confirmed: "bg-gray-100 text-gray-600",
  };

  return (
    <div
      className="absolute top-1 bottom-1 rounded-lg px-2 py-1.5 text-xs overflow-hidden cursor-pointer hover:brightness-95 transition-all border-l-[3px] border border-black/10"
      style={{
        left: `${leftPercent}%`, width: `${widthPercent}%`,
        backgroundColor: `${SOURCE_COLORS[reservation.source]}2e`,
        borderLeftColor: SOURCE_COLORS[reservation.source],
      }}
    >
      <div className="flex items-center gap-1 mb-0.5">
        <span className="font-semibold truncate leading-tight">{customer?.name ?? "不明"}</span>
        <Badge className={cn("text-[10px] px-1 py-0 h-4 shrink-0 leading-none", statusColors[reservation.status])}>
          {RESERVATION_STATUS_LABELS[reservation.status]}
        </Badge>
      </div>
      <div className="text-[11px] font-medium text-foreground/70 truncate leading-tight">{menuNames}</div>
      <div className="text-[10px] text-foreground/50 mt-0.5 leading-tight">{reservation.startTime}–{reservation.endTime}</div>
    </div>
  );
}
