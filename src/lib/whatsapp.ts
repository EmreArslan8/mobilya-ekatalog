import { money } from "./text"
import type { Product, QuoteItem, SiteConfig } from "./types"

export const waLink = (phone: string, text: string) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`

export function productQuestion(p: Product, url: string) {
  return `Merhaba, ${p.name} (${p.sku}) hakkında bilgi almak istiyorum.\n${url}`
}

export function quoteMessage(
  cfg: SiteConfig,
  lines: { item: QuoteItem; product: Product }[],
  customer: { name: string; phone: string; city: string; note: string }
) {
  const b2b = cfg.mode === "b2b"
  const priced = cfg.showPrices
  const body = lines
    .map(({ item, product: p }, n) => {
      const price = priced && p.price ? ` · ${money(p.price * item.qty, cfg.currency)}` : ""
      return `${n + 1}) ${p.name} [${p.sku}]\n   Renk: ${p.colors[item.color]?.name ?? "-"} · ${item.qty} adet${price}`
    })
    .join("\n")
  const total = priced ? `\n\nTahmini toplam: ${money(lines.reduce((a, l) => a + (l.product.price ?? 0) * l.item.qty, 0), cfg.currency)}` : ""
  const who = [
    customer.name && `${b2b ? "Firma" : "Ad"}: ${customer.name}`,
    customer.phone && `Telefon: ${customer.phone}`,
    customer.city && `Şehir: ${customer.city}`,
    customer.note && `Not: ${customer.note}`,
  ].filter(Boolean).join("\n")
  return `Merhaba ${cfg.name}, ${cfg.catalogTitle} üzerinden ${b2b ? "fiyat teklifi almak" : "sipariş vermek"} istiyorum:\n\n${body}${total}${who ? `\n\n${who}` : ""}`
}
