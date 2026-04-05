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
import { ChevronUp, ChevronDown } from "lucide-react";

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

export function CustomerTable({
  customers,
  onSelect,
  sortKey,
  sortDir,
  onSort,
}: CustomerTableProps) {
  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-3">
          <svg
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium">該当する顧客が見つかりません</p>
        <p className="text-xs mt-1">検索条件を変更してお試しください</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead
            className="cursor-pointer select-none"
            onClick={() => onSort("name")}
          >
            <span className="inline-flex items-center">
              顧客
              <SortIcon column="name" sortKey={sortKey} sortDir={sortDir} />
            </span>
          </TableHead>
          <TableHead className="hidden sm:table-cell">電話番号</TableHead>
          <TableHead>流入元</TableHead>
          <TableHead
            className="text-right cursor-pointer select-none"
            onClick={() => onSort("visitCount")}
          >
            <span className="inline-flex items-center justify-end">
              来店回数
              <SortIcon
                column="visitCount"
                sortKey={sortKey}
                sortDir={sortDir}
              />
            </span>
          </TableHead>
          <TableHead
            className="hidden sm:table-cell cursor-pointer select-none"
            onClick={() => onSort("lastVisit")}
          >
            <span className="inline-flex items-center">
              最終来店
              <SortIcon
                column="lastVisit"
                sortKey={sortKey}
                sortDir={sortDir}
              />
            </span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow
            key={customer.id}
            className="cursor-pointer group/row hover:bg-primary/[0.03]"
            onClick={() => onSelect(customer)}
          >
            <TableCell>
              <div className="flex items-center gap-3">
                <div
                  className={`flex-shrink-0 size-9 rounded-full ring-1 flex items-center justify-center text-xs font-bold transition-shadow group-hover/row:ring-2 ${avatarColor(customer.id)}`}
                >
                  {getInitials(customer.name)}
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate group-hover/row:text-primary transition-colors">
                    {customer.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate hidden sm:block">
                    {customer.nameKana}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell text-sm text-muted-foreground tabular-nums">
              {customer.phone}
            </TableCell>
            <TableCell>
              <SourceBadge source={customer.source} />
            </TableCell>
            <TableCell className="text-right tabular-nums">
              <span className="font-semibold">{customer.visitCount}</span>
              <span className="text-muted-foreground text-xs ml-0.5">回</span>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground tabular-nums">
                  {formatDate(customer.lastVisit)}
                </span>
                <span className="text-[11px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded">
                  {daysAgo(customer.lastVisit)}
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
