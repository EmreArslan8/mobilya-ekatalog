"use client"

import { useCatalog } from "@/lib/catalog-context"
import { ProductRail } from "../product/product-rail"
import { ProductGrid } from "../product/product-grid"
import { SectionHeader } from "@/components/common/section-header"
import { CategoryRail } from "./category-rail"
import { CollectionShowcase } from "./collection-showcase"
import { HeroCarousel } from "./hero-carousel"
import { HowToOrder } from "./how-to-order"
import { StoryBand } from "./story-band"

export function HomeView() {
  const { cfg, data, products, isB2B } = useCatalog()
  const newest = products.filter((p) => p.tags.includes("yeni"))
  const best = products.filter((p) => p.tags.includes("cok-satan"))
  const sale = products.filter((p) => p.oldPrice)
  return (
    <>
      <HeroCarousel slides={cfg.hero} />
      <CategoryRail categories={data.categories} products={products} />
      <ProductRail title="Yeni gelenler" href="/liste/yeni" products={newest} />
      <CollectionShowcase collections={data.collections} products={products} title={isB2B ? "Seriler" : "Koleksiyonlar"} />
      <section className="pt-24">
        <SectionHeader eyebrow={isB2B ? "Bayi tercihi" : "En sevilenler"} title={isB2B ? "En çok sipariş edilenler" : "Çok satanlar"} href="/liste/cok-satan" />
        <div className="mx-auto max-w-7xl px-5 md:px-8"><ProductGrid products={best.slice(0, 8)} /></div>
      </section>
      <HowToOrder b2b={isB2B} />
      {cfg.showPrices && <ProductRail eyebrow="Fırsatlar" title="İndirimdekiler" href="/liste/indirim" products={sale} />}
      <StoryBand b2b={isB2B} />
    </>
  )
}
