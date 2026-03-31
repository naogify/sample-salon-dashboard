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
      <div className="grid border-b border-border min-w-[800px]" style={{ gridTemplateColumns: `160px repeat(${hours.length}, 1fr)` }}>
        <div className="p-3 border-r border-border bg-muted/50" />
        {hours.map((hour) => (
          <div key={hour} className="p-2 text-center text-xs text-muted-foreground border-r border-border last:border-r-0 bg-muted/50">
            {hour}:00
          </div>
        ))}
      </div>
      {activeStaff.map((staff) => {
        const staffReservations = reservations.filter((r) => r.staffId === staff.id);
        return (
          <div key={staff.id} className="grid border-b border-border last:border-b-0 min-w-[800px]" style={{ gridTemplateColumns: `160px 1fr` }}>
            <div className="p-3 border-r border-border flex flex-col justify-center">
              <span className="font-medium text-sm">{staff.name}</span>
              <Badge variant="secondary" className="text-xs w-fit mt-0.5">{staff.role}</Badge>
            </div>
            <div className="relative h-16">
              <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${hours.length}, 1fr)` }}>
                {hours.map((hour) => (<div key={hour} className="border-r border-border/50 last:border-r-0" />))}
              </div>
              {staffReservations.map((res) => (
                <ReservationBlock key={res.id} reservation={res}
                  customer={customers.find((c) => c.id === res.customerId)}
                  menuItems={menuItems} timelineStartHour={TIMELINE_START_HOUR} timelineEndHour={TIMELINE_END_HOUR} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
