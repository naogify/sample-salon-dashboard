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
  { id: "menu-1", name: "Flat Lash 100", category: "まつエク", price: 5000, duration: 60 },
  { id: "menu-2", name: "LED Flat Lash 120", category: "まつエク", price: 6800, duration: 75 },
  { id: "menu-3", name: "Volume Lash 120", category: "まつエク", price: 7500, duration: 90 },
  { id: "menu-4", name: "Flat Lash つけ放題", category: "まつエク", price: 8800, duration: 90 },
  { id: "menu-5", name: "まつげパーマ", category: "まつげパーマ", price: 5500, duration: 60 },
  { id: "menu-6", name: "パリジェンヌラッシュ", category: "まつげパーマ", price: 6500, duration: 70 },
  { id: "menu-7", name: "ワンカラー", category: "ネイル", price: 5500, duration: 60 },
  { id: "menu-8", name: "定額サンプルA", category: "ネイル", price: 7500, duration: 75 },
  { id: "menu-9", name: "定額サンプルB", category: "ネイル", price: 8500, duration: 90 },
  { id: "menu-10", name: "アート放題", category: "ネイル", price: 10000, duration: 120 },
  { id: "menu-11", name: "ジェルオフ+ワンカラー", category: "ネイル", price: 7000, duration: 90 },
  { id: "menu-12", name: "フットワンカラー", category: "ネイル", price: 6500, duration: 70 },
  { id: "menu-13", name: "アイブロウスタイリング", category: "アイブロウ", price: 5500, duration: 45 },
  { id: "menu-14", name: "アイブロウワックス", category: "アイブロウ", price: 4800, duration: 30 },
  { id: "menu-15", name: "コーティング", category: "オプション", price: 500, duration: 5 },
  { id: "menu-16", name: "目元パック", category: "オプション", price: 800, duration: 10 },
  { id: "menu-17", name: "まつげトリートメント", category: "オプション", price: 1100, duration: 10 },
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
  // 2026-03-31 (today)
  { id: "res-11", customerId: "cust-1", staffId: "staff-1", menuItemIds: ["menu-7"], date: "2026-03-31", startTime: "09:00", endTime: "10:00", space: "ネイルデスク", source: "hotpepper", status: "completed" },
  { id: "res-12", customerId: "cust-4", staffId: "staff-4", menuItemIds: ["menu-2"], date: "2026-03-31", startTime: "09:30", endTime: "10:45", space: "まつエクベッド", source: "google", status: "completed" },
  { id: "res-13", customerId: "cust-5", staffId: "staff-2", menuItemIds: ["menu-8"], date: "2026-03-31", startTime: "10:00", endTime: "11:15", space: "ネイルデスク", source: "hotpepper", status: "completed" },
  { id: "res-14", customerId: "cust-7", staffId: "staff-4", menuItemIds: ["menu-5"], date: "2026-03-31", startTime: "10:30", endTime: "11:30", space: "まつエクベッド", source: "line", status: "completed" },
  { id: "res-15", customerId: "cust-2", staffId: "staff-1", menuItemIds: ["menu-9"], date: "2026-03-31", startTime: "11:00", endTime: "12:30", space: "ネイルデスク", source: "line", status: "in_progress" },
  { id: "res-16", customerId: "cust-6", staffId: "staff-2", menuItemIds: ["menu-13"], date: "2026-03-31", startTime: "11:30", endTime: "12:15", space: "まつエクベッド", source: "hotpepper", status: "in_progress" },
  { id: "res-17", customerId: "cust-3", staffId: "staff-4", menuItemIds: ["menu-1"], date: "2026-03-31", startTime: "13:00", endTime: "14:00", space: "まつエクベッド", source: "walkin", status: "confirmed" },
  { id: "res-18", customerId: "cust-8", staffId: "staff-1", menuItemIds: ["menu-10"], date: "2026-03-31", startTime: "13:00", endTime: "15:00", space: "ネイルデスク", source: "walkin", status: "confirmed" },
  // 2026-03-24
  { id: "res-19", customerId: "cust-1", staffId: "staff-2", menuItemIds: ["menu-3"], date: "2026-03-24", startTime: "10:00", endTime: "11:30", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-20", customerId: "cust-4", staffId: "staff-1", menuItemIds: ["menu-8"], date: "2026-03-24", startTime: "10:00", endTime: "11:15", space: "ネイルデスク", source: "google", status: "completed" },
  { id: "res-21", customerId: "cust-5", staffId: "staff-4", menuItemIds: ["menu-13"], date: "2026-03-24", startTime: "11:00", endTime: "11:45", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-22", customerId: "cust-2", staffId: "staff-2", menuItemIds: ["menu-9"], date: "2026-03-24", startTime: "11:30", endTime: "13:00", space: "ネイルデスク", source: "line", status: "completed" },
  { id: "res-23", customerId: "cust-6", staffId: "staff-4", menuItemIds: ["menu-2"], date: "2026-03-24", startTime: "12:00", endTime: "13:15", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-24", customerId: "cust-7", staffId: "staff-1", menuItemIds: ["menu-11"], date: "2026-03-24", startTime: "13:00", endTime: "14:30", space: "ネイルデスク", source: "line", status: "completed" },
  { id: "res-25", customerId: "cust-3", staffId: "staff-4", menuItemIds: ["menu-5"], date: "2026-03-24", startTime: "14:00", endTime: "15:00", space: "まつエクベッド", source: "walkin", status: "completed" },
  { id: "res-26", customerId: "cust-8", staffId: "staff-2", menuItemIds: ["menu-7"], date: "2026-03-24", startTime: "14:00", endTime: "15:00", space: "ネイルデスク", source: "walkin", status: "completed" },
  // 2026-03-23
  { id: "res-27", customerId: "cust-1", staffId: "staff-4", menuItemIds: ["menu-1"], date: "2026-03-23", startTime: "09:00", endTime: "10:00", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-28", customerId: "cust-4", staffId: "staff-2", menuItemIds: ["menu-9"], date: "2026-03-23", startTime: "10:00", endTime: "11:30", space: "ネイルデスク", source: "google", status: "completed" },
  { id: "res-29", customerId: "cust-5", staffId: "staff-1", menuItemIds: ["menu-8"], date: "2026-03-23", startTime: "10:30", endTime: "11:45", space: "ネイルデスク", source: "hotpepper", status: "completed" },
  { id: "res-30", customerId: "cust-2", staffId: "staff-4", menuItemIds: ["menu-3"], date: "2026-03-23", startTime: "11:00", endTime: "12:30", space: "まつエクベッド", source: "line", status: "completed" },
  { id: "res-31", customerId: "cust-6", staffId: "staff-1", menuItemIds: ["menu-7"], date: "2026-03-23", startTime: "12:00", endTime: "13:00", space: "ネイルデスク", source: "hotpepper", status: "completed" },
  { id: "res-32", customerId: "cust-7", staffId: "staff-2", menuItemIds: ["menu-5"], date: "2026-03-23", startTime: "13:00", endTime: "14:00", space: "まつエクベッド", source: "line", status: "completed" },
  { id: "res-33", customerId: "cust-3", staffId: "staff-1", menuItemIds: ["menu-10"], date: "2026-03-23", startTime: "14:00", endTime: "16:00", space: "ネイルデスク", source: "walkin", status: "completed" },
  { id: "res-34", customerId: "cust-8", staffId: "staff-4", menuItemIds: ["menu-13"], date: "2026-03-23", startTime: "14:30", endTime: "15:15", space: "まつエクベッド", source: "walkin", status: "completed" },
  // 2026-03-17
  { id: "res-35", customerId: "cust-1", staffId: "staff-1", menuItemIds: ["menu-2"], date: "2026-03-17", startTime: "09:00", endTime: "10:15", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-36", customerId: "cust-4", staffId: "staff-4", menuItemIds: ["menu-8"], date: "2026-03-17", startTime: "10:00", endTime: "11:15", space: "ネイルデスク", source: "google", status: "completed" },
  { id: "res-37", customerId: "cust-5", staffId: "staff-2", menuItemIds: ["menu-3"], date: "2026-03-17", startTime: "10:30", endTime: "12:00", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-38", customerId: "cust-2", staffId: "staff-1", menuItemIds: ["menu-9"], date: "2026-03-17", startTime: "11:00", endTime: "12:30", space: "ネイルデスク", source: "line", status: "completed" },
  { id: "res-39", customerId: "cust-6", staffId: "staff-4", menuItemIds: ["menu-1"], date: "2026-03-17", startTime: "12:00", endTime: "13:00", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-40", customerId: "cust-7", staffId: "staff-2", menuItemIds: ["menu-10"], date: "2026-03-17", startTime: "13:00", endTime: "15:00", space: "ネイルデスク", source: "line", status: "completed" },
  { id: "res-41", customerId: "cust-3", staffId: "staff-4", menuItemIds: ["menu-5"], date: "2026-03-17", startTime: "14:00", endTime: "15:00", space: "まつエクベッド", source: "walkin", status: "completed" },
  { id: "res-42", customerId: "cust-8", staffId: "staff-1", menuItemIds: ["menu-7"], date: "2026-03-17", startTime: "14:30", endTime: "15:30", space: "ネイルデスク", source: "walkin", status: "completed" },
  // 2026-03-10
  { id: "res-43", customerId: "cust-1", staffId: "staff-2", menuItemIds: ["menu-1"], date: "2026-03-10", startTime: "09:30", endTime: "10:30", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-44", customerId: "cust-4", staffId: "staff-1", menuItemIds: ["menu-7"], date: "2026-03-10", startTime: "10:00", endTime: "11:00", space: "ネイルデスク", source: "google", status: "completed" },
  { id: "res-45", customerId: "cust-5", staffId: "staff-4", menuItemIds: ["menu-3"], date: "2026-03-10", startTime: "10:30", endTime: "12:00", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-46", customerId: "cust-2", staffId: "staff-2", menuItemIds: ["menu-8"], date: "2026-03-10", startTime: "11:00", endTime: "12:15", space: "ネイルデスク", source: "line", status: "completed" },
  { id: "res-47", customerId: "cust-6", staffId: "staff-1", menuItemIds: ["menu-2"], date: "2026-03-10", startTime: "12:00", endTime: "13:15", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-48", customerId: "cust-7", staffId: "staff-4", menuItemIds: ["menu-9"], date: "2026-03-10", startTime: "13:00", endTime: "14:30", space: "ネイルデスク", source: "line", status: "completed" },
  { id: "res-49", customerId: "cust-3", staffId: "staff-2", menuItemIds: ["menu-13"], date: "2026-03-10", startTime: "14:00", endTime: "14:45", space: "まつエクベッド", source: "walkin", status: "completed" },
  { id: "res-50", customerId: "cust-8", staffId: "staff-1", menuItemIds: ["menu-11"], date: "2026-03-10", startTime: "14:30", endTime: "16:00", space: "ネイルデスク", source: "walkin", status: "completed" },
  // 2026-03-03
  { id: "res-51", customerId: "cust-1", staffId: "staff-4", menuItemIds: ["menu-3"], date: "2026-03-03", startTime: "09:00", endTime: "10:30", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-52", customerId: "cust-4", staffId: "staff-2", menuItemIds: ["menu-8"], date: "2026-03-03", startTime: "10:00", endTime: "11:15", space: "ネイルデスク", source: "google", status: "completed" },
  { id: "res-53", customerId: "cust-5", staffId: "staff-1", menuItemIds: ["menu-2"], date: "2026-03-03", startTime: "10:30", endTime: "11:45", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-54", customerId: "cust-2", staffId: "staff-4", menuItemIds: ["menu-9"], date: "2026-03-03", startTime: "11:00", endTime: "12:30", space: "ネイルデスク", source: "line", status: "completed" },
  { id: "res-55", customerId: "cust-6", staffId: "staff-2", menuItemIds: ["menu-1"], date: "2026-03-03", startTime: "12:00", endTime: "13:00", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-56", customerId: "cust-7", staffId: "staff-1", menuItemIds: ["menu-10"], date: "2026-03-03", startTime: "13:00", endTime: "15:00", space: "ネイルデスク", source: "line", status: "completed" },
  { id: "res-57", customerId: "cust-3", staffId: "staff-4", menuItemIds: ["menu-5"], date: "2026-03-03", startTime: "14:00", endTime: "15:00", space: "まつエクベッド", source: "walkin", status: "completed" },
  { id: "res-58", customerId: "cust-8", staffId: "staff-2", menuItemIds: ["menu-7"], date: "2026-03-03", startTime: "14:30", endTime: "15:30", space: "ネイルデスク", source: "walkin", status: "completed" },
  // 2026-02-26
  { id: "res-59", customerId: "cust-1", staffId: "staff-1", menuItemIds: ["menu-1"], date: "2026-02-26", startTime: "10:00", endTime: "11:00", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-60", customerId: "cust-4", staffId: "staff-4", menuItemIds: ["menu-8"], date: "2026-02-26", startTime: "10:00", endTime: "11:15", space: "ネイルデスク", source: "google", status: "completed" },
  { id: "res-61", customerId: "cust-5", staffId: "staff-2", menuItemIds: ["menu-3"], date: "2026-02-26", startTime: "11:00", endTime: "12:30", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-62", customerId: "cust-2", staffId: "staff-1", menuItemIds: ["menu-9"], date: "2026-02-26", startTime: "12:00", endTime: "13:30", space: "ネイルデスク", source: "line", status: "completed" },
  { id: "res-63", customerId: "cust-6", staffId: "staff-4", menuItemIds: ["menu-2"], date: "2026-02-26", startTime: "13:00", endTime: "14:15", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-64", customerId: "cust-7", staffId: "staff-2", menuItemIds: ["menu-10"], date: "2026-02-26", startTime: "14:00", endTime: "16:00", space: "ネイルデスク", source: "line", status: "completed" },
  // 2026-02-19
  { id: "res-65", customerId: "cust-1", staffId: "staff-2", menuItemIds: ["menu-3"], date: "2026-02-19", startTime: "10:00", endTime: "11:30", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-66", customerId: "cust-4", staffId: "staff-1", menuItemIds: ["menu-9"], date: "2026-02-19", startTime: "11:00", endTime: "12:30", space: "ネイルデスク", source: "google", status: "completed" },
  { id: "res-67", customerId: "cust-5", staffId: "staff-4", menuItemIds: ["menu-1"], date: "2026-02-19", startTime: "11:30", endTime: "12:30", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-68", customerId: "cust-2", staffId: "staff-2", menuItemIds: ["menu-7"], date: "2026-02-19", startTime: "13:00", endTime: "14:00", space: "ネイルデスク", source: "line", status: "completed" },
  { id: "res-69", customerId: "cust-6", staffId: "staff-1", menuItemIds: ["menu-8"], date: "2026-02-19", startTime: "13:00", endTime: "14:15", space: "ネイルデスク", source: "hotpepper", status: "completed" },
  { id: "res-70", customerId: "cust-7", staffId: "staff-4", menuItemIds: ["menu-5"], date: "2026-02-19", startTime: "14:30", endTime: "15:30", space: "まつエクベッド", source: "line", status: "completed" },
  // 2026-02-12
  { id: "res-71", customerId: "cust-1", staffId: "staff-4", menuItemIds: ["menu-2"], date: "2026-02-12", startTime: "09:00", endTime: "10:15", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-72", customerId: "cust-4", staffId: "staff-2", menuItemIds: ["menu-7"], date: "2026-02-12", startTime: "10:00", endTime: "11:00", space: "ネイルデスク", source: "google", status: "completed" },
  { id: "res-73", customerId: "cust-5", staffId: "staff-1", menuItemIds: ["menu-9"], date: "2026-02-12", startTime: "10:30", endTime: "12:00", space: "ネイルデスク", source: "hotpepper", status: "completed" },
  { id: "res-74", customerId: "cust-2", staffId: "staff-4", menuItemIds: ["menu-3"], date: "2026-02-12", startTime: "11:00", endTime: "12:30", space: "まつエクベッド", source: "line", status: "completed" },
  { id: "res-75", customerId: "cust-6", staffId: "staff-2", menuItemIds: ["menu-10"], date: "2026-02-12", startTime: "13:00", endTime: "15:00", space: "ネイルデスク", source: "hotpepper", status: "completed" },
  { id: "res-76", customerId: "cust-7", staffId: "staff-1", menuItemIds: ["menu-13"], date: "2026-02-12", startTime: "14:00", endTime: "14:45", space: "まつエクベッド", source: "line", status: "completed" },
  // 2026-02-05
  { id: "res-77", customerId: "cust-1", staffId: "staff-1", menuItemIds: ["menu-3"], date: "2026-02-05", startTime: "10:00", endTime: "11:30", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-78", customerId: "cust-4", staffId: "staff-4", menuItemIds: ["menu-8"], date: "2026-02-05", startTime: "10:00", endTime: "11:15", space: "ネイルデスク", source: "google", status: "completed" },
  { id: "res-79", customerId: "cust-5", staffId: "staff-2", menuItemIds: ["menu-1"], date: "2026-02-05", startTime: "11:00", endTime: "12:00", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-80", customerId: "cust-2", staffId: "staff-1", menuItemIds: ["menu-9"], date: "2026-02-05", startTime: "12:00", endTime: "13:30", space: "ネイルデスク", source: "line", status: "completed" },
  { id: "res-81", customerId: "cust-6", staffId: "staff-4", menuItemIds: ["menu-2"], date: "2026-02-05", startTime: "13:00", endTime: "14:15", space: "まつエクベッド", source: "hotpepper", status: "completed" },
  { id: "res-82", customerId: "cust-7", staffId: "staff-2", menuItemIds: ["menu-5"], date: "2026-02-05", startTime: "14:00", endTime: "15:00", space: "まつエクベッド", source: "line", status: "completed" },
];

export type Period = "今日" | "今週" | "今月" | "カスタム";

export const dashboardKpi: Record<Period, {
  sales: number;
  salesChange: number;
  customerCount: number;
  customerCountChange: number;
  newCustomerRate: number;
  newCustomerRateChange: number;
  avgSpend: number;
  avgSpendChange: number;
}> = {
  今日: {
    sales: 185200,
    salesChange: 8.5,
    customerCount: 22,
    customerCountChange: 4.2,
    newCustomerRate: 18.2,
    newCustomerRateChange: -2.1,
    avgSpend: 8418,
    avgSpendChange: 3.8,
  },
  今週: {
    sales: 892400,
    salesChange: 5.2,
    customerCount: 104,
    customerCountChange: 3.1,
    newCustomerRate: 15.4,
    newCustomerRateChange: 1.3,
    avgSpend: 8581,
    avgSpendChange: 2.0,
  },
  今月: {
    sales: 3456000,
    salesChange: 12.3,
    customerCount: 412,
    customerCountChange: 7.8,
    newCustomerRate: 16.8,
    newCustomerRateChange: 0.5,
    avgSpend: 8388,
    avgSpendChange: 4.1,
  },
  カスタム: {
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

export const staffKpiData: Record<Period, {
  staffId: string;
  customerCount: number;
  newCount: number;
  repeatRate: number;
  avgSpend: number;
  hourlyRevenue: number;
  totalSales: number;
}[]> = {
  今日: [
    { staffId: "staff-1", customerCount: 6, newCount: 1, repeatRate: 83.3, avgSpend: 7200, hourlyRevenue: 5400, totalSales: 43200 },
    { staffId: "staff-2", customerCount: 7, newCount: 1, repeatRate: 85.7, avgSpend: 8900, hourlyRevenue: 7800, totalSales: 62300 },
    { staffId: "staff-3", customerCount: 0, newCount: 0, repeatRate: 0, avgSpend: 0, hourlyRevenue: 0, totalSales: 0 },
    { staffId: "staff-4", customerCount: 9, newCount: 2, repeatRate: 77.8, avgSpend: 8850, hourlyRevenue: 8200, totalSales: 79700 },
  ],
  今週: [
    { staffId: "staff-1", customerCount: 28, newCount: 4, repeatRate: 85.7, avgSpend: 7450, hourlyRevenue: 5800, totalSales: 208600 },
    { staffId: "staff-2", customerCount: 32, newCount: 5, repeatRate: 84.4, avgSpend: 9200, hourlyRevenue: 8100, totalSales: 294400 },
    { staffId: "staff-3", customerCount: 0, newCount: 0, repeatRate: 0, avgSpend: 0, hourlyRevenue: 0, totalSales: 0 },
    { staffId: "staff-4", customerCount: 44, newCount: 7, repeatRate: 84.1, avgSpend: 8850, hourlyRevenue: 8400, totalSales: 389400 },
  ],
  今月: [
    { staffId: "staff-1", customerCount: 108, newCount: 16, repeatRate: 85.2, avgSpend: 7380, hourlyRevenue: 5600, totalSales: 797000 },
    { staffId: "staff-2", customerCount: 124, newCount: 18, repeatRate: 85.5, avgSpend: 9050, hourlyRevenue: 7900, totalSales: 1122200 },
    { staffId: "staff-3", customerCount: 0, newCount: 0, repeatRate: 0, avgSpend: 0, hourlyRevenue: 0, totalSales: 0 },
    { staffId: "staff-4", customerCount: 180, newCount: 35, repeatRate: 80.6, avgSpend: 8530, hourlyRevenue: 8300, totalSales: 1536800 },
  ],
  カスタム: [
    { staffId: "staff-1", customerCount: 6, newCount: 1, repeatRate: 83.3, avgSpend: 7200, hourlyRevenue: 5400, totalSales: 43200 },
    { staffId: "staff-2", customerCount: 7, newCount: 1, repeatRate: 85.7, avgSpend: 8900, hourlyRevenue: 7800, totalSales: 62300 },
    { staffId: "staff-3", customerCount: 0, newCount: 0, repeatRate: 0, avgSpend: 0, hourlyRevenue: 0, totalSales: 0 },
    { staffId: "staff-4", customerCount: 9, newCount: 2, repeatRate: 77.8, avgSpend: 8850, hourlyRevenue: 8200, totalSales: 79700 },
  ],
};

export const categorySalesData: Record<Period, {
  category: "まつエク" | "ネイル" | "まつげパーマ" | "アイブロウ" | "オプション" | "オフ";
  count: number;
  amount: number;
  percentage: number;
}[]> = {
  今日: [
    { category: "まつエク", count: 9, amount: 68500, percentage: 37.0 },
    { category: "ネイル", count: 8, amount: 62000, percentage: 33.5 },
    { category: "まつげパーマ", count: 5, amount: 27500, percentage: 14.8 },
    { category: "アイブロウ", count: 3, amount: 19800, percentage: 10.7 },
    { category: "オプション", count: 5, amount: 4400, percentage: 2.4 },
    { category: "オフ", count: 1, amount: 3000, percentage: 1.6 },
  ],
  今週: [
    { category: "まつエク", count: 42, amount: 328000, percentage: 36.8 },
    { category: "ネイル", count: 38, amount: 298500, percentage: 33.5 },
    { category: "まつげパーマ", count: 22, amount: 132000, percentage: 14.8 },
    { category: "アイブロウ", count: 14, amount: 89600, percentage: 10.0 },
    { category: "オプション", count: 25, amount: 24300, percentage: 2.7 },
    { category: "オフ", count: 8, amount: 20000, percentage: 2.2 },
  ],
  今月: [
    { category: "まつエク", count: 168, amount: 1278000, percentage: 37.0 },
    { category: "ネイル", count: 152, amount: 1142000, percentage: 33.0 },
    { category: "まつげパーマ", count: 85, amount: 510000, percentage: 14.8 },
    { category: "アイブロウ", count: 58, amount: 368000, percentage: 10.6 },
    { category: "オプション", count: 95, amount: 89000, percentage: 2.6 },
    { category: "オフ", count: 28, amount: 69000, percentage: 2.0 },
  ],
  カスタム: [
    { category: "まつエク", count: 9, amount: 68500, percentage: 37.0 },
    { category: "ネイル", count: 8, amount: 62000, percentage: 33.5 },
    { category: "まつげパーマ", count: 5, amount: 27500, percentage: 14.8 },
    { category: "アイブロウ", count: 3, amount: 19800, percentage: 10.7 },
    { category: "オプション", count: 5, amount: 4400, percentage: 2.4 },
    { category: "オフ", count: 1, amount: 3000, percentage: 1.6 },
  ],
};

// ---- Dynamic KPI compute functions ----

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function buildFirstVisitMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const r of reservations) {
    const existing = map.get(r.customerId);
    if (!existing || r.date < existing) map.set(r.customerId, r.date);
  }
  return map;
}

function filterBillable(from: string, to: string) {
  return reservations.filter(
    (r) => r.date >= from && r.date <= to && r.status !== "confirmed"
  );
}

function changePct(curr: number, prev: number): number {
  if (prev === 0) return 0;
  return Math.round(((curr - prev) / prev) * 1000) / 10;
}

export function computeDashboardKpi(
  from: string,
  to: string,
  prevFrom: string,
  prevTo: string
): {
  sales: number;
  salesChange: number;
  customerCount: number;
  customerCountChange: number;
  newCustomerRate: number;
  newCustomerRateChange: number;
  avgSpend: number;
  avgSpendChange: number;
} {
  const menuMap = new Map(menuItems.map((m) => [m.id, m]));
  const firstVisitMap = buildFirstVisitMap();

  function compute(f: string, t: string) {
    const rows = filterBillable(f, t);
    const sales = rows.reduce(
      (sum, r) =>
        sum + r.menuItemIds.reduce((s, id) => s + (menuMap.get(id)?.price ?? 0), 0),
      0
    );
    const uniqueIds = [...new Set(rows.map((r) => r.customerId))];
    const customerCount = uniqueIds.length;
    const newCount = uniqueIds.filter((id) => {
      const fv = firstVisitMap.get(id);
      return fv !== undefined && fv >= f && fv <= t;
    }).length;
    const newCustomerRate =
      customerCount > 0 ? Math.round((newCount / customerCount) * 1000) / 10 : 0;
    const avgSpend = customerCount > 0 ? Math.round(sales / customerCount) : 0;
    return { sales, customerCount, newCustomerRate, avgSpend };
  }

  const curr = compute(from, to);
  const prev = compute(prevFrom, prevTo);

  return {
    sales: curr.sales,
    salesChange: changePct(curr.sales, prev.sales),
    customerCount: curr.customerCount,
    customerCountChange: changePct(curr.customerCount, prev.customerCount),
    newCustomerRate: curr.newCustomerRate,
    newCustomerRateChange:
      Math.round((curr.newCustomerRate - prev.newCustomerRate) * 10) / 10,
    avgSpend: curr.avgSpend,
    avgSpendChange: changePct(curr.avgSpend, prev.avgSpend),
  };
}

export function computeStaffKpi(
  from: string,
  to: string
): {
  staffId: string;
  customerCount: number;
  newCount: number;
  repeatRate: number;
  avgSpend: number;
  hourlyRevenue: number;
  totalSales: number;
}[] {
  const menuMap = new Map(menuItems.map((m) => [m.id, m]));
  const firstVisitMap = buildFirstVisitMap();

  return staffList.map((staff) => {
    const rows = filterBillable(from, to).filter((r) => r.staffId === staff.id);
    const uniqueIds = [...new Set(rows.map((r) => r.customerId))];
    const customerCount = uniqueIds.length;
    const newCount = uniqueIds.filter((id) => {
      const fv = firstVisitMap.get(id);
      return fv !== undefined && fv >= from && fv <= to;
    }).length;
    const repeatRate =
      customerCount > 0
        ? Math.round(((customerCount - newCount) / customerCount) * 1000) / 10
        : 0;
    const totalSales = rows.reduce(
      (sum, r) =>
        sum + r.menuItemIds.reduce((s, id) => s + (menuMap.get(id)?.price ?? 0), 0),
      0
    );
    const avgSpend = customerCount > 0 ? Math.round(totalSales / customerCount) : 0;
    const totalMinutes = rows.reduce(
      (sum, r) => sum + timeToMinutes(r.endTime) - timeToMinutes(r.startTime),
      0
    );
    const hourlyRevenue =
      totalMinutes > 0 ? Math.round(totalSales / (totalMinutes / 60)) : 0;
    return { staffId: staff.id, customerCount, newCount, repeatRate, avgSpend, hourlyRevenue, totalSales };
  });
}

export function computeCategorySales(
  from: string,
  to: string
): {
  category: "まつエク" | "ネイル" | "まつげパーマ" | "アイブロウ" | "オプション" | "オフ";
  count: number;
  amount: number;
  percentage: number;
}[] {
  const menuMap = new Map(menuItems.map((m) => [m.id, m]));
  const rows = filterBillable(from, to);
  const categoryMap = new Map<string, { count: number; amount: number }>();

  for (const r of rows) {
    for (const menuId of r.menuItemIds) {
      const menu = menuMap.get(menuId);
      if (!menu) continue;
      const entry = categoryMap.get(menu.category) ?? { count: 0, amount: 0 };
      entry.count++;
      entry.amount += menu.price;
      categoryMap.set(menu.category, entry);
    }
  }

  const totalAmount = [...categoryMap.values()].reduce((s, v) => s + v.amount, 0);
  const categories = ["まつエク", "ネイル", "まつげパーマ", "アイブロウ", "オプション", "オフ"] as const;

  return categories.map((cat) => {
    const entry = categoryMap.get(cat) ?? { count: 0, amount: 0 };
    return {
      category: cat,
      count: entry.count,
      amount: entry.amount,
      percentage:
        totalAmount > 0 ? Math.round((entry.amount / totalAmount) * 1000) / 10 : 0,
    };
  });
}
