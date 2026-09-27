"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { LinkButton } from "@/components/common/link-button"
import { PriceTag } from "@/components/common/price-tag"
import { SmartImg } from "@/components/common/smart-img"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { useCatalog } from "@/lib/catalog-context"
import { useUI } from "@/lib/store/ui"
import { money } from "@/lib/text"
import { useCartLines } from "./use-cart-lines"

/** Sepete ekleme sonrası panel: mobilde alttan, masaüstünde sağdan. */
export function CartAddedSheet() {
  const added = useUI((s) => s.added)
  const showAdded = useUI((s) => s.showAdded)
  const close = () => showAdded(null)
  const { product, products, cfg, isB2B, cartLabel } = useCatalog()
  const { count, total } = useCartLines()
  const mobile = useIsMobile()
  const p = added ? product(added.id) : undefined
  const suggestions = p ? products.filter((x) => x.id !== p.id && x.collection === p.collection).slice(0, 3) : []

  return (
    <Sheet open={!!p} onOpenChange={(o) => !o && close()}>
      <SheetContent side={mobile ? "bottom" : "right"} className="gap-0 p-0 max-sm:max-h-[88dvh] max-sm:rounded-t-lg sm:max-w-md">
        {p && added && (
          <div className="flex h-full flex-col overflow-y-auto">
            <div className="flex items-center gap-3 border-b px-6 py-5">
              <span className="grid size-8 place-items-center rounded-full bg-foreground text-background"><Check className="size-4" strokeWidth={2.5} /></span>
              <div>
                <SheetTitle className="t-h3">{isB2B ? "Teklif listesine eklendi" : "Sepete eklendi"}</SheetTitle>
                <SheetDescription className="t-small">{cartLabel}: {count} ürün</SheetDescription>
              </div>
            </div>

            <div className="flex gap-4 px-6 py-6">
              <SmartImg src={p.images[0]} className="aspect-[4/5] w-28 shrink-0 rounded-md" />
              <div className="min-w-0 flex-1">
                <p className="t-body font-medium">{p.name}</p>
                <p className="t-micro mt-1 uppercase tracking-[0.12em] text-muted-foreground">{p.sku}</p>
                <p className="t-small mt-3 flex items-center gap-2">
                  <span className="size-3 rounded-full ring-1 ring-black/10" style={{ background: p.colors[added.color]?.hex }} />
                  {p.colors[added.color]?.name} · {added.qty} adet
                </p>
                <div className="mt-3"><PriceTag product={p} showPrices={cfg.showPrices} currency={cfg.currency} askLabel={cfg.priceLabel} /></div>
              </div>
            </div>

            {cfg.showPrices && (
              <div className="mx-6 flex items-baseline justify-between border-y py-4">
                <span className="t-small text-muted-foreground">Sepet toplamı</span>
                <span className="text-xl font-semibold tabular-nums">{money(total, cfg.currency)}</span>
              </div>
            )}

            <div className="grid gap-2.5 px-6 pt-5">
              <LinkButton size="cta" href="/sepet" onClick={close}>{isB2B ? "Listeye git ve teklif iste" : "Sepete git ve sipariş ver"}</LinkButton>
              <Button size="cta" variant="outline" className="bg-transparent" onClick={close}>Alışverişe devam et</Button>
            </div>

            {suggestions.length > 0 && (
              <div className="mt-8 border-t px-6 pt-6 pb-8">
                <p className="t-eyebrow text-muted-foreground">Bununla uyumlu</p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {suggestions.map((s) => (
                    <Link key={s.id} href={`/urun/${s.id}`} onClick={close} className="group">
                      <SmartImg src={s.images[0]} className="aspect-[4/5] rounded-md" imgClassName="group-hover:scale-105" />
                      <p className="t-micro mt-2 line-clamp-2 font-medium">{s.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
