# #She Salon POS Dashboard — Design Spec

## Overview

Replicate the UI and page transitions of the reference app at `https://etre-salon-pos.vercel.app/` as a Next.js application. All data is mock/hardcoded — no backend integration.

**Reference app:** A POS dashboard for a nail & eyelash salon called "#She", featuring 7 pages: Dashboard, Reservations, POS, Customers, Staff, Reports, and Settings.

## Scope

- **UI clone with mock data** — faithful reproduction of the reference site's look, layout, and interactions
- **Japanese only** — no i18n
- **Phased delivery:**
  - Phase 1: Common layout, Dashboard, Reservations, POS
  - Phase 2: Customers (list + detail), Staff
  - Phase 3: Reports, Settings

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (Radix UI based) |
| Charts | Recharts (via shadcn/ui chart component) |
| Data | Static mock data in `lib/mock-data.ts` |

## Project Structure

```
sample-salon-dashbord/
├── app/
│   ├── layout.tsx              # Root layout (sidebar + header)
│   ├── page.tsx                # Dashboard
│   ├── reservations/
│   │   └── page.tsx            # Reservation timeline
│   ├── pos/
│   │   └── page.tsx            # POS register
│   ├── customers/
│   │   ├── page.tsx            # Customer list
│   │   └── [id]/
│   │       └── page.tsx        # Customer detail
│   ├── staff/
│   │   └── page.tsx            # Staff management
│   ├── reports/
│   │   └── page.tsx            # Reports & analytics
│   ├── settings/
│   │   └── page.tsx            # Settings
│   └── globals.css
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── layout/
│   │   ├── sidebar.tsx         # Sidebar navigation
│   │   └── header.tsx          # Page header (title + store selector + avatar)
│   ├── dashboard/
│   │   ├── period-tabs.tsx     # Period tabs (today/week/month/custom)
│   │   ├── kpi-cards.tsx       # 4 KPI summary cards
│   │   ├── staff-kpi-table.tsx # Staff KPI table
│   │   └── category-sales.tsx  # Category sales breakdown bars
│   ├── reservations/
│   │   ├── day-navigator.tsx   # Date navigation (prev/next day)
│   │   ├── source-legend.tsx   # Source color legend
│   │   ├── timeline-grid.tsx   # Gantt chart body (time axis + staff rows)
│   │   ├── reservation-block.tsx # Individual reservation block
│   │   └── new-reservation-dialog.tsx # New reservation slide panel
│   ├── pos/
│   │   ├── menu-search.tsx     # Search bar
│   │   ├── category-tabs.tsx   # Category filter tabs
│   │   ├── menu-grid.tsx       # Menu card grid
│   │   ├── menu-card.tsx       # Individual menu card
│   │   └── cart.tsx            # Cart (staff select, customer search, line items, total)
│   ├── customers/              # Phase 2
│   ├── staff/                  # Phase 2
│   ├── reports/                # Phase 3
│   └── settings/               # Phase 3
├── lib/
│   ├── mock-data.ts            # All mock data
│   ├── types.ts                # Type definitions
│   └── utils.ts                # Utilities (cn function, etc.)
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## Design System

### Color Palette

**Primary (pink/peach):**
| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#F9E8E8` | Sidebar active bg, light accents |
| Primary Light | `#F5C7C7` | Hover states |
| Primary | `#E8909A` | Buttons, active nav, badges |
| Primary Dark | `#D4707C` | Button hover |
| Card BG | `#FFF5F5` | KPI card backgrounds |

**Source badge colors:**
| Source | Color |
|--------|-------|
| HotPepper | `#F97316` (orange) |
| LINE | `#22C55E` (green) |
| Google | `#3B82F6` (blue) |
| Phone | `#9CA3AF` (gray) |
| Walk-in | `#EC4899` (pink) |

**Category colors (charts):**
| Category | Color |
|----------|-------|
| まつエク | `#F472B6` |
| ネイル | `#FB923C` |
| まつげパーマ | `#A78BFA` |
| アイブロウ | `#34D399` |
| オプション | `#60A5FA` |
| オフ | `#CBD5E1` |

**Base UI:**
| Token | Hex |
|-------|-----|
| White | `#FFFFFF` |
| Page BG | `#F9FAFB` |
| Text | `#1F2937` |
| Muted Text | `#6B7280` |

### Typography & Spacing

- **Font:** system-ui (Noto Sans JP or system default)
- **Border radius:** Cards 12px, Buttons 8px, Badges pill (999px)
- **Shadows:** Cards `shadow-sm`, hover `shadow-md`
- **Sidebar width:** 240px
- **Header height:** 64px

## Type Definitions

```typescript
// Source
type Source = "hotpepper" | "line" | "google" | "phone" | "walkin";

// Service category
type Category = "まつエク" | "まつげパーマ" | "ネイル" | "アイブロウ" | "セルフ脱毛" | "オプション" | "オフ";

// Treatment space
type TreatmentSpace = "まつエクベッド" | "ネイルデスク";

// Staff
type Staff = {
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

// Menu item
type MenuItem = {
  id: string;
  name: string;
  category: Category;
  price: number;
  duration: number; // minutes
};

// Customer
type Customer = {
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

// Reservation
type Reservation = {
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

// Payment
type Payment = {
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

// Chart record (treatment history)
type ChartRecord = {
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

## Mock Data Volume

| Entity | Count |
|--------|-------|
| Staff | 4 (matching reference: 薬王, 倉本しおり, 中尾みさき, 溝口さあや) |
| Customers | 8 (matching reference) |
| Menu items | ~20 across all categories |
| Reservations | ~10 for the sample day |
| Payments | ~5 |
| Chart records | ~3 |

## Page Designs

### Common Layout

- **Sidebar (240px, white bg):** "#She" logo at top, 7 nav links with icons, active state uses pink bg + pink text (via `usePathname`), version "v0.1.0" at bottom
- **Header (64px):** Page title (h1), store selector combobox ("all"), user avatar circle ("YM")

### Dashboard (`/`)

- **Period tabs:** Today (default) / This Week / This Month / Custom — switching tabs changes displayed date range text
- **4 KPI cards:** Sales, Customer count, New customer rate, Average spend — each shows value, week-over-week change (green up / red down arrow), "前週比" label
- **Staff KPI table:** Columns: name, role badge, customers, new customers, repeat rate, avg spend, hourly revenue, total sales. "TOP" crown badge on highest performer. Leave status shown as faded row with dashes.
- **Category sales:** Horizontal progress bars with category color dots, item count, amount, and percentage. Total row at bottom.

### Reservations (`/reservations`)

- **Day navigator:** Previous/next day buttons, current date display, "新規予約" button
- **Source legend:** Color-coded dots for 5 sources
- **Timeline grid:** Horizontal Gantt chart, 9:00–17:00+ columns, staff rows. Each reservation block shows customer name, menu, time span, status badge (確定/施術中/完了), colored by source. Cross-appointments shown with link icon.
- **New reservation dialog:** Slide-out panel with steps: customer select (search + list), staff select (cards with nomination fee), menu select (categorized), date/time, treatment space, source, memo, save/cancel.

### POS (`/pos`)

- **Two-column layout:**
  - Left (wider): Search bar, category filter tabs, menu card grid (name, price in pink, duration with clock icon)
  - Right: Staff selector dropdown, customer search, cart items list (empty state: cart icon + prompt), subtotal, discount/coupon expandable, total, "会計に進む" button (disabled when empty, enabled with pink bg when items added)

### Customers (`/customers`) — Phase 2

- **List page:** "8 customers, 8 displayed" count, "新規顧客" button, search bar, source filter buttons, 2-column card grid (name, kana, source badge, phone, visit count, last visit)
- **Detail page (`/customers/[id]`):** Back button, profile card (name, kana, edit button, phone, email, source, DOB, gender, visits, allergy, patch test, last visit, memo). Three tabs: カルテ履歴 (treatment records with technical details, photos, rating), 予約履歴 (reservation history with status badges), 会計履歴 (payment history with receipt details)

### Staff (`/staff`) — Phase 2

- **List page:** "4 staff (1 on leave)" count, "スタッフ追加" button, staff cards (name, role, employment type, nomination fee, status, color avatar). Leave staff shown faded with banner.
- **Detail dialog (modal):** Name, role, employment type, nomination fee, display order, color code, status.

### Reports (`/reports`) — Phase 3

- **Period tabs + CSV export button**
- **4 KPI cards:** Sales total, customer total, avg spend, nomination rate
- **Daily sales bar chart (Recharts):** 7-day trend, closed days marked "定休"
- **Category sales:** Horizontal stacked bar chart + legend table
- **Source breakdown:** Total reservations, source-wise count and percentage
- **Staff ranking:** Ranked list with avatar, name, role, total sales, customer count, nomination rate

### Settings (`/settings`) — Phase 3

- **Store info:** Name, address, phone (read-only display / editable inputs)
- **Treatment spaces:** Eyelash beds (number input), nail desks (number input)
- **Business hours:** Open time, close time, closed days
- **Integrations:** Square API, LINE Messaging API, Supabase — each with connected badge and disconnect button
- **App settings:** Theme toggle (light/dark), notification toggles (push, LINE, reminder)
- **Save button**

## Interactions (Client-Side State)

Since all data is mock, interactions use React state (`useState`) without persistence:

- **Dashboard:** Period tab switching filters displayed data
- **Reservations:** Day navigation changes displayed date, new reservation dialog opens/closes
- **POS:** Category tab filtering, search filtering, add/remove items from cart, total calculation
- **Customers:** Search and source filtering, tab switching on detail page
- **Staff:** Detail dialog open/close
- **Reports:** Period tab switching
- **Settings:** Form input changes (no actual save)
