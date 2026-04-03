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

type CustomerTableProps = {
  customers: Customer[];
  onSelect: (customer: Customer) => void;
};

export function CustomerTable({ customers, onSelect }: CustomerTableProps) {
  if (customers.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        該当する顧客が見つかりません
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>名前</TableHead>
          <TableHead className="hidden sm:table-cell">カナ</TableHead>
          <TableHead>電話番号</TableHead>
          <TableHead>流入元</TableHead>
          <TableHead className="text-right">来店回数</TableHead>
          <TableHead className="hidden sm:table-cell">最終来店</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow
            key={customer.id}
            className="cursor-pointer"
            onClick={() => onSelect(customer)}
          >
            <TableCell className="font-medium">{customer.name}</TableCell>
            <TableCell className="hidden sm:table-cell text-muted-foreground">
              {customer.nameKana}
            </TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>
              <SourceBadge source={customer.source} />
            </TableCell>
            <TableCell className="text-right">{customer.visitCount}</TableCell>
            <TableCell className="hidden sm:table-cell text-muted-foreground">
              {customer.lastVisit}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
