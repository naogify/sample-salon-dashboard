"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type CustomerSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CustomerSearch({ value, onChange }: CustomerSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        placeholder="名前・カナ・電話番号で検索"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}
