import type { ProductTag, StockStatus } from "./types"

export const TAG_LABEL: Record<ProductTag, string> = { yeni: "Yeni", "cok-satan": "Çok satan", indirim: "İndirim" }

export const STOCK_LABEL: Record<StockStatus, string> = {
  stokta: "Stokta",
  az: "Son ürünler",
  siparis: "Siparişe özel",
  uretim: "Üretime alınır",
}

export const STOCK_DOT: Record<StockStatus, string> = {
  stokta: "bg-emerald-500",
  az: "bg-amber-500",
  siparis: "bg-sky-500",
  uretim: "bg-sky-500",
}
