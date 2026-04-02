"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SOURCE_COLORS, SOURCE_LABELS, RESERVATION_STATUS_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Reservation, Customer, MenuItem } from "@/lib/types";

export function ReservationBlock({
  reservation, customer, menuItems, timelineStartHour, timelineEndHour,
}: {
  reservation: Reservation; customer: Customer | undefined; menuItems: MenuItem[];
  timelineStartHour: number; timelineEndHour: number;
}) {
  const [open, setOpen] = useState(false);

  const totalMinutes = (timelineEndHour - timelineStartHour) * 60;
  const [startH, startM] = reservation.startTime.split(":").map(Number);
  const [endH, endM] = reservation.endTime.split(":").map(Number);
  const startOffset = (startH - timelineStartHour) * 60 + startM;
  const duration = (endH - timelineStartHour) * 60 + endM - startOffset;
  const topPercent = (startOffset / totalMinutes) * 100;
  const heightPercent = (duration / totalMinutes) * 100;

  const resolvedMenuItems = reservation.menuItemIds
    .map((id) => menuItems.find((m) => m.id === id))
    .filter((m): m is MenuItem => m != null);
  const menuNames = resolvedMenuItems.map((m) => m.name).join(", ");
  const totalPrice = resolvedMenuItems.reduce((sum, m) => sum + m.price, 0);
  const totalDuration = resolvedMenuItems.reduce((sum, m) => sum + m.duration, 0);

  const statusColors: Record<string, string> = {
    completed: "bg-green-100 text-green-700",
    in_progress: "bg-blue-100 text-blue-700",
    confirmed: "bg-gray-100 text-gray-600",
  };

  return (
    <>
      <div
        className="absolute left-1 right-1 rounded-lg px-2 py-1.5 text-sm overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-l-4"
        style={{
          top: `${topPercent}%`, height: `${heightPercent}%`,
          backgroundColor: `${SOURCE_COLORS[reservation.source]}15`,
          borderLeftColor: SOURCE_COLORS[reservation.source],
        }}
        onClick={() => setOpen(true)}
      >
        <div className="font-semibold text-xs truncate">{customer?.name ?? "不明"}</div>
        <div className="text-[11px] text-muted-foreground/80">
          {reservation.startTime}〜{reservation.endTime}
        </div>
        <div className="text-[11px] text-foreground/70 truncate">{menuNames}</div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{customer?.name ?? "不明"} 様</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Badge className={cn("text-xs", statusColors[reservation.status])}>
                {RESERVATION_STATUS_LABELS[reservation.status]}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {SOURCE_LABELS[reservation.source]}
              </Badge>
            </div>

            <DetailRow label="日付" value={reservation.date} />
            <DetailRow label="時間" value={`${reservation.startTime}〜${reservation.endTime}（${totalDuration}分）`} />
            <DetailRow label="施術スペース" value={reservation.space} />

            <div>
              <span className="text-muted-foreground">メニュー</span>
              <ul className="mt-1 space-y-1">
                {resolvedMenuItems.map((m) => (
                  <li key={m.id} className="flex justify-between">
                    <span>{m.name}</span>
                    <span className="text-muted-foreground">{m.price.toLocaleString()}円 / {m.duration}分</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-semibold mt-1 pt-1 border-t">
                <span>合計</span>
                <span>{totalPrice.toLocaleString()}円</span>
              </div>
            </div>

            {customer && (
              <div className="space-y-1.5 pt-2 border-t">
                <span className="text-muted-foreground font-medium">顧客情報</span>
                <DetailRow label="カナ" value={customer.nameKana} />
                <DetailRow label="電話" value={customer.phone} />
                {customer.email && <DetailRow label="メール" value={customer.email} />}
                <DetailRow label="来店回数" value={`${customer.visitCount}回`} />
                {customer.allergy && <DetailRow label="アレルギー" value={customer.allergy} />}
                {customer.memo && <DetailRow label="メモ" value={customer.memo} />}
              </div>
            )}

            {reservation.memo && (
              <div className="pt-2 border-t">
                <span className="text-muted-foreground">予約メモ</span>
                <p className="mt-0.5">{reservation.memo}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
