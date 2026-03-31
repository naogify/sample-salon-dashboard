"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

function formatDate(date: Date): string {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} (${days[date.getDay()]})`;
}

export function DayNavigator({
  date,
  onDateChange,
  onNewReservation,
}: {
  date: Date;
  onDateChange: (date: Date) => void;
  onNewReservation: () => void;
}) {
  const prev = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    onDateChange(d);
  };

  const next = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    onDateChange(d);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-2">
        <button onClick={prev} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-base sm:text-lg font-bold min-w-40 sm:min-w-48 text-center">{formatDate(date)}</span>
        <button onClick={next} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <Button onClick={onNewReservation} className="gap-1 w-full sm:w-auto">
        <Plus className="h-4 w-4" />
        新規予約
      </Button>
    </div>
  );
}
