import { FolderTree, LayoutDashboard, Layers, Package, Settings, type LucideIcon } from "lucide-react"

export const ADMIN_NAV: { href: string; label: string; icon: LucideIcon; exact?: boolean }[] = [
  { href: "/admin", label: "Özet", icon: LayoutDashboard, exact: true },
  { href: "/admin/urunler", label: "Ürünler", icon: Package },
  { href: "/admin/kategoriler", label: "Kategoriler", icon: FolderTree },
  { href: "/admin/koleksiyonlar", label: "Koleksiyonlar", icon: Layers },
  { href: "/admin/ayarlar", label: "Site ayarları", icon: Settings },
]

export const isActive = (path: string, href: string, exact?: boolean) => (exact ? path === href : path.startsWith(href))
