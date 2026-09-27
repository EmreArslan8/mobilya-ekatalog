import { SmartImg } from "@/components/common/smart-img"
import { money } from "@/lib/text"
import type { Product, SiteConfig } from "@/lib/types"

/** Ürünün sitedeki kartının sade önizlemesi. */
export function ProductPreview({ draft, cfg }: { draft: Product; cfg: SiteConfig }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-xs">
      <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">Sitede görünüm</p>
      <div className="overflow-hidden rounded-md bg-muted">
        {draft.images[0] ? <SmartImg src={draft.images[0]} className="aspect-[4/5]" /> : <div className="grid aspect-[4/5] place-items-center text-xs text-muted-foreground">Görsel yok</div>}
      </div>
      <p className="mt-3 font-medium">{draft.name || "Ürün adı"}</p>
      <div className="mt-1.5 flex gap-1">
        {draft.colors.map((c, i) => <span key={i} className="size-3 rounded-full ring-1 ring-black/10" style={{ background: c.hex }} />)}
      </div>
      <p className="mt-1.5 text-sm font-semibold tabular-nums">
        {cfg.showPrices && draft.price ? money(draft.price, cfg.currency) : cfg.priceLabel}
        {cfg.showPrices && draft.oldPrice ? <s className="ml-2 text-xs font-normal text-muted-foreground">{money(draft.oldPrice, cfg.currency)}</s> : null}
      </p>
    </div>
  )
}
