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
      className="absolute top-1 bottom-1 rounded-lg px-2 py-1.5 text-xs overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-l-4 flex flex-col justify-between"
      style={{
        left: `${leftPercent}%`, width: `${widthPercent}%`,
        backgroundColor: `${SOURCE_COLORS[reservation.source]}20`,
        borderLeftColor: SOURCE_COLORS[reservation.source],
      }}
    >
      <div className="flex items-center gap-1 min-w-0">
        <span className="font-semibold truncate text-[13px] leading-tight">{customer?.name ?? "不明"}</span>
        <Badge className={cn("text-[10px] px-1.5 py-0 h-4 shrink-0 font-medium", statusColors[reservation.status])}>
          {RESERVATION_STATUS_LABELS[reservation.status]}
        </Badge>
      </div>
      <div className="text-muted-foreground truncate leading-tight">{menuNames}</div>
      <div className="font-medium tabular-nums" style={{ color: SOURCE_COLORS[reservation.source] }}>
        {reservation.startTime}–{reservation.endTime}
      </div>
    </div>
  );
}
