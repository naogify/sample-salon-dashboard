"use client";

import type { Customer, Reservation } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SourceBadge } from "./source-badge";
import { Phone, Mail, Calendar, AlertTriangle, FileText } from "lucide-react";

type CustomerDetailDialogProps = {
  customer: Customer | null;
  reservations: Reservation[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2 text-sm">
      <Icon className="size-4 mt-0.5 text-muted-foreground shrink-0" />
      <div>
        <span className="text-muted-foreground">{label}：</span>
        <span>{value}</span>
      </div>
    </div>
  );
}

export function CustomerDetailDialog({
  customer,
  reservations,
  open,
  onOpenChange,
}: CustomerDetailDialogProps) {
  if (!customer) return null;

  const customerReservations = reservations
    .filter((r) => r.customerId === customer.id)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{customer.name}</DialogTitle>
          <p className="text-sm text-muted-foreground">{customer.nameKana}</p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <SourceBadge source={customer.source} />
            <span className="text-sm text-muted-foreground">
              来店 {customer.visitCount} 回
            </span>
          </div>

          <div className="space-y-2">
            <DetailRow icon={Phone} label="電話" value={customer.phone} />
            <DetailRow icon={Mail} label="メール" value={customer.email} />
            <DetailRow
              icon={Calendar}
              label="生年月日"
              value={customer.birthDate}
            />
            <DetailRow
              icon={AlertTriangle}
              label="アレルギー"
              value={customer.allergy}
            />
            <DetailRow
              icon={Calendar}
              label="パッチテスト"
              value={customer.patchTestDate}
            />
            <DetailRow icon={FileText} label="メモ" value={customer.memo} />
          </div>

          {customerReservations.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">来店履歴</h4>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {customerReservations.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between text-sm rounded-md bg-muted/50 px-2.5 py-1.5"
                  >
                    <span>{r.date}</span>
                    <span className="text-muted-foreground">
                      {r.startTime}〜{r.endTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
