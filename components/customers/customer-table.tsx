"use client";

import type { Customer } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SourceBadge } from "./source-badge";
import {
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Phone,
  Search,
  Star,
  AlertTriangle,
} from "lucide-react";

type SortKey = "name" | "visitCount" | "lastVisit";
type SortDir = "asc" | "desc";

type CustomerTableProps = {
  customers: Customer[];
  onSelect: (customer: Customer) => void;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
};

function getInitials(name: string) {
  const parts = name.replace(/\s+/g, " ").trim().split(" ");
  if (parts.length >= 2) return parts[0][0] + parts[1][0];
  return name.slice(0, 2);
}

const AVATAR_COLORS = [
  "bg-pink-50 text-pink-600 ring-pink-200/60",
  "bg-purple-50 text-purple-600 ring-purple-200/60",
  "bg-blue-50 text-blue-600 ring-blue-200/60",
  "bg-teal-50 text-teal-600 ring-teal-200/60",
  "bg-amber-50 text-amber-600 ring-amber-200/60",
  "bg-rose-50 text-rose-600 ring-rose-200/60",
  "bg-indigo-50 text-indigo-600 ring-indigo-200/60",
  "bg-emerald-50 text-emerald-600 ring-emerald-200/60",
];

function avatarColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function SortIcon({
  column,
  sortKey,
  sortDir,
}: {
  column: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
}) {
  if (sortKey !== column) {
    return (
      <span className="ml-1 inline-flex flex-col text-muted-foreground/40">
        <ChevronUp className="size-3 -mb-1" />
        <ChevronDown className="size-3" />
      </span>
    );
  }
  return (
    <span className="ml-1 inline-flex items-center text-primary">
      {sortDir === "asc" ? (
        <ChevronUp className="size-3.5" />
      ) : (
        <ChevronDown className="size-3.5" />
      )}
    </span>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

function formatDateShort(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function daysAgo(dateStr: string) {
  const now = new Date();
  const d = new Date(dateStr);
  const diff = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diff === 0) return "今日";
  if (diff === 1) return "昨日";
  if (diff <= 7) return `${diff}日前`;
  if (diff <= 30) return `${Math.floor(diff / 7)}週間前`;
  return `${Math.floor(diff / 30)}ヶ月前`;
}

function getActivityStatus(lastVisit: string): {
  label: string;
  color: string;
  dotColor: string;
} {
  const now = new Date();
  const d = new Date(lastVisit);
  const diff = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diff <= 14) return { label: "アクティブ", color: "text-emerald-600 bg-emerald-50", dotColor: "bg-emerald-500" };
  if (diff <= 45) return { label: "通常", color: "text-blue-600 bg-blue-50", dotColor: "bg-blue-500" };
  return { label: "休眠", color: "text-amber-600 bg-amber-50", dotColor: "bg-amber-500" };
}

function VisitBar({ count, max }: { count: number; max: number }) {
  const pct = Math.min((count / max) * 100, 100);
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-16 h-1.5 rounded-full bg-muted/80 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary/60 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-semibold tabular-nums">{count}</span>
      <span className="text-muted-foreground text-xs">回</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
      <div className="size-16 rounded-2xl bg-muted/60 flex items-center justify-center mb-4">
        <Search className="size-7 text-muted-foreground/50" />
      </div>
      <p className="text-sm font-semibold text-foreground/70">
        該当する顧客が見つかりません
      </p>
      <p className="text-xs mt-1.5 text-muted-foreground">
        検索条件を変更してお試しください
      </p>
    </div>
  );
}

function MobileCard({
  customer,
  onSelect,
}: {
  customer: Customer;
  onSelect: (customer: Customer) => void;
}) {
  const isVip = customer.visitCount >= 5;
  return (
    <button
      type="button"
      className="w-full text-left p-4 rounded-xl bg-card ring-1 ring-foreground/[0.06] hover:ring-primary/30 hover:shadow-sm active:scale-[0.99] transition-all duration-150"
      onClick={() => onSelect(customer)}
    >
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <div
            className={`size-11 rounded-full ring-1 flex items-center justify-center text-xs font-bold ${avatarColor(customer.id)}`}
          >
            {getInitials(customer.name)}
          </div>
          {isVip && (
            <div className="absolute -top-1 -right-1 size-4 rounded-full bg-amber-400 flex items-center justify-center ring-2 ring-card">
              <Star className="size-2.5 text-white fill-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-sm truncate">{customer.name}</p>
            <ChevronRight className="size-4 text-muted-foreground/40 shrink-0" />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {customer.nameKana}
          </p>
          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
            <SourceBadge source={customer.source} />
            <span className="text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full tabular-nums">
              {customer.visitCount}回来店
            </span>
            <span className="text-xs text-muted-foreground tabular-nums ml-auto">
              {formatDateShort(customer.lastVisit)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
            <Phone className="size-3" />
            <span className="text-xs tabular-nums">{customer.phone}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export function CustomerTable({
  customers,
  onSelect,
  sortKey,
  sortDir,
  onSort,
}: CustomerTableProps) {
  if (customers.length === 0) {
    return <EmptyState />;
  }

  const maxVisit = Math.max(...customers.map((c) => c.visitCount), 1);

  return (
    <>
      {/* Mobile card list */}
      <div className="sm:hidden p-3 space-y-2">
        {customers.map((customer) => (
          <MobileCard
            key={customer.id}
            customer={customer}
            onSelect={onSelect}
          />
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-foreground/5">
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => onSort("name")}
              >
                <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider">
                  顧客
                  <SortIcon column="name" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  電話番号
                </span>
              </TableHead>
              <TableHead>
                <span className="text-xs font-semibold uppercase tracking-wider">
                  流入元
                </span>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => onSort("visitCount")}
              >
                <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider">
                  来店回数
                  <SortIcon
                    column="visitCount"
                    sortKey={sortKey}
                    sortDir={sortDir}
                  />
                </span>
              </TableHead>
              <TableHead
                className="hidden md:table-cell cursor-pointer select-none"
                onClick={() => onSort("lastVisit")}
              >
                <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider">
                  最終来店
                  <SortIcon
                    column="lastVisit"
                    sortKey={sortKey}
                    sortDir={sortDir}
                  />
                </span>
              </TableHead>
              <TableHead className="w-8" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => {
              const isVip = customer.visitCount >= 5;
              return (
                <TableRow
                  key={customer.id}
                  className="cursor-pointer group/row hover:bg-primary/[0.03] transition-colors"
                  onClick={() => onSelect(customer)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <div
                          className={`size-9 rounded-full ring-1 flex items-center justify-center text-xs font-bold transition-shadow group-hover/row:ring-2 ${avatarColor(customer.id)}`}
                        >
                          {getInitials(customer.name)}
                        </div>
                        {isVip && (
                          <div className="absolute -top-0.5 -right-0.5 size-3.5 rounded-full bg-amber-400 flex items-center justify-center ring-2 ring-card">
                            <Star className="size-2 text-white fill-white" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate group-hover/row:text-primary transition-colors">
                          {customer.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {customer.nameKana}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground tabular-nums">
                    {customer.phone}
                  </TableCell>
                  <TableCell>
                    <SourceBadge source={customer.source} />
                  </TableCell>
                  <TableCell>
                    <VisitBar count={customer.visitCount} max={maxVisit} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground tabular-nums">
                        {formatDate(customer.lastVisit)}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {daysAgo(customer.lastVisit)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ChevronRight className="size-4 text-muted-foreground/30 group-hover/row:text-primary/60 group-hover/row:translate-x-0.5 transition-all" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
