"use client"

import { CartAddedSheet } from "@/components/site/cart/cart-added-sheet"
import { useCatalog } from "@/lib/catalog-context"
import { useHydrated } from "@/lib/store/hydrate"
import { AnnouncementBar } from "./announcement-bar"
import { FloatingWhatsApp } from "./floating-whatsapp"
import { SearchDialog } from "./search-dialog"
import { ShellSkeleton } from "./shell-skeleton"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"
import { TabBar } from "./tab-bar"
import { ThemeApplier } from "./theme-applier"

function Shell({ children }: { children: React.ReactNode }) {
  const { cfg } = useCatalog()
  return (
    <div className="flex min-h-dvh flex-col bg-background pb-[calc(4rem+env(safe-area-inset-bottom))] font-sans text-foreground lg:pb-0">
      <ThemeApplier theme={cfg.theme} />
      <AnnouncementBar items={cfg.perks} />
      <SiteHeader />
      <main className="flex-1 animate-in fade-in slide-in-from-bottom-1 duration-500">{children}</main>
      <SiteFooter />
      <TabBar />
      <FloatingWhatsApp />
      <SearchDialog />
      <CartAddedSheet />
    </div>
  )
}

/** Vitrin sitesinin kabuğu: localStorage verisi yüklenene kadar iskelet gösterir. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const ready = useHydrated()
  return ready ? <Shell>{children}</Shell> : <ShellSkeleton />
}
