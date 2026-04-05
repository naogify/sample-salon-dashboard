"use client";

import type { Customer, Reservation } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SourceBadge } from "./source-badge";
import {
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  FileText,
  Clock,
  ChevronRight,
} from "lucide-react";

type CustomerDetailDialogProps = {
  customer: Customer | null;
  reservations: Reservation[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function getInitials(name: string) {
  const parts = name.replace(/\s+/g, " ").trim().split(" ");
  if (parts.length >= 2) return parts[0][0] + parts[1][0];
  return name.slice(0, 2);
}

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
    <div className="flex items-center gap-3 text-sm">
      <div className="flex-shrink-0 size-8 rounded-lg bg-muted/70 ring-1 ring-foreground/[0.04] flex items-center justify-center">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div>
        <span className="text-[11px] text-muted-foreground block leading-none mb-1">
          {label}
        </span>
        <span className="text-foreground font-medium">{value}</span>
      </div>
    </div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

function getStatusLabel(status: string) {
  switch (status) {
    case "confirmed":
      return { text: "予約確定", color: "bg-blue-100 text-blue-700" };
    case "in_progress":
      return { text: "施術中", color: "bg-amber-100 text-amber-700" };
    case "completed":
      return { text: "完了", color: "bg-emerald-100 text-emerald-700" };
    default:
      return { text: status, color: "bg-gray-100 text-gray-700" };
  }
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
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 size-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-2 ring-primary/20 flex items-center justify-center text-primary text-xl font-bold">
              {getInitials(customer.name)}
            </div>
            <div>
              <DialogTitle className="text-lg tracking-tight">
                {customer.name}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                {customer.nameKana}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <SourceBadge source={customer.source} />
                <span className="text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
                  来店 {customer.visitCount} 回
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 mt-3">
          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
              連絡先
            </h4>
            <div className="rounded-lg bg-muted/30 ring-1 ring-foreground/[0.04] p-3 space-y-3">
              <DetailRow icon={Phone} label="電話番号" value={customer.phone} />
              <DetailRow icon={Mail} label="メール" value={customer.email} />
            </div>
          </div>

          {/* Personal Info */}
          {(customer.birthDate ||
            customer.allergy ||
            customer.patchTestDate) && (
            <div className="space-y-3">
              <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                個人情報
              </h4>
              <div className="rounded-lg bg-muted/30 ring-1 ring-foreground/[0.04] p-3 space-y-3">
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
              </div>
            </div>
          )}

          {/* Memo */}
          {customer.memo && (
            <div className="space-y-2">
              <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                メモ
              </h4>
              <div className="rounded-lg bg-amber-50/50 ring-1 ring-amber-200/30 p-3 text-sm flex gap-2.5">
                <FileText className="size-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-foreground/80">{customer.memo}</p>
              </div>
            </div>
          )}

          {/* Visit History */}
          {customerReservations.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                  来店履歴
                </h4>
                <span className="text-[11px] text-muted-foreground">
                  {customerReservations.length} 件
                </span>
              </div>
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {customerReservations.map((r) => {
                  const status = getStatusLabel(r.status);
                  return (
                    <div
                      key={r.id}
                      className="flex items-center gap-3 rounded-lg bg-muted/30 ring-1 ring-foreground/[0.04] px-3 py-2.5 group hover:bg-muted/60 hover:ring-foreground/[0.08] transition-all"
                    >
                      <div className="flex-shrink-0 size-8 rounded-lg bg-background ring-1 ring-foreground/5 flex items-center justify-center">
                        <Clock className="size-3.5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium tabular-nums">
                            {formatDate(r.date)}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${status.color}`}
                          >
                            {status.text}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {r.startTime}〜{r.endTime}
                        </span>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
