import Link from "next/link"
import { PriceTag } from "@/components/common/price-tag"
import { StockBadge } from "@/components/common/stock-badge"
import { money } from "@/lib/text"
import type { Category, Product, SiteConfig } from "@/lib/types"

export function ProductSummary({ product: p, category, cfg }: { product: Product; category?: Category; cfg: SiteConfig }) {
  const priced = cfg.showPrices && p.price != null
  return (
    <div>
      <nav className="flex flex-wrap items-center gap-2 t-micro uppercase tracking-[0.14em] text-muted-foreground">
        <Link href="/urunler" className="hover:text-foreground">Ürünler</Link>
        <span>/</span>
        {category && <Link href={`/urunler?kategori=${category.slug}`} className="hover:text-foreground">{category.name}</Link>}
      </nav>
      <h1 className="t-h1 mt-4">{p.name}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 t-small text-muted-foreground">
        <span>Ürün kodu: <span className="font-medium text-foreground">{p.sku}</span></span>
        <StockBadge status={p.stock} className="text-foreground" />
      </div>
      <div className="mt-6 border-t pt-6">
        {priced ? (
          <>
            <PriceTag product={p} showPrices currency={cfg.currency} size="lg" />
            <p className="t-small mt-2 text-muted-foreground">12 aya varan taksitle aylık {money(Math.ceil(p.price! / 12), cfg.currency)}</p>
          </>
        ) : (
          <div className="rounded-md border border-foreground/15 bg-card p-4">
            <p className="t-body font-medium">{cfg.priceLabel}</p>
            <p className="t-small mt-1 text-muted-foreground">Adet, kumaş ve termin tercihlerinize göre fiyat teklifi iletilir.</p>
          </div>
        )}
      </div>
    </div>
  )
}
