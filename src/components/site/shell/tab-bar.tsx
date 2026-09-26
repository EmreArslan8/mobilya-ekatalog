"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { activeTab, TAB_ITEMS } from "@/lib/site-nav"
import { useUI } from "@/lib/store/ui"
import { useCatalog } from "@/lib/catalog-context"
import { cn } from "@/lib/utils"
import { useCartCount, useFavCount } from "./cart-count"
import { CountBadge } from "./count-badge"

/** Mobil alt gezinme çubuğu. Ürün detayında satın alma çubuğuna yer açmak için gizlenir. */
export function TabBar() {
  const path = usePathname()
  const { cartLabel } = useCatalog()
  const setSearch = useUI((s) => s.setSearchOpen)
  const counts = { cart: useCartCount(), fav: useFavCount() }
  const active = activeTab(path)
  if (path.startsWith("/urun/")) return null

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/85 pb-safe backdrop-blur-xl backdrop-saturate-150 lg:hidden">
      <div className="grid h-16 grid-cols-5">
        {TAB_ITEMS.map((t) => {
          const on = active === t.key
          const inner = (
            <>
              <span className={cn("absolute top-0 h-0.5 w-7 rounded-b-full bg-primary transition-opacity", on ? "opacity-100" : "opacity-0")} />
              <span className="relative">
                <t.icon className="size-[22px]" strokeWidth={on ? 2.2 : 1.7} />
                {t.badge && <CountBadge n={counts[t.badge]} className="-top-1.5 -right-2.5" />}
              </span>
              <span className="t-micro font-semibold">{t.key === "cart" ? cartLabel.split(" ")[0] : t.label}</span>
            </>
          )
          const cls = cn("relative flex flex-col items-center justify-center gap-1 transition-colors", on ? "text-foreground" : "text-muted-foreground")
          return t.href ? (
            <Link key={t.key} href={t.href} className={cls}>{inner}</Link>
          ) : (
            <button key={t.key} className={cls} onClick={() => setSearch(true)}>{inner}</button>
          )
        })}
      </div>
    </nav>
  )
}
