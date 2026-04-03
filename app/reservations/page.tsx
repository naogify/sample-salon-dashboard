"use client";

import { useState } from "react";
import { DayNavigator } from "@/components/reservations/day-navigator";
import { SourceLegend } from "@/components/reservations/source-legend";
import { TimelineGrid } from "@/components/reservations/timeline-grid";
import { NewReservationDialog } from "@/components/reservations/new-reservation-dialog";
import { staffList, reservations, customers, menuItems } from "@/lib/mock-data";

function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function ReservationsPage() {
  const [date, setDate] = useState(new Date(2026, 2, 30));
  const [dialogOpen, setDialogOpen] = useState(false);

  const dateStr = toDateString(date);
  const filtered = reservations.filter((r) => r.date === dateStr);

  return (
    <div>
      <DayNavigator date={date} onDateChange={setDate} onNewReservation={() => setDialogOpen(true)} />
      <SourceLegend />
      <TimelineGrid staffList={staffList} reservations={filtered} customers={customers} menuItems={menuItems} />
      <NewReservationDialog open={dialogOpen} onClose={() => setDialogOpen(false)} customers={customers} staffList={staffList} menuItems={menuItems} />
    </div>
  );
}
