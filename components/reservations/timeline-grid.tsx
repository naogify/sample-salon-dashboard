import { ReservationBlock } from "./reservation-block";
import { Badge } from "@/components/ui/badge";
import { TIMELINE_START_HOUR, TIMELINE_END_HOUR } from "@/lib/constants";
import type { Staff, Reservation, Customer, MenuItem } from "@/lib/types";

export function TimelineGrid({
  staffList, reservations, customers, menuItems,
}: {
  staffList: Staff[]; reservations: Reservation[]; customers: Customer[]; menuItems: MenuItem[];
}) {
  const hours = Array.from({ length: TIMELINE_END_HOUR - TIMELINE_START_HOUR + 1 }, (_, i) => TIMELINE_START_HOUR + i);
  const activeStaff = staffList.filter((s) => s.status === "active");

  return (
    <div className="bg-card rounded-xl border border-border overflow-x-auto">
      <div className="min-w-[500px]">
        {/* Header: staff names */}
        <div className="grid border-b border-border sticky top-0 bg-card z-10" style={{ gridTemplateColumns: `64px repeat(${activeStaff.length}, 1fr)` }}>
          <div className="p-2 border-r border-border bg-muted/50" />
          {activeStaff.map((staff) => (
            <div key={staff.id} className="p-2 text-center border-r border-border last:border-r-0 bg-muted/50">
              <div className="font-medium text-sm">{staff.name}</div>
              <Badge variant="secondary" className="text-[11px] mt-0.5">{staff.role}</Badge>
            </div>
          ))}
        </div>

        {/* Body: time rows with staff columns */}
        <div className="grid" style={{ gridTemplateColumns: `64px repeat(${activeStaff.length}, 1fr)` }}>
          {/* Time labels column */}
          <div className="border-r border-border">
            {hours.map((hour) => (
              <div key={hour} className="h-20 flex items-start justify-center pt-1 text-xs text-muted-foreground border-b border-border/50 last:border-b-0">
                {hour}:00
              </div>
            ))}
          </div>

          {/* Staff columns with reservations */}
          {activeStaff.map((staff) => {
            const staffReservations = reservations.filter((r) => r.staffId === staff.id);
            return (
              <div key={staff.id} className="border-r border-border last:border-r-0 relative" style={{ height: `${hours.length * 80}px` }}>
                {/* Hour grid lines */}
                <div className="absolute inset-0">
                  {hours.map((hour) => (
                    <div key={hour} className="h-20 border-b border-border/50 last:border-b-0" />
                  ))}
                </div>
                {/* Reservation blocks */}
                {staffReservations.map((res) => (
                  <ReservationBlock key={res.id} reservation={res}
                    customer={customers.find((c) => c.id === res.customerId)}
                    menuItems={menuItems} timelineStartHour={TIMELINE_START_HOUR} timelineEndHour={TIMELINE_END_HOUR} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
