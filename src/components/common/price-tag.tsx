import { money } from "@/lib/text"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

interface Props {
  product: Product
  showPrices: boolean
  currency: string
  askLabel?: string
  size?: "sm" | "lg"
}

export function PriceTag({ product: p, showPrices, currency, askLabel = "Fiyat için sorun", size = "sm" }: Props) {
  if (!showPrices || p.price == null) {
    return <span className={cn("font-medium underline decoration-foreground/30 underline-offset-4", size === "lg" ? "t-body" : "t-micro")}>{askLabel}</span>
  }
  const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className={cn("font-semibold tabular-nums", size === "lg" ? "text-3xl" : "t-body")}>{money(p.price, currency)}</span>
      {p.oldPrice && (
        <>
          <s className={cn("text-muted-foreground tabular-nums", size === "lg" ? "t-body" : "t-micro")}>{money(p.oldPrice, currency)}</s>
          {size === "lg" && <span className="rounded-sm bg-sale px-2 py-1 text-[0.62rem] font-semibold leading-none tracking-[0.1em] text-white">%{off}</span>}
        </>
      )}
    </div>
  )
}
