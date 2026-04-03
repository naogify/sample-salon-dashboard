"use client";

import { ChevronLeft, ChevronRight, Plus, CalendarDays } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

function formatDate(date: Date): string {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} (${days[date.getDay()]})`;
}

function toInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
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
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;
    const [y, m, d] = val.split("-").map(Number);
    onDateChange(new Date(y, m - 1, d));
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
        <span className="relative inline-flex items-center justify-center">
          <CalendarDays className="h-5 w-5 pointer-events-none" />
          <input
            ref={inputRef}
            type="date"
            value={toInputValue(date)}
            onChange={handleDateInput}
            className="absolute inset-0 opacity-0 cursor-pointer"
            aria-label="日付を選択"
            title="日付を選択"
          />
        </span>
      </div>
      <Button onClick={onNewReservation} className="gap-1 w-full sm:w-auto">
        <Plus className="h-4 w-4" />
        新規予約
      </Button>
    </div>
  );
}
