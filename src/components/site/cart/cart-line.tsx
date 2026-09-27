"use client"

import Link from "next/link"
import { X } from "lucide-react"
import { QtyStepper } from "@/components/common/qty-stepper"
import { SmartImg } from "@/components/common/smart-img"
import { useCatalog } from "@/lib/catalog-context"
import { useVisitor } from "@/lib/store/visitor"
import { money } from "@/lib/text"
import type { Product, QuoteItem } from "@/lib/types"

export function CartLine({ item, index, product: p }: { item: QuoteItem; index: number; product: Product }) {
  const { cfg, isB2B } = useCatalog()
  const setQty = useVisitor((s) => s.setQty)
  const remove = useVisitor((s) => s.removeFromCart)
  const color = p.colors[item.color]
  return (
    <li className="flex gap-4 py-5">
      <Link href={`/urun/${p.id}`} className="shrink-0">
        <SmartImg src={p.images[0]} className="aspect-[4/5] w-24 rounded-md sm:w-28" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/urun/${p.id}`} className="t-body line-clamp-2 font-medium hover:underline">{p.name}</Link>
            <p className="t-micro mt-1 uppercase tracking-[0.12em] text-muted-foreground">{p.sku}</p>
          </div>
          <button onClick={() => remove(index)} aria-label="Kaldır" className="-mt-1 -mr-1 grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>
        {color && (
          <p className="t-small mt-2 flex items-center gap-2 text-muted-foreground">
            <span className="size-3 rounded-full ring-1 ring-black/10" style={{ background: color.hex }} /> {color.name}
          </p>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <QtyStepper size="sm" value={item.qty} min={isB2B ? p.moq ?? 1 : 1} onChange={(n) => setQty(index, n)} />
          {cfg.showPrices && p.price != null && <span className="t-body font-semibold tabular-nums">{money(p.price * item.qty, cfg.currency)}</span>}
        </div>
      </div>
    </li>
  )
}
