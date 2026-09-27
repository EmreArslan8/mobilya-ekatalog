"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronRight, Menu, Phone } from "lucide-react"
import { SmartImg } from "@/components/common/smart-img"
import { WhatsAppIcon } from "@/components/common/whatsapp-icon"
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/common/link-button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCatalog } from "@/lib/catalog-context"
import { MAIN_NAV } from "@/lib/site-nav"
import { waLink } from "@/lib/whatsapp"

export function MobileMenu() {
  const { cfg, data } = useCatalog()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon-lg" className="rounded-md lg:hidden" aria-label="Menü" />}>
        <Menu className="size-5" strokeWidth={1.5} />
      </SheetTrigger>
      <SheetContent side="left" className="w-[88%] gap-0 overflow-y-auto p-0 sm:max-w-sm">
        <SheetHeader className="border-b p-5">
          <SheetTitle className="t-h3">{cfg.name}</SheetTitle>
          <p className="t-micro text-muted-foreground">{cfg.tagline}</p>
        </SheetHeader>
        <div className="p-3">
          <p className="t-eyebrow px-2 pt-2 pb-3 text-muted-foreground">Kategoriler</p>
          <div className="grid grid-cols-2 gap-2">
            {data.categories.map((c) => (
              <Link key={c.slug} href={`/urunler?kategori=${c.slug}`} onClick={close} className="group relative aspect-[4/3] overflow-hidden rounded-md">
                <SmartImg src={c.image} className="absolute inset-0" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <span className="absolute inset-x-2.5 bottom-2 t-micro font-medium uppercase tracking-[0.12em] text-white">{c.name}</span>
              </Link>
            ))}
          </div>
          <nav className="mt-4 flex flex-col">
            {MAIN_NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={close} className="flex items-center justify-between border-b px-2 py-4 t-small font-medium uppercase tracking-[0.12em] hover:bg-muted">
                {n.label} <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto grid gap-2 border-t p-4">
          <LinkButton size="cta" className="bg-[#1FAF5A] text-white hover:bg-[#1FAF5A]/90" href={waLink(cfg.contact.whatsapp, "Merhaba, bilgi almak istiyorum.")}>
            <WhatsAppIcon /> WhatsApp ile yazın
          </LinkButton>
          <LinkButton variant="outline" size="cta" href={`tel:${cfg.contact.phone.replace(/\s/g, "")}`}>
            <Phone /> {cfg.contact.phone}
          </LinkButton>
        </div>
      </SheetContent>
    </Sheet>
  )
}
