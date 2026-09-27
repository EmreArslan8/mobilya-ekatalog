import Link from "next/link"
import { FolderPlus, ImagePlus, Palette, PackagePlus, type LucideIcon } from "lucide-react"

const ACTIONS: { href: string; icon: LucideIcon; label: string; text: string }[] = [
  { href: "/admin/urunler/yeni", icon: PackagePlus, label: "Ürün ekle", text: "Görsel, fiyat ve varyantlarla" },
  { href: "/admin/kategoriler", icon: FolderPlus, label: "Kategori ekle", text: "Ürün gruplarını düzenle" },
  { href: "/admin/ayarlar?tab=vitrin", icon: ImagePlus, label: "Banner değiştir", text: "Ana sayfa vitrinini güncelle" },
  { href: "/admin/ayarlar?tab=gorunum", icon: Palette, label: "Tema & renkler", text: "Marka görünümünü ayarla" },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {ACTIONS.map((a) => (
        <Link key={a.href} href={a.href} className="group flex items-start gap-3 rounded-xl border bg-card p-4 shadow-xs transition hover:border-foreground/20">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted transition group-hover:bg-foreground group-hover:text-background"><a.icon className="size-4" /></span>
          <div className="min-w-0"><p className="text-sm font-medium">{a.label}</p><p className="text-xs text-muted-foreground max-sm:hidden">{a.text}</p></div>
        </Link>
      ))}
    </div>
  )
}
