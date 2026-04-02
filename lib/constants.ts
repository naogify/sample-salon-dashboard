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

export const STORES = [
  { id: "all", name: "全店舗" },
  { id: "store-1", name: "渋谷店" },
  { id: "store-2", name: "新宿店" },
  { id: "store-3", name: "池袋店" },
] as const;

export const TIMELINE_START_HOUR = 9;
export const TIMELINE_END_HOUR = 18;
