"use client";

import { useState, useMemo } from "react";
import { CustomerSearch } from "@/components/customers/customer-search";
import { SourceFilter } from "@/components/customers/source-filter";
import { CustomerTable } from "@/components/customers/customer-table";
import { CustomerDetailDialog } from "@/components/customers/customer-detail-dialog";
import { customers, reservations } from "@/lib/mock-data";
import type { Customer, Source } from "@/lib/types";
import { Users, UserPlus, Repeat, CalendarCheck } from "lucide-react";

type SortKey = "name" | "visitCount" | "lastVisit";
type SortDir = "asc" | "desc";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<Source | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("lastVisit");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered = useMemo(() => {
    let result = customers;

    if (sourceFilter) {
      result = result.filter((c) => c.source === sourceFilter);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.nameKana.toLowerCase().includes(q) ||
          c.phone.includes(q),
      );
    }

    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") {
        cmp = a.nameKana.localeCompare(b.nameKana);
      } else if (sortKey === "visitCount") {
        cmp = a.visitCount - b.visitCount;
      } else {
        cmp = a.lastVisit.localeCompare(b.lastVisit);
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [search, sourceFilter, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  function handleSelect(customer: Customer) {
    setSelectedCustomer(customer);
    setDialogOpen(true);
  }

  const totalVisits = customers.reduce((s, c) => s + c.visitCount, 0);
  const avgVisits = customers.length
    ? (totalVisits / customers.length).toFixed(1)
    : "0";
  const newThisMonth = customers.filter((c) => c.visitCount === 1).length;
  const repeatRate = customers.length
    ? (
        (customers.filter((c) => c.visitCount >= 2).length /
          customers.length) *
        100
      ).toFixed(0)
    : "0";

  const kpiItems = [
    {
      label: "総顧客数",
      value: `${customers.length}名`,
      icon: Users,
    },
    {
      label: "新規顧客",
      value: `${newThisMonth}名`,
      icon: UserPlus,
    },
    {
      label: "リピート率",
      value: `${repeatRate}%`,
      icon: Repeat,
    },
    {
      label: "平均来店回数",
      value: `${avgVisits}回`,
      icon: CalendarCheck,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 ring-1 ring-primary/20">
            <Users className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">顧客管理</h1>
            <p className="text-sm text-muted-foreground">
              顧客情報の検索・閲覧
            </p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full">
          全 {customers.length} 名
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {kpiItems.map((item) => (
          <div
            key={item.label}
            className="bg-kpi-card rounded-xl p-5 ring-1 ring-foreground/[0.04] hover:ring-primary/20 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground tracking-wide">
                {item.label}
              </span>
              <div className="size-8 rounded-lg bg-primary/8 flex items-center justify-center">
                <item.icon className="size-4 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground tracking-tight">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="rounded-xl bg-card ring-1 ring-foreground/10 shadow-sm">
        <div className="p-4 border-b border-foreground/5">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="sm:w-80">
              <CustomerSearch value={search} onChange={setSearch} />
            </div>
            <SourceFilter selected={sourceFilter} onChange={setSourceFilter} />
            <div className="ml-auto flex items-center gap-2">
              <div className="size-2 rounded-full bg-primary/60 animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {filtered.length} 件表示
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <CustomerTable
          customers={filtered}
          onSelect={handleSelect}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
        />
      </div>

      <CustomerDetailDialog
        customer={selectedCustomer}
        reservations={reservations}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
