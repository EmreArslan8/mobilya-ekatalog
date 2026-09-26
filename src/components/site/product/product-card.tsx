"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import { ColorDots } from "@/components/common/color-dots"
import { FavButton } from "@/components/common/fav-button"
import { PriceTag } from "@/components/common/price-tag"
import { SmartImg } from "@/components/common/smart-img"
import { useCatalog } from "@/lib/catalog-context"
import { TAG_LABEL } from "@/lib/labels"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useAddToCart } from "./add-to-cart"

export function ProductCard({ product: p, layout = "grid", priority }: { product: Product; layout?: "grid" | "list"; priority?: boolean }) {
  const { cfg, isB2B, catOf } = useCatalog()
  const addToCart = useAddToCart()
  const list = layout === "list"
  const meta = isB2B ? `${p.sku} · Min. ${p.moq ?? 1} adet` : catOf(p.category)?.name

  return (
    <Link href={`/urun/${p.id}`} className={cn("group relative flex min-w-0", list ? "items-center gap-4 rounded-lg border bg-card p-2.5" : "flex-col gap-3.5")}>
      <div className={cn("relative shrink-0 overflow-hidden", list ? "size-28 rounded-md" : "aspect-[4/5] rounded-lg")}>
        <SmartImg src={p.images[0]} priority={priority} className="absolute inset-0" imgClassName="group-hover:scale-[1.04]" />
        {p.images[1] && !list && (
          <SmartImg src={p.images[1]} className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 max-md:hidden" />
        )}
        {!list && (
          <>
            <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1">
              {p.tags.filter((t) => cfg.showPrices || t !== "indirim").map((t) => (
                <span key={t} className={cn("rounded-sm px-2 py-1 text-[0.62rem] font-semibold uppercase leading-none tracking-[0.14em]", t === "indirim" ? "bg-sale text-white" : t === "yeni" ? "bg-foreground text-background" : "bg-white/90 text-neutral-900")}>
                  {TAG_LABEL[t]}
                </span>
              ))}
            </div>
            <FavButton id={p.id} className="absolute top-2 right-2" />
            <button
              type="button"
              aria-label="Sepete ekle"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(p) }}
              className="absolute inset-x-2 bottom-2 flex h-10 items-center justify-center gap-2 rounded-md bg-white/95 text-neutral-950 t-micro font-semibold uppercase tracking-[0.14em] backdrop-blur max-md:inset-x-auto max-md:w-10 transition active:scale-90 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
            >
              <Plus className="size-4" strokeWidth={1.6} /><span className="max-md:hidden">{isB2B ? "Listeye ekle" : "Sepete ekle"}</span>
            </button>
          </>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate t-micro uppercase tracking-[0.12em] text-muted-foreground">{meta}</span>
        <h3 className="line-clamp-2 t-body font-medium leading-snug">{p.name}</h3>
        <ColorDots colors={p.colors} />
        <div className="mt-0.5">
          <PriceTag product={p} showPrices={cfg.showPrices} currency={cfg.currency} askLabel={isB2B ? "Teklif alın" : "Fiyat için sorun"} />
        </div>
      </div>
      {list && <FavButton id={p.id} className="self-start bg-muted" />}
    </Link>
  )
}
