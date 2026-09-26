"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Heart, Search, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/common/link-button"
import { useCatalog } from "@/lib/catalog-context"
import { MAIN_NAV } from "@/lib/site-nav"
import { useUI } from "@/lib/store/ui"
import { cn } from "@/lib/utils"
import { useCartCount, useFavCount } from "./cart-count"
import { CountBadge } from "./count-badge"
import { MobileMenu } from "./mobile-menu"

export function SiteHeader() {
  const { cfg, cartLabel } = useCatalog()
  const path = usePathname()
  const setSearch = useUI((s) => s.setSearchOpen)
  const openSearch = () => setSearch(true)
  const cart = useCartCount()
  const fav = useFavCount()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])

  return (
    <header className={cn("sticky top-0 z-40 border-b border-transparent bg-background/85 backdrop-blur-xl backdrop-saturate-150 transition-colors", scrolled && "border-border")}>
      <div className="relative mx-auto flex h-15 max-w-7xl items-center gap-2 px-2 md:h-17 md:px-8">
        <MobileMenu />
        <Link href="/" className="min-w-0 px-1 font-heading text-3xl leading-none font-semibold tracking-[0.04em] uppercase max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2">
          {cfg.shortName}
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {MAIN_NAV.map((n) => {
            const on = n.href === "/" ? path === "/" : path.startsWith(n.href)
            return (
              <Link key={n.href} href={n.href} className={cn("relative px-3 py-2 t-small font-medium uppercase tracking-[0.12em] text-foreground/65 transition hover:text-foreground after:absolute after:inset-x-3 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition hover:after:scale-x-100", on && "text-foreground after:scale-x-100")}>
                {n.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-0.5">
          <Button variant="ghost" size="icon-lg" className="rounded-md" onClick={openSearch} aria-label="Ara">
            <Search className="size-[22px]" strokeWidth={1.6} />
          </Button>
          <LinkButton variant="ghost" size="icon-lg" className="relative hidden rounded-md md:inline-flex" href="/favoriler" aria-label="Favoriler">
            <Heart className="size-[22px]" strokeWidth={1.6} />
            <CountBadge n={fav} className="-top-0.5 -right-0.5" />
          </LinkButton>
          <LinkButton variant="ghost" size="icon-lg" className="relative rounded-md" href="/sepet" aria-label={cartLabel}>
            <ShoppingBag className="size-[22px]" strokeWidth={1.6} />
            <CountBadge n={cart} className="-top-0.5 -right-0.5" />
          </LinkButton>
        </div>
      </div>
    </header>
  )
}
