"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SOURCE_COLORS, SOURCE_LABELS, CATEGORY_COLORS } from "@/lib/constants";
import type { Customer, Staff, MenuItem, Source, TreatmentSpace, Category } from "@/lib/types";

const SOURCES: Source[] = ["hotpepper", "line", "google", "phone", "walkin"];
const SPACES: TreatmentSpace[] = ["まつエクベッド", "ネイルデスク"];
const MENU_CATEGORIES: Category[] = ["まつエク", "まつげパーマ", "ネイル", "アイブロウ", "オプション", "オフ"];

export function NewReservationDialog({
  open, onClose, customers, staffList, menuItems,
}: {
  open: boolean; onClose: () => void; customers: Customer[]; staffList: Staff[]; menuItems: MenuItem[];
}) {
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<TreatmentSpace | null>(null);

  if (!open) return null;

  const filteredCustomers = customers.filter(
    (c) => c.name.includes(customerSearch) || c.nameKana.includes(customerSearch) || c.phone.includes(customerSearch)
  );
  const activeStaff = staffList.filter((s) => s.status === "active");
  const toggleMenu = (id: string) => {
    setSelectedMenus((prev) => prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-[520px] bg-card h-full overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold">新規予約</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-4 space-y-6">
          <section>
            <h3 className="text-sm font-bold mb-2">顧客選択</h3>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="名前・かな・電話番号で検索" value={customerSearch} onChange={(e) => setCustomerSearch(e.target.value)} className="pl-9" />
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <button key={customer.id} onClick={() => setSelectedCustomer(customer.id)}
                  className={cn("w-full text-left p-2 rounded-lg text-sm flex items-center justify-between hover:bg-muted transition-colors", selectedCustomer === customer.id && "bg-secondary")}>
                  <div><span className="font-medium">{customer.name}</span><span className="text-muted-foreground ml-2 text-xs">{customer.nameKana}</span></div>
                  <span className="text-xs text-muted-foreground">{customer.phone}</span>
                </button>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-sm font-bold mb-2">担当スタッフ</h3>
            <div className="grid grid-cols-3 gap-2">
              {activeStaff.map((staff) => (
                <button key={staff.id} onClick={() => setSelectedStaff(staff.id)}
                  className={cn("p-3 rounded-lg border text-center text-sm transition-colors", selectedStaff === staff.id ? "border-primary bg-secondary" : "border-border hover:border-primary/50")}>
                  <div className="font-medium">{staff.name}</div>
                  <div className="text-xs text-muted-foreground">{staff.role}</div>
                  <div className="text-xs text-primary mt-1">{staff.nominationFee > 0 ? `指名料 ¥${staff.nominationFee.toLocaleString()}` : "指名料 無料"}</div>
                </button>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-sm font-bold mb-2">メニュー選択</h3>
            {MENU_CATEGORIES.map((category) => {
              const items = menuItems.filter((m) => m.category === category);
              if (items.length === 0) return null;
              return (
                <div key={category} className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[category] }} />
                    <span className="text-xs font-medium text-muted-foreground">{category}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {items.map((item) => (
                      <button key={item.id} onClick={() => toggleMenu(item.id)}
                        className={cn("p-2 rounded-lg border text-left text-xs transition-colors", selectedMenus.includes(item.id) ? "border-primary bg-secondary" : "border-border hover:border-primary/50")}>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-primary">¥{item.price.toLocaleString()} / {item.duration}分</div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
          <section>
            <h3 className="text-sm font-bold mb-2">施術スペース</h3>
            <div className="flex gap-2">
              {SPACES.map((space) => (
                <button key={space} onClick={() => setSelectedSpace(space)}
                  className={cn("px-4 py-2 rounded-lg border text-sm transition-colors", selectedSpace === space ? "border-primary bg-secondary" : "border-border hover:border-primary/50")}>{space}</button>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-sm font-bold mb-2">流入元</h3>
            <div className="flex gap-2 flex-wrap">
              {SOURCES.map((source) => (
                <button key={source} onClick={() => setSelectedSource(source)}
                  className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-colors", selectedSource === source ? "border-primary bg-secondary" : "border-border hover:border-primary/50")}>
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: SOURCE_COLORS[source] }} />
                  {SOURCE_LABELS[source]}
                </button>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-sm font-bold mb-2">メモ</h3>
            <textarea className="w-full border border-border rounded-lg p-2 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-ring" placeholder="メモを入力..." />
          </section>
        </div>
        <div className="sticky bottom-0 bg-card border-t border-border p-4 flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">キャンセル</Button>
          <Button className="flex-1">予約を保存</Button>
        </div>
      </div>
    </div>
  );
}
