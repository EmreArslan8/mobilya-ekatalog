import { Heart, Home, LayoutGrid, Search, ShoppingBag, type LucideIcon } from "lucide-react"

export const MAIN_NAV = [
  { href: "/", label: "Ana sayfa" },
  { href: "/kategoriler", label: "Ürünler" },
  { href: "/liste/yeni", label: "Yeni gelenler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
]

export type TabItem = { key: string; label: string; icon: LucideIcon; href?: string; action?: "search"; badge?: "fav" | "cart" }

export const TAB_ITEMS: TabItem[] = [
  { key: "home", label: "Ana sayfa", icon: Home, href: "/" },
  { key: "cats", label: "Kategoriler", icon: LayoutGrid, href: "/kategoriler" },
  { key: "search", label: "Ara", icon: Search, action: "search" },
  { key: "fav", label: "Favoriler", icon: Heart, href: "/favoriler", badge: "fav" },
  { key: "cart", label: "Sepet", icon: ShoppingBag, href: "/sepet", badge: "cart" },
]

/** Pathname → aktif sekme */
export function activeTab(path: string) {
  if (path === "/") return "home"
  if (/^\/(kategori|koleksiyon|liste)/.test(path)) return "cats"
  if (path.startsWith("/favoriler")) return "fav"
  if (path.startsWith("/sepet")) return "cart"
  return ""
}
