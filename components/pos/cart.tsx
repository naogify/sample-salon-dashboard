"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { MenuItem, Staff } from "@/lib/types";

type CartItem = { menuItem: MenuItem; quantity: number };

export function Cart({ items, staffList, onRemove }: {
  items: CartItem[]; staffList: Staff[]; onRemove: (menuItemId: string) => void; onClear?: () => void;
}) {
  const activeStaff = staffList.filter((s) => s.status === "active");
  const subtotal = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const hasItems = items.length > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3">
        <label className="text-xs text-muted-foreground mb-1 block">担当スタッフ</label>
        <Select>
          <SelectTrigger><SelectValue placeholder="選択してください" /></SelectTrigger>
          <SelectContent>
            {activeStaff.map((staff) => (
              <SelectItem key={staff.id} value={staff.id}>{staff.name}（{staff.role}）</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <label className="text-xs text-muted-foreground mb-1 block">顧客</label>
        <Input placeholder="名前・電話番号で検索" />
      </div>
      <div className="flex-1 min-h-0">
        {!hasItems ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <ShoppingCart className="h-10 w-10 mb-2" /><span className="text-sm">メニューを選択してください</span>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.menuItem.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                <div>
                  <div className="text-sm font-medium">{item.menuItem.name}</div>
                  <div className="text-xs text-primary">¥{item.menuItem.price.toLocaleString()}{item.quantity > 1 && ` × ${item.quantity}`}</div>
                </div>
                <button onClick={() => onRemove(item.menuItem.id)} className="p-1 text-muted-foreground hover:text-danger transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="border-t border-border pt-3 mt-3 space-y-2">
        <div className="flex justify-between text-sm"><span>小計</span><span>¥{subtotal.toLocaleString()}</span></div>
        <button className="text-sm text-primary hover:underline">割引・クーポン</button>
        <div className="flex justify-between text-lg font-bold"><span>合計</span><span>¥{subtotal.toLocaleString()}</span></div>
        <Button className="w-full" disabled={!hasItems}>会計に進む</Button>
      </div>
    </div>
  );
}
