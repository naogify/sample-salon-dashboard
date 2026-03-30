# Phase 1: #She Salon POS Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the common layout, Dashboard, Reservations, and POS pages of the #She salon POS dashboard with mock data.

**Architecture:** Next.js 15 App Router with static mock data imported directly into components. Each page is a server component by default; interactive parts (tabs, cart, dialog) are client components. shadcn/ui provides base UI primitives styled with a custom pink/peach theme via Tailwind CSS.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui, Recharts, lucide-react (icons)

**Reference:** Design spec at `docs/superpowers/specs/2026-03-30-salon-pos-dashboard-design.md`

**Reference app:** `https://etre-salon-pos.vercel.app/` — open this in browser to compare visual output at each step.

---

## File Map

### New Files (Phase 1)

| File | Responsibility |
|------|---------------|
| `lib/types.ts` | All type definitions (Source, Category, Staff, MenuItem, Customer, Reservation) |
| `lib/mock-data.ts` | Static mock data arrays matching the reference app |
| `lib/constants.ts` | Color maps (source colors, category colors), nav items config |
| `lib/utils.ts` | `cn()` helper (installed by shadcn/ui) |
| `app/layout.tsx` | Root layout wrapping sidebar + header + children |
| `app/globals.css` | Tailwind directives + custom CSS variables for theme |
| `app/page.tsx` | Dashboard page |
| `app/reservations/page.tsx` | Reservations page |
| `app/pos/page.tsx` | POS page |
| `components/layout/sidebar.tsx` | Sidebar navigation with active state |
| `components/layout/header.tsx` | Page header with title, store selector, avatar |
| `components/dashboard/period-tabs.tsx` | Period tab switcher (today/week/month/custom) |
| `components/dashboard/kpi-cards.tsx` | 4 KPI summary cards |
| `components/dashboard/staff-kpi-table.tsx` | Staff KPI table |
| `components/dashboard/category-sales.tsx` | Category sales breakdown with progress bars |
| `components/reservations/day-navigator.tsx` | Date navigation (prev/next day) |
| `components/reservations/source-legend.tsx` | Source color legend |
| `components/reservations/timeline-grid.tsx` | Gantt chart timeline with staff rows |
| `components/reservations/reservation-block.tsx` | Individual reservation block in timeline |
| `components/reservations/new-reservation-dialog.tsx` | Slide-out new reservation panel |
| `components/pos/menu-search.tsx` | Menu search bar |
| `components/pos/category-tabs.tsx` | Category filter tabs |
| `components/pos/menu-grid.tsx` | Menu card grid |
| `components/pos/menu-card.tsx` | Individual menu card |
| `components/pos/cart.tsx` | Cart panel with checkout |

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `tailwind.config.ts`, `lib/utils.ts`, `components.json`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/naoppy/naogify/sample-salon-dashbord
npx create-next-app@latest . --typescript --tailwind --eslint --app --src=no --import-alias "@/*" --turbopack --use-npm
```

Select defaults when prompted. This creates the project with App Router and Tailwind CSS.

- [ ] **Step 2: Initialize shadcn/ui**

```bash
npx shadcn@latest init -d
```

This creates `components.json`, `lib/utils.ts` (with `cn()` helper), and configures the project for shadcn/ui.

- [ ] **Step 3: Install shadcn/ui components needed for Phase 1**

```bash
npx shadcn@latest add table tabs badge dialog select input button card
```

- [ ] **Step 4: Install additional dependencies**

```bash
npm install recharts lucide-react
```

- [ ] **Step 5: Configure custom theme colors in `app/globals.css`**

Replace the content of `app/globals.css` with:

```css
@import "tailwindcss";
@plugin "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: #F9FAFB;
  --color-foreground: #1F2937;
  --color-card: #FFFFFF;
  --color-card-foreground: #1F2937;
  --color-popover: #FFFFFF;
  --color-popover-foreground: #1F2937;
  --color-primary: #E8909A;
  --color-primary-foreground: #FFFFFF;
  --color-primary-light: #F5C7C7;
  --color-primary-dark: #D4707C;
  --color-secondary: #F9E8E8;
  --color-secondary-foreground: #E8909A;
  --color-muted: #F3F4F6;
  --color-muted-foreground: #6B7280;
  --color-accent: #FFF5F5;
  --color-accent-foreground: #1F2937;
  --color-destructive: #EF4444;
  --color-destructive-foreground: #FFFFFF;
  --color-border: #E5E7EB;
  --color-input: #E5E7EB;
  --color-ring: #E8909A;
  --radius: 0.75rem;

  --color-sidebar: #FFFFFF;
  --color-sidebar-foreground: #6B7280;
  --color-sidebar-active: #F9E8E8;
  --color-sidebar-active-foreground: #E8909A;

  --color-kpi-card: #FFF5F5;

  --color-source-hotpepper: #F97316;
  --color-source-line: #22C55E;
  --color-source-google: #3B82F6;
  --color-source-phone: #9CA3AF;
  --color-source-walkin: #EC4899;

  --color-category-matsueku: #F472B6;
  --color-category-nail: #FB923C;
  --color-category-matsuge-perm: #A78BFA;
  --color-category-eyebrow: #34D399;
  --color-category-option: #60A5FA;
  --color-category-off: #CBD5E1;

  --color-success: #22C55E;
  --color-danger: #EF4444;
}

body {
  font-family: system-ui, -apple-system, "Segoe UI", "Noto Sans JP", sans-serif;
}
```

- [ ] **Step 6: Verify the dev server starts**

```bash
npm run dev
```

Open `http://localhost:3000` — should show the default Next.js page. Stop the server.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "scaffold Next.js 15 project with Tailwind, shadcn/ui, and custom salon theme"
```

---

## Task 2: Type Definitions and Constants

**Files:**
- Create: `lib/types.ts`, `lib/constants.ts`

- [ ] **Step 1: Create type definitions**

Create `lib/types.ts`:

```typescript
export type Source = "hotpepper" | "line" | "google" | "phone" | "walkin";

export type Category =
  | "まつエク"
  | "まつげパーマ"
  | "ネイル"
  | "アイブロウ"
  | "セルフ脱毛"
  | "オプション"
  | "オフ";

export type TreatmentSpace = "まつエクベッド" | "ネイルデスク";

export type Staff = {
  id: string;
  name: string;
  role: "ネイリスト" | "アイリスト";
  employmentType: "正社員" | "業務委託";
  nominationFee: number;
  commissionRate?: number;
  color: string;
  displayOrder: number;
  status: "active" | "leave";
  leaveReason?: string;
};

export type MenuItem = {
  id: string;
  name: string;
  category: Category;
  price: number;
  duration: number;
};

export type Customer = {
  id: string;
  name: string;
  nameKana: string;
  phone: string;
  email?: string;
  source: Source;
  visitCount: number;
  lastVisit: string;
  birthDate?: string;
  gender?: string;
  allergy?: string;
  patchTestDate?: string;
  memo?: string;
};

export type Reservation = {
  id: string;
  customerId: string;
  staffId: string;
  menuItemIds: string[];
  date: string;
  startTime: string;
  endTime: string;
  space: TreatmentSpace;
  source: Source;
  status: "confirmed" | "in_progress" | "completed";
  memo?: string;
};

export type Payment = {
  id: string;
  customerId: string;
  staffId: string;
  menuItemIds: string[];
  date: string;
  method: "cash" | "credit" | "qr";
  subtotal: number;
  discount: number;
  total: number;
  receiptNumber: string;
};

export type ChartRecord = {
  id: string;
  customerId: string;
  staffId: string;
  category: Category;
  date: string;
  designVariant: string;
  technicalDetails: string;
  glueType?: string;
  photos: string[];
  rating: number;
  staffNotes: string;
};
```

- [ ] **Step 2: Create constants**

Create `lib/constants.ts`:

```typescript
import type { Source, Category } from "./types";

export const SOURCE_COLORS: Record<Source, string> = {
  hotpepper: "var(--color-source-hotpepper)",
  line: "var(--color-source-line)",
  google: "var(--color-source-google)",
  phone: "var(--color-source-phone)",
  walkin: "var(--color-source-walkin)",
};

export const SOURCE_LABELS: Record<Source, string> = {
  hotpepper: "HotPepper",
  line: "LINE",
  google: "Google",
  phone: "電話",
  walkin: "ウォークイン",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  まつエク: "var(--color-category-matsueku)",
  ネイル: "var(--color-category-nail)",
  まつげパーマ: "var(--color-category-matsuge-perm)",
  アイブロウ: "var(--color-category-eyebrow)",
  セルフ脱毛: "#F59E0B",
  オプション: "var(--color-category-option)",
  オフ: "var(--color-category-off)",
};

export const RESERVATION_STATUS_LABELS: Record<string, string> = {
  confirmed: "予約確定",
  in_progress: "施術中",
  completed: "完了",
};

export const NAV_ITEMS = [
  { href: "/", label: "ダッシュボード", icon: "LayoutDashboard" },
  { href: "/reservations", label: "予約台帳", icon: "CalendarDays" },
  { href: "/pos", label: "レジ", icon: "ShoppingCart" },
  { href: "/customers", label: "顧客", icon: "Users" },
  { href: "/staff", label: "スタッフ", icon: "UserCog" },
  { href: "/reports", label: "帳票", icon: "BarChart3" },
  { href: "/settings", label: "設定", icon: "Settings" },
] as const;

export const TIMELINE_START_HOUR = 9;
export const TIMELINE_END_HOUR = 18;
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add lib/types.ts lib/constants.ts
git commit -m "add type definitions and constants for salon POS"
```

---

## Task 3: Mock Data

**Files:**
- Create: `lib/mock-data.ts`

- [ ] **Step 1: Create mock data file**

Create `lib/mock-data.ts` with all entities matching the reference app:

```typescript
import type { Staff, MenuItem, Customer, Reservation } from "./types";

export const staffList: Staff[] = [
  {
    id: "staff-1",
    name: "薬王",
    role: "ネイリスト",
    employmentType: "正社員",
    nominationFee: 0,
    color: "#E8909A",
    displayOrder: 1,
    status: "active",
  },
  {
    id: "staff-2",
    name: "倉本しおり",
    role: "ネイリスト",
    employmentType: "正社員",
    nominationFee: 1500,
    color: "#7DBDA5",
    displayOrder: 2,
    status: "active",
  },
  {
    id: "staff-3",
    name: "中尾みさき",
    role: "アイリスト",
    employmentType: "正社員",
    nominationFee: 0,
    color: "#9B8FCE",
    displayOrder: 3,
    status: "leave",
    leaveReason: "産休中",
  },
  {
    id: "staff-4",
    name: "溝口さあや",
    role: "アイリスト",
    employmentType: "業務委託",
    nominationFee: 1500,
    commissionRate: 45,
    color: "#E8C56D",
    displayOrder: 4,
    status: "active",
  },
];

export const menuItems: MenuItem[] = [
  // まつエク
  { id: "menu-1", name: "Flat Lash 100", category: "まつエク", price: 5000, duration: 60 },
  { id: "menu-2", name: "LED Flat Lash 120", category: "まつエク", price: 6800, duration: 75 },
  { id: "menu-3", name: "Volume Lash 120", category: "まつエク", price: 7500, duration: 90 },
  { id: "menu-4", name: "Flat Lash つけ放題", category: "まつエク", price: 8800, duration: 90 },
  // まつげパーマ
  { id: "menu-5", name: "まつげパーマ", category: "まつげパーマ", price: 5500, duration: 60 },
  { id: "menu-6", name: "パリジェンヌラッシュ", category: "まつげパーマ", price: 6500, duration: 70 },
  // ネイル
  { id: "menu-7", name: "ワンカラー", category: "ネイル", price: 5500, duration: 60 },
  { id: "menu-8", name: "定額サンプルA", category: "ネイル", price: 7500, duration: 75 },
  { id: "menu-9", name: "定額サンプルB", category: "ネイル", price: 8500, duration: 90 },
  { id: "menu-10", name: "アート放題", category: "ネイル", price: 10000, duration: 120 },
  { id: "menu-11", name: "ジェルオフ+ワンカラー", category: "ネイル", price: 7000, duration: 90 },
  { id: "menu-12", name: "フットワンカラー", category: "ネイル", price: 6500, duration: 70 },
  // アイブロウ
  { id: "menu-13", name: "アイブロウスタイリング", category: "アイブロウ", price: 5500, duration: 45 },
  { id: "menu-14", name: "アイブロウワックス", category: "アイブロウ", price: 4800, duration: 30 },
  // オプション
  { id: "menu-15", name: "コーティング", category: "オプション", price: 500, duration: 5 },
  { id: "menu-16", name: "目元パック", category: "オプション", price: 800, duration: 10 },
  { id: "menu-17", name: "まつげトリートメント", category: "オプション", price: 1100, duration: 10 },
  // オフ
  { id: "menu-18", name: "まつエクオフ", category: "オフ", price: 2000, duration: 30 },
  { id: "menu-19", name: "ジェルネイルオフ", category: "オフ", price: 3000, duration: 30 },
];

export const customers: Customer[] = [
  {
    id: "cust-1",
    name: "山田 美咲",
    nameKana: "ヤマダ ミサキ",
    phone: "090-1234-5678",
    source: "hotpepper",
    visitCount: 12,
    lastVisit: "2026-03-16",
    memo: "Cカール希望。アレルギー特になし",
  },
  {
    id: "cust-2",
    name: "田中 あゆみ",
    nameKana: "タナカ アユミ",
    phone: "090-2345-6789",
    source: "line",
    visitCount: 8,
    lastVisit: "2026-03-23",
  },
  {
    id: "cust-3",
    name: "佐藤 りな",
    nameKana: "サトウ リナ",
    phone: "090-3456-7890",
    source: "walkin",
    visitCount: 3,
    lastVisit: "2026-02-28",
  },
  {
    id: "cust-4",
    name: "高橋 まい",
    nameKana: "タカハシ マイ",
    phone: "090-4567-8901",
    source: "google",
    visitCount: 18,
    lastVisit: "2026-03-27",
  },
  {
    id: "cust-5",
    name: "中村 ゆい",
    nameKana: "ナカムラ ユイ",
    phone: "090-5678-9012",
    source: "hotpepper",
    visitCount: 6,
    lastVisit: "2026-03-09",
  },
  {
    id: "cust-6",
    name: "小林 はるか",
    nameKana: "コバヤシ ハルカ",
    phone: "090-6789-0123",
    source: "hotpepper",
    visitCount: 4,
    lastVisit: "2026-03-25",
  },
  {
    id: "cust-7",
    name: "渡辺 さくら",
    nameKana: "ワタナベ サクラ",
    phone: "090-7890-1234",
    source: "line",
    visitCount: 5,
    lastVisit: "2026-03-29",
  },
  {
    id: "cust-8",
    name: "伊藤 かれん",
    nameKana: "イトウ カレン",
    phone: "090-8901-2345",
    source: "walkin",
    visitCount: 1,
    lastVisit: "2026-03-30",
  },
];

export const reservations: Reservation[] = [
  {
    id: "res-1",
    customerId: "cust-1",
    staffId: "staff-1",
    menuItemIds: ["menu-7"],
    date: "2026-03-30",
    startTime: "09:00",
    endTime: "10:00",
    space: "ネイルデスク",
    source: "hotpepper",
    status: "completed",
  },
  {
    id: "res-2",
    customerId: "cust-2",
    staffId: "staff-4",
    menuItemIds: ["menu-1"],
    date: "2026-03-30",
    startTime: "09:30",
    endTime: "10:30",
    space: "まつエクベッド",
    source: "line",
    status: "completed",
  },
  {
    id: "res-3",
    customerId: "cust-4",
    staffId: "staff-2",
    menuItemIds: ["menu-8"],
    date: "2026-03-30",
    startTime: "10:00",
    endTime: "11:15",
    space: "ネイルデスク",
    source: "google",
    status: "completed",
  },
  {
    id: "res-4",
    customerId: "cust-6",
    staffId: "staff-4",
    menuItemIds: ["menu-3"],
    date: "2026-03-30",
    startTime: "11:00",
    endTime: "12:30",
    space: "まつエクベッド",
    source: "hotpepper",
    status: "completed",
  },
  {
    id: "res-5",
    customerId: "cust-5",
    staffId: "staff-1",
    menuItemIds: ["menu-9"],
    date: "2026-03-30",
    startTime: "10:30",
    endTime: "12:00",
    space: "ネイルデスク",
    source: "hotpepper",
    status: "in_progress",
  },
  {
    id: "res-6",
    customerId: "cust-7",
    staffId: "staff-2",
    menuItemIds: ["menu-10"],
    date: "2026-03-30",
    startTime: "12:00",
    endTime: "14:00",
    space: "ネイルデスク",
    source: "line",
    status: "in_progress",
  },
  {
    id: "res-7",
    customerId: "cust-3",
    staffId: "staff-4",
    menuItemIds: ["menu-5"],
    date: "2026-03-30",
    startTime: "13:00",
    endTime: "14:00",
    space: "まつエクベッド",
    source: "walkin",
    status: "confirmed",
  },
  {
    id: "res-8",
    customerId: "cust-8",
    staffId: "staff-1",
    menuItemIds: ["menu-11"],
    date: "2026-03-30",
    startTime: "13:00",
    endTime: "14:30",
    space: "ネイルデスク",
    source: "walkin",
    status: "confirmed",
  },
  {
    id: "res-9",
    customerId: "cust-2",
    staffId: "staff-4",
    menuItemIds: ["menu-13"],
    date: "2026-03-30",
    startTime: "14:30",
    endTime: "15:15",
    space: "まつエクベッド",
    source: "line",
    status: "confirmed",
  },
  {
    id: "res-10",
    customerId: "cust-4",
    staffId: "staff-2",
    menuItemIds: ["menu-7", "menu-15"],
    date: "2026-03-30",
    startTime: "15:00",
    endTime: "16:15",
    space: "ネイルデスク",
    source: "google",
    status: "confirmed",
  },
];

// Dashboard KPI data (hardcoded summary values matching reference)
export const dashboardKpi = {
  today: {
    sales: 185200,
    salesChange: 8.5,
    customerCount: 22,
    customerCountChange: 4.2,
    newCustomerRate: 18.2,
    newCustomerRateChange: -2.1,
    avgSpend: 8418,
    avgSpendChange: 3.8,
  },
};

export const staffKpiData = [
  {
    staffId: "staff-1",
    customerCount: 6,
    newCount: 1,
    repeatRate: 83.3,
    avgSpend: 7200,
    hourlyRevenue: 5400,
    totalSales: 43200,
  },
  {
    staffId: "staff-2",
    customerCount: 7,
    newCount: 1,
    repeatRate: 85.7,
    avgSpend: 8900,
    hourlyRevenue: 7800,
    totalSales: 62300,
  },
  {
    staffId: "staff-3",
    customerCount: 0,
    newCount: 0,
    repeatRate: 0,
    avgSpend: 0,
    hourlyRevenue: 0,
    totalSales: 0,
  },
  {
    staffId: "staff-4",
    customerCount: 9,
    newCount: 2,
    repeatRate: 77.8,
    avgSpend: 8850,
    hourlyRevenue: 8200,
    totalSales: 79700,
  },
];

export const categorySalesData = [
  { category: "まつエク" as const, count: 9, amount: 68500, percentage: 37.0 },
  { category: "ネイル" as const, count: 8, amount: 62000, percentage: 33.5 },
  { category: "まつげパーマ" as const, count: 5, amount: 27500, percentage: 14.8 },
  { category: "アイブロウ" as const, count: 3, amount: 19800, percentage: 10.7 },
  { category: "オプション" as const, count: 5, amount: 4400, percentage: 2.4 },
  { category: "オフ" as const, count: 1, amount: 3000, percentage: 1.6 },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add lib/mock-data.ts
git commit -m "add mock data for staff, menu, customers, reservations, and dashboard KPIs"
```

---

## Task 4: Common Layout — Sidebar

**Files:**
- Create: `components/layout/sidebar.tsx`

- [ ] **Step 1: Create sidebar component**

Create `components/layout/sidebar.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  ShoppingCart,
  Users,
  UserCog,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  CalendarDays,
  ShoppingCart,
  Users,
  UserCog,
  BarChart3,
  Settings,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-sidebar border-r border-border flex flex-col z-40">
      <div className="p-6">
        <Link href="/" className="text-xl font-bold text-primary">
          #She
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = ICON_MAP[item.icon];

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-active text-sidebar-active-foreground"
                  : "text-sidebar-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 text-xs text-muted-foreground">v0.1.0</div>
    </aside>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/sidebar.tsx
git commit -m "add sidebar navigation component with active state"
```

---

## Task 5: Common Layout — Header

**Files:**
- Create: `components/layout/header.tsx`

- [ ] **Step 1: Create header component**

Create `components/layout/header.tsx`:

```tsx
"use client";

import { usePathname } from "next/navigation";
import { Store } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";

function getPageTitle(pathname: string): string {
  if (pathname === "/") return "ダッシュボード";
  const item = NAV_ITEMS.find(
    (nav) => nav.href !== "/" && pathname.startsWith(nav.href)
  );
  return item?.label ?? "";
}

export function Header() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <h1 className="text-lg font-bold text-foreground">{title}</h1>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm text-muted-foreground">
          <Store className="h-4 w-4" />
          <span>all</span>
        </div>

        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
          YM
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/header.tsx
git commit -m "add header component with page title, store selector, and avatar"
```

---

## Task 6: Root Layout Integration

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Update root layout to include sidebar and header**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "#She nail & eyelash POS",
  description: "Salon POS Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-background text-foreground antialiased">
        <Sidebar />
        <div className="ml-60 min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Update dashboard page placeholder**

Replace `app/page.tsx` with:

```tsx
export default function DashboardPage() {
  return (
    <div className="text-muted-foreground">
      ダッシュボード（実装中）
    </div>
  );
}
```

- [ ] **Step 3: Verify layout renders**

```bash
npm run dev
```

Open `http://localhost:3000` — should show sidebar on left with 7 nav links, header with "ダッシュボード" title, and placeholder content. Click nav links to verify routing works and active state highlights correctly. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "integrate sidebar and header into root layout"
```

---

## Task 7: Dashboard — KPI Cards

**Files:**
- Create: `components/dashboard/kpi-cards.tsx`

- [ ] **Step 1: Create KPI cards component**

Create `components/dashboard/kpi-cards.tsx`:

```tsx
import { Wallet, Users, UserPlus, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type KpiItem = {
  label: string;
  value: string;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
};

export function KpiCards({ data }: {
  data: {
    sales: number;
    salesChange: number;
    customerCount: number;
    customerCountChange: number;
    newCustomerRate: number;
    newCustomerRateChange: number;
    avgSpend: number;
    avgSpendChange: number;
  };
}) {
  const items: KpiItem[] = [
    {
      label: "本日売上",
      value: `¥${data.sales.toLocaleString()}`,
      change: data.salesChange,
      icon: Wallet,
    },
    {
      label: "入客数",
      value: `${data.customerCount}名`,
      change: data.customerCountChange,
      icon: Users,
    },
    {
      label: "新規率",
      value: `${data.newCustomerRate}%`,
      change: data.newCustomerRateChange,
      icon: UserPlus,
    },
    {
      label: "平均客単価",
      value: `¥${data.avgSpend.toLocaleString()}`,
      change: data.avgSpendChange,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-kpi-card rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <item.icon className="h-5 w-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{item.value}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp
              className={cn(
                "h-3 w-3",
                item.change >= 0 ? "text-success" : "text-danger rotate-180"
              )}
            />
            <span
              className={cn(
                "text-xs font-medium",
                item.change >= 0 ? "text-success" : "text-danger"
              )}
            >
              {item.change >= 0 ? "+" : ""}
              {item.change}%
            </span>
            <span className="text-xs text-muted-foreground">前週比</span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/dashboard/kpi-cards.tsx
git commit -m "add dashboard KPI cards component"
```

---

## Task 8: Dashboard — Period Tabs

**Files:**
- Create: `components/dashboard/period-tabs.tsx`

- [ ] **Step 1: Create period tabs component**

Create `components/dashboard/period-tabs.tsx`:

```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const PERIODS = ["今日", "今週", "今月", "カスタム"] as const;

export function PeriodTabs() {
  const [active, setActive] = useState<string>("今日");

  const today = new Date();
  const dateLabel = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-1 bg-muted rounded-lg p-1">
        {PERIODS.map((period) => (
          <button
            key={period}
            onClick={() => setActive(period)}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
              active === period
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {period}
          </button>
        ))}
      </div>
      <span className="text-sm text-muted-foreground">{dateLabel}</span>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/dashboard/period-tabs.tsx
git commit -m "add dashboard period tabs component"
```

---

## Task 9: Dashboard — Staff KPI Table

**Files:**
- Create: `components/dashboard/staff-kpi-table.tsx`

- [ ] **Step 1: Create staff KPI table component**

Create `components/dashboard/staff-kpi-table.tsx`:

```tsx
import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Staff } from "@/lib/types";

type StaffKpi = {
  staffId: string;
  customerCount: number;
  newCount: number;
  repeatRate: number;
  avgSpend: number;
  hourlyRevenue: number;
  totalSales: number;
};

export function StaffKpiTable({
  staffList,
  kpiData,
}: {
  staffList: Staff[];
  kpiData: StaffKpi[];
}) {
  // Find top performer (highest totalSales among active staff)
  const topStaffId = kpiData
    .filter((k) => k.totalSales > 0)
    .sort((a, b) => b.totalSales - a.totalSales)[0]?.staffId;

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-base font-bold mb-4">スタッフ別KPI</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>スタッフ名</TableHead>
            <TableHead>役職</TableHead>
            <TableHead className="text-right">入客数</TableHead>
            <TableHead className="text-right">新規数</TableHead>
            <TableHead className="text-right">リピート率</TableHead>
            <TableHead className="text-right">客単価</TableHead>
            <TableHead className="text-right">時間単価</TableHead>
            <TableHead className="text-right">売上合計</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffList.map((staff) => {
            const kpi = kpiData.find((k) => k.staffId === staff.id);
            const isOnLeave = staff.status === "leave";
            const isTop = staff.id === topStaffId;

            return (
              <TableRow
                key={staff.id}
                className={cn(isOnLeave && "opacity-40")}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {isTop && (
                      <span className="flex items-center gap-0.5 text-xs text-amber-500 font-bold">
                        <Trophy className="h-3.5 w-3.5" />
                        TOP
                      </span>
                    )}
                    <span className="font-medium">{staff.name}</span>
                    {isOnLeave && (
                      <span className="text-xs text-muted-foreground">
                        {staff.leaveReason}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {staff.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {isOnLeave ? "—" : kpi?.customerCount}
                </TableCell>
                <TableCell className="text-right">
                  {isOnLeave ? "—" : kpi?.newCount}
                </TableCell>
                <TableCell className="text-right">
                  {isOnLeave ? "—" : `${kpi?.repeatRate}%`}
                </TableCell>
                <TableCell className="text-right">
                  {isOnLeave ? "—" : `¥${kpi?.avgSpend.toLocaleString()}`}
                </TableCell>
                <TableCell className="text-right">
                  {isOnLeave
                    ? "—"
                    : `¥${kpi?.hourlyRevenue.toLocaleString()}`}
                </TableCell>
                <TableCell className="text-right">
                  {isOnLeave ? "—" : `¥${kpi?.totalSales.toLocaleString()}`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/dashboard/staff-kpi-table.tsx
git commit -m "add staff KPI table component with TOP badge and leave status"
```

---

## Task 10: Dashboard — Category Sales

**Files:**
- Create: `components/dashboard/category-sales.tsx`

- [ ] **Step 1: Create category sales component**

Create `components/dashboard/category-sales.tsx`:

```tsx
import { CATEGORY_COLORS } from "@/lib/constants";
import type { Category } from "@/lib/types";

type CategorySale = {
  category: Category;
  count: number;
  amount: number;
  percentage: number;
};

export function CategorySales({ data }: { data: CategorySale[] }) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-base font-bold mb-4">カテゴリ別売上</h3>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.category}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[item.category] }}
                />
                <span className="text-sm font-medium">{item.category}</span>
                <span className="text-xs text-muted-foreground">
                  ({item.count}件)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">
                  ¥{item.amount.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: CATEGORY_COLORS[item.category],
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <span className="text-sm font-bold">合計</span>
        <span className="text-sm font-bold">¥{total.toLocaleString()}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/dashboard/category-sales.tsx
git commit -m "add category sales breakdown component with progress bars"
```

---

## Task 11: Dashboard Page Assembly

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Assemble the dashboard page**

Replace `app/page.tsx` with:

```tsx
import { PeriodTabs } from "@/components/dashboard/period-tabs";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { StaffKpiTable } from "@/components/dashboard/staff-kpi-table";
import { CategorySales } from "@/components/dashboard/category-sales";
import {
  dashboardKpi,
  staffList,
  staffKpiData,
  categorySalesData,
} from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PeriodTabs />
      <KpiCards data={dashboardKpi.today} />
      <div className="grid grid-cols-2 gap-6">
        <StaffKpiTable staffList={staffList} kpiData={staffKpiData} />
        <CategorySales data={categorySalesData} />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify dashboard renders correctly**

```bash
npm run dev
```

Open `http://localhost:3000` — compare with reference app dashboard. Check:
- 4 KPI cards with values and change percentages
- Staff KPI table with TOP badge on 溝口さあや, faded row for 中尾みさき
- Category sales with colored progress bars and totals
- Period tabs switch active state on click

Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "assemble dashboard page with KPI cards, staff table, and category sales"
```

---

## Task 12: Reservations — Day Navigator and Source Legend

**Files:**
- Create: `components/reservations/day-navigator.tsx`, `components/reservations/source-legend.tsx`

- [ ] **Step 1: Create day navigator**

Create `components/reservations/day-navigator.tsx`:

```tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

function formatDate(date: Date): string {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} (${days[date.getDay()]})`;
}

export function DayNavigator({
  date,
  onDateChange,
  onNewReservation,
}: {
  date: Date;
  onDateChange: (date: Date) => void;
  onNewReservation: () => void;
}) {
  const prev = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    onDateChange(d);
  };

  const next = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    onDateChange(d);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <button
          onClick={prev}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-lg font-bold min-w-48 text-center">
          {formatDate(date)}
        </span>
        <button
          onClick={next}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <Button onClick={onNewReservation} className="gap-1">
        <Plus className="h-4 w-4" />
        新規予約
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Create source legend**

Create `components/reservations/source-legend.tsx`:

```tsx
import { SOURCE_COLORS, SOURCE_LABELS } from "@/lib/constants";
import type { Source } from "@/lib/types";

const SOURCES: Source[] = ["hotpepper", "line", "google", "phone", "walkin"];

export function SourceLegend() {
  return (
    <div className="flex items-center gap-4 mb-4">
      {SOURCES.map((source) => (
        <div key={source} className="flex items-center gap-1.5">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: SOURCE_COLORS[source] }}
          />
          <span className="text-xs text-muted-foreground">
            {SOURCE_LABELS[source]}
          </span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/reservations/day-navigator.tsx components/reservations/source-legend.tsx
git commit -m "add reservations day navigator and source legend components"
```

---

## Task 13: Reservations — Timeline Grid and Reservation Block

**Files:**
- Create: `components/reservations/reservation-block.tsx`, `components/reservations/timeline-grid.tsx`

- [ ] **Step 1: Create reservation block component**

Create `components/reservations/reservation-block.tsx`:

```tsx
import { Badge } from "@/components/ui/badge";
import { SOURCE_COLORS, RESERVATION_STATUS_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Reservation, Customer, MenuItem } from "@/lib/types";

export function ReservationBlock({
  reservation,
  customer,
  menuItems,
  timelineStartHour,
  timelineEndHour,
}: {
  reservation: Reservation;
  customer: Customer | undefined;
  menuItems: MenuItem[];
  timelineStartHour: number;
  timelineEndHour: number;
}) {
  const totalMinutes = (timelineEndHour - timelineStartHour) * 60;

  const [startH, startM] = reservation.startTime.split(":").map(Number);
  const [endH, endM] = reservation.endTime.split(":").map(Number);
  const startOffset = (startH - timelineStartHour) * 60 + startM;
  const duration = (endH - timelineStartHour) * 60 + endM - startOffset;

  const leftPercent = (startOffset / totalMinutes) * 100;
  const widthPercent = (duration / totalMinutes) * 100;

  const menuNames = reservation.menuItemIds
    .map((id) => menuItems.find((m) => m.id === id)?.name)
    .filter(Boolean)
    .join(", ");

  const statusColors: Record<string, string> = {
    completed: "bg-green-100 text-green-700",
    in_progress: "bg-blue-100 text-blue-700",
    confirmed: "bg-gray-100 text-gray-600",
  };

  return (
    <div
      className="absolute top-1 bottom-1 rounded-lg px-2 py-1 text-xs overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-l-4"
      style={{
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
        backgroundColor: `${SOURCE_COLORS[reservation.source]}15`,
        borderLeftColor: SOURCE_COLORS[reservation.source],
      }}
    >
      <div className="flex items-center gap-1 truncate">
        <span className="font-medium truncate">
          {customer?.name ?? "不明"}
        </span>
        <Badge
          className={cn(
            "text-[10px] px-1 py-0 h-4 shrink-0",
            statusColors[reservation.status]
          )}
        >
          {RESERVATION_STATUS_LABELS[reservation.status]}
        </Badge>
      </div>
      <div className="text-muted-foreground truncate">{menuNames}</div>
    </div>
  );
}
```

- [ ] **Step 2: Create timeline grid component**

Create `components/reservations/timeline-grid.tsx`:

```tsx
import { ReservationBlock } from "./reservation-block";
import { Badge } from "@/components/ui/badge";
import { TIMELINE_START_HOUR, TIMELINE_END_HOUR } from "@/lib/constants";
import type { Staff, Reservation, Customer, MenuItem } from "@/lib/types";

export function TimelineGrid({
  staffList,
  reservations,
  customers,
  menuItems,
}: {
  staffList: Staff[];
  reservations: Reservation[];
  customers: Customer[];
  menuItems: MenuItem[];
}) {
  const hours = Array.from(
    { length: TIMELINE_END_HOUR - TIMELINE_START_HOUR + 1 },
    (_, i) => TIMELINE_START_HOUR + i
  );

  const activeStaff = staffList.filter((s) => s.status === "active");

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Header row with time labels */}
      <div className="grid border-b border-border" style={{ gridTemplateColumns: `160px repeat(${hours.length}, 1fr)` }}>
        <div className="p-3 border-r border-border bg-muted/50" />
        {hours.map((hour) => (
          <div
            key={hour}
            className="p-2 text-center text-xs text-muted-foreground border-r border-border last:border-r-0 bg-muted/50"
          >
            {hour}:00
          </div>
        ))}
      </div>

      {/* Staff rows */}
      {activeStaff.map((staff) => {
        const staffReservations = reservations.filter(
          (r) => r.staffId === staff.id
        );

        return (
          <div
            key={staff.id}
            className="grid border-b border-border last:border-b-0"
            style={{ gridTemplateColumns: `160px 1fr` }}
          >
            {/* Staff name cell */}
            <div className="p-3 border-r border-border flex flex-col justify-center">
              <span className="font-medium text-sm">{staff.name}</span>
              <Badge variant="secondary" className="text-xs w-fit mt-0.5">
                {staff.role}
              </Badge>
            </div>

            {/* Timeline cell */}
            <div className="relative h-16">
              {/* Hour grid lines */}
              <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${hours.length}, 1fr)` }}>
                {hours.map((hour) => (
                  <div key={hour} className="border-r border-border/50 last:border-r-0" />
                ))}
              </div>

              {/* Reservation blocks */}
              {staffReservations.map((res) => (
                <ReservationBlock
                  key={res.id}
                  reservation={res}
                  customer={customers.find((c) => c.id === res.customerId)}
                  menuItems={menuItems}
                  timelineStartHour={TIMELINE_START_HOUR}
                  timelineEndHour={TIMELINE_END_HOUR}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/reservations/reservation-block.tsx components/reservations/timeline-grid.tsx
git commit -m "add reservation timeline grid with gantt chart blocks"
```

---

## Task 14: Reservations — New Reservation Dialog

**Files:**
- Create: `components/reservations/new-reservation-dialog.tsx`

- [ ] **Step 1: Create new reservation dialog**

Create `components/reservations/new-reservation-dialog.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SOURCE_COLORS, SOURCE_LABELS, CATEGORY_COLORS } from "@/lib/constants";
import type { Customer, Staff, MenuItem, Source, TreatmentSpace, Category } from "@/lib/types";

const SOURCES: Source[] = ["hotpepper", "line", "google", "phone", "walkin"];
const SPACES: TreatmentSpace[] = ["まつエクベッド", "ネイルデスク"];
const MENU_CATEGORIES: Category[] = ["まつエク", "まつげパーマ", "ネイル", "アイブロウ", "オプション", "オフ"];

export function NewReservationDialog({
  open,
  onClose,
  customers,
  staffList,
  menuItems,
}: {
  open: boolean;
  onClose: () => void;
  customers: Customer[];
  staffList: Staff[];
  menuItems: MenuItem[];
}) {
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<TreatmentSpace | null>(null);

  if (!open) return null;

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.includes(customerSearch) ||
      c.nameKana.includes(customerSearch) ||
      c.phone.includes(customerSearch)
  );

  const activeStaff = staffList.filter((s) => s.status === "active");

  const toggleMenu = (id: string) => {
    setSelectedMenus((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-[520px] bg-card h-full overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold">新規予約</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Customer selection */}
          <section>
            <h3 className="text-sm font-bold mb-2">顧客選択</h3>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="名前・かな・電話番号で検索"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer.id)}
                  className={cn(
                    "w-full text-left p-2 rounded-lg text-sm flex items-center justify-between hover:bg-muted transition-colors",
                    selectedCustomer === customer.id && "bg-secondary"
                  )}
                >
                  <div>
                    <span className="font-medium">{customer.name}</span>
                    <span className="text-muted-foreground ml-2 text-xs">
                      {customer.nameKana}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {customer.phone}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Staff selection */}
          <section>
            <h3 className="text-sm font-bold mb-2">担当スタッフ</h3>
            <div className="grid grid-cols-3 gap-2">
              {activeStaff.map((staff) => (
                <button
                  key={staff.id}
                  onClick={() => setSelectedStaff(staff.id)}
                  className={cn(
                    "p-3 rounded-lg border text-center text-sm transition-colors",
                    selectedStaff === staff.id
                      ? "border-primary bg-secondary"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="font-medium">{staff.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {staff.role}
                  </div>
                  <div className="text-xs text-primary mt-1">
                    {staff.nominationFee > 0
                      ? `指名料 ¥${staff.nominationFee.toLocaleString()}`
                      : "指名料 無料"}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Menu selection */}
          <section>
            <h3 className="text-sm font-bold mb-2">メニュー選択</h3>
            {MENU_CATEGORIES.map((category) => {
              const items = menuItems.filter((m) => m.category === category);
              if (items.length === 0) return null;
              return (
                <div key={category} className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[category] }}
                    />
                    <span className="text-xs font-medium text-muted-foreground">
                      {category}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => toggleMenu(item.id)}
                        className={cn(
                          "p-2 rounded-lg border text-left text-xs transition-colors",
                          selectedMenus.includes(item.id)
                            ? "border-primary bg-secondary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="font-medium">{item.name}</div>
                        <div className="text-primary">
                          ¥{item.price.toLocaleString()} / {item.duration}分
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Treatment space */}
          <section>
            <h3 className="text-sm font-bold mb-2">施術スペース</h3>
            <div className="flex gap-2">
              {SPACES.map((space) => (
                <button
                  key={space}
                  onClick={() => setSelectedSpace(space)}
                  className={cn(
                    "px-4 py-2 rounded-lg border text-sm transition-colors",
                    selectedSpace === space
                      ? "border-primary bg-secondary"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {space}
                </button>
              ))}
            </div>
          </section>

          {/* Source */}
          <section>
            <h3 className="text-sm font-bold mb-2">流入元</h3>
            <div className="flex gap-2 flex-wrap">
              {SOURCES.map((source) => (
                <button
                  key={source}
                  onClick={() => setSelectedSource(source)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-colors",
                    selectedSource === source
                      ? "border-primary bg-secondary"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: SOURCE_COLORS[source] }}
                  />
                  {SOURCE_LABELS[source]}
                </button>
              ))}
            </div>
          </section>

          {/* Memo */}
          <section>
            <h3 className="text-sm font-bold mb-2">メモ</h3>
            <textarea
              className="w-full border border-border rounded-lg p-2 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="メモを入力..."
            />
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4 flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            キャンセル
          </Button>
          <Button className="flex-1">予約を保存</Button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/reservations/new-reservation-dialog.tsx
git commit -m "add new reservation slide-out dialog with customer/staff/menu selection"
```

---

## Task 15: Reservations Page Assembly

**Files:**
- Create: `app/reservations/page.tsx`

- [ ] **Step 1: Assemble reservations page**

Create `app/reservations/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { DayNavigator } from "@/components/reservations/day-navigator";
import { SourceLegend } from "@/components/reservations/source-legend";
import { TimelineGrid } from "@/components/reservations/timeline-grid";
import { NewReservationDialog } from "@/components/reservations/new-reservation-dialog";
import {
  staffList,
  reservations,
  customers,
  menuItems,
} from "@/lib/mock-data";

export default function ReservationsPage() {
  const [date, setDate] = useState(new Date(2026, 2, 30));
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <DayNavigator
        date={date}
        onDateChange={setDate}
        onNewReservation={() => setDialogOpen(true)}
      />
      <SourceLegend />
      <TimelineGrid
        staffList={staffList}
        reservations={reservations}
        customers={customers}
        menuItems={menuItems}
      />
      <NewReservationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        customers={customers}
        staffList={staffList}
        menuItems={menuItems}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify reservations page renders**

```bash
npm run dev
```

Open `http://localhost:3000/reservations` — compare with reference. Check:
- Day navigator shows 2026/3/30
- Source legend with 5 colored dots
- Timeline grid with 3 active staff rows and reservation blocks
- "新規予約" button opens slide-out dialog
- Dialog has customer search, staff cards, menu selection, source selection

Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/reservations/page.tsx
git commit -m "assemble reservations page with timeline and new reservation dialog"
```

---

## Task 16: POS — Menu Components

**Files:**
- Create: `components/pos/menu-search.tsx`, `components/pos/category-tabs.tsx`, `components/pos/menu-card.tsx`, `components/pos/menu-grid.tsx`

- [ ] **Step 1: Create menu search component**

Create `components/pos/menu-search.tsx`:

```tsx
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function MenuSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="メニュー名で検索..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
```

- [ ] **Step 2: Create category tabs component**

Create `components/pos/category-tabs.tsx`:

```tsx
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

const CATEGORIES: Category[] = [
  "まつエク",
  "まつげパーマ",
  "ネイル",
  "アイブロウ",
  "セルフ脱毛",
  "オプション",
  "オフ",
];

export function CategoryTabs({
  active,
  onChange,
}: {
  active: Category;
  onChange: (category: Category) => void;
}) {
  return (
    <div className="flex gap-1.5 flex-wrap mb-4">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
            active === category
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create menu card component**

Create `components/pos/menu-card.tsx`:

```tsx
import { Clock } from "lucide-react";
import type { MenuItem } from "@/lib/types";

export function MenuCard({
  item,
  onAdd,
}: {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}) {
  return (
    <button
      onClick={() => onAdd(item)}
      className="border border-border rounded-xl p-4 text-left hover:border-primary/50 hover:shadow-sm transition-all"
    >
      <div className="font-medium text-sm mb-1">{item.name}</div>
      <div className="text-primary font-bold text-base">
        ¥{item.price.toLocaleString()}
      </div>
      <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
        <Clock className="h-3 w-3" />
        {item.duration}分
      </div>
    </button>
  );
}
```

- [ ] **Step 4: Create menu grid component**

Create `components/pos/menu-grid.tsx`:

```tsx
import { MenuCard } from "./menu-card";
import type { MenuItem } from "@/lib/types";

export function MenuGrid({
  items,
  onAdd,
}: {
  items: MenuItem[];
  onAdd: (item: MenuItem) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12 text-sm">
        該当するメニューがありません
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} onAdd={onAdd} />
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/pos/menu-search.tsx components/pos/category-tabs.tsx components/pos/menu-card.tsx components/pos/menu-grid.tsx
git commit -m "add POS menu components: search, category tabs, card, and grid"
```

---

## Task 17: POS — Cart Component

**Files:**
- Create: `components/pos/cart.tsx`

- [ ] **Step 1: Create cart component**

Create `components/pos/cart.tsx`:

```tsx
"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { MenuItem, Staff } from "@/lib/types";

type CartItem = {
  menuItem: MenuItem;
  quantity: number;
};

export function Cart({
  items,
  staffList,
  onRemove,
  onClear,
}: {
  items: CartItem[];
  staffList: Staff[];
  onRemove: (menuItemId: string) => void;
  onClear: () => void;
}) {
  const activeStaff = staffList.filter((s) => s.status === "active");
  const subtotal = items.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );
  const total = subtotal;
  const hasItems = items.length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Staff selector */}
      <div className="mb-3">
        <label className="text-xs text-muted-foreground mb-1 block">
          担当スタッフ
        </label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            {activeStaff.map((staff) => (
              <SelectItem key={staff.id} value={staff.id}>
                {staff.name}（{staff.role}）
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Customer search */}
      <div className="mb-4">
        <label className="text-xs text-muted-foreground mb-1 block">顧客</label>
        <Input placeholder="名前・電話番号で検索" />
      </div>

      {/* Cart items */}
      <div className="flex-1 min-h-0">
        {!hasItems ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <ShoppingCart className="h-10 w-10 mb-2" />
            <span className="text-sm">メニューを選択してください</span>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.menuItem.id}
                className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
              >
                <div>
                  <div className="text-sm font-medium">
                    {item.menuItem.name}
                  </div>
                  <div className="text-xs text-primary">
                    ¥{item.menuItem.price.toLocaleString()}
                    {item.quantity > 1 && ` × ${item.quantity}`}
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.menuItem.id)}
                  className="p-1 text-muted-foreground hover:text-danger transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="border-t border-border pt-3 mt-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span>小計</span>
          <span>¥{subtotal.toLocaleString()}</span>
        </div>
        <button className="text-sm text-primary hover:underline">
          割引・クーポン
        </button>
        <div className="flex justify-between text-lg font-bold">
          <span>合計</span>
          <span>¥{total.toLocaleString()}</span>
        </div>
        <Button
          className="w-full"
          disabled={!hasItems}
        >
          会計に進む
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/pos/cart.tsx
git commit -m "add POS cart component with staff selector, items, and checkout"
```

---

## Task 18: POS Page Assembly

**Files:**
- Create: `app/pos/page.tsx`

- [ ] **Step 1: Assemble POS page**

Create `app/pos/page.tsx`:

```tsx
"use client";

import { useState, useMemo } from "react";
import { MenuSearch } from "@/components/pos/menu-search";
import { CategoryTabs } from "@/components/pos/category-tabs";
import { MenuGrid } from "@/components/pos/menu-grid";
import { Cart } from "@/components/pos/cart";
import { menuItems, staffList } from "@/lib/mock-data";
import type { Category, MenuItem } from "@/lib/types";

type CartItem = {
  menuItem: MenuItem;
  quantity: number;
};

export default function PosPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("まつエク");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = item.category === activeCategory;
      const matchesSearch =
        search === "" || item.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.menuItem.id === item.id
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const removeFromCart = (menuItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.menuItem.id !== menuItemId));
  };

  const clearCart = () => setCartItems([]);

  return (
    <div className="flex gap-6 h-[calc(100vh-64px-48px)]">
      {/* Left panel — Menu selection */}
      <div className="flex-[1.2] overflow-y-auto">
        <MenuSearch value={search} onChange={setSearch} />
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
        <MenuGrid items={filteredItems} onAdd={addToCart} />
      </div>

      {/* Right panel — Cart */}
      <div className="flex-[0.8] bg-muted/30 rounded-xl p-4 border border-border">
        <Cart
          items={cartItems}
          staffList={staffList}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify POS page renders**

```bash
npm run dev
```

Open `http://localhost:3000/pos` — compare with reference. Check:
- Search bar filters menu items
- Category tabs switch displayed menu cards
- Clicking a menu card adds it to the cart
- Cart shows items with remove button, subtotal, and total
- "会計に進む" button is disabled when cart is empty, enabled when items added

Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/pos/page.tsx
git commit -m "assemble POS page with menu selection and cart"
```

---

## Task 19: Placeholder Pages for Phase 2 & 3

**Files:**
- Create: `app/customers/page.tsx`, `app/staff/page.tsx`, `app/reports/page.tsx`, `app/settings/page.tsx`

- [ ] **Step 1: Create placeholder pages**

Create `app/customers/page.tsx`:

```tsx
export default function CustomersPage() {
  return <div className="text-muted-foreground">顧客管理（Phase 2で実装）</div>;
}
```

Create `app/staff/page.tsx`:

```tsx
export default function StaffPage() {
  return <div className="text-muted-foreground">スタッフ管理（Phase 2で実装）</div>;
}
```

Create `app/reports/page.tsx`:

```tsx
export default function ReportsPage() {
  return <div className="text-muted-foreground">帳票・分析（Phase 3で実装）</div>;
}
```

Create `app/settings/page.tsx`:

```tsx
export default function SettingsPage() {
  return <div className="text-muted-foreground">設定（Phase 3で実装）</div>;
}
```

- [ ] **Step 2: Verify all nav links work**

```bash
npm run dev
```

Click through all 7 nav links. Each should show the correct page title in the header and content area. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/customers/page.tsx app/staff/page.tsx app/reports/page.tsx app/settings/page.tsx
git commit -m "add placeholder pages for Phase 2 and Phase 3 routes"
```

---

## Task 20: Final Verification

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

Expected: No errors. Fix any issues found.

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Visual comparison**

```bash
npm run dev
```

Open `http://localhost:3000` side-by-side with `https://etre-salon-pos.vercel.app/`. Compare:
1. **Dashboard:** KPI cards, staff table, category sales — layout and data match
2. **Reservations:** Timeline grid, reservation blocks, new reservation dialog
3. **POS:** Menu grid, category tabs, cart functionality

Note any significant visual differences for follow-up fixes.

- [ ] **Step 4: Stop server and create .gitignore**

Add `.superpowers/` and screenshots to `.gitignore`:

```bash
echo ".superpowers/" >> .gitignore
echo "*.png" >> .gitignore
```

- [ ] **Step 5: Final commit**

```bash
git add .gitignore
git commit -m "add gitignore for superpowers and screenshot artifacts"
```
