"use client"

import { useState } from "react"
import { FavButton } from "@/components/common/fav-button"
import { NotFoundView } from "@/components/common/not-found-view"
import { useCatalog } from "@/lib/catalog-context"
import { money } from "@/lib/text"
import { productQuestion, waLink } from "@/lib/whatsapp"
import { useAddToCart } from "../product/add-to-cart"
import { ProductRail } from "../product/product-rail"
import { ProductDetailsTabs } from "./product-details-tabs"
import { ProductFacts } from "./product-facts"
import { ProductGallery } from "./product-gallery"
import { ProductSummary } from "./product-summary"
import { PurchaseActions } from "./purchase-actions"
import { ShareButton } from "./share-button"
import { StickyPurchaseBar } from "./sticky-purchase-bar"
import { VariantPicker } from "./variant-picker"

export function ProductDetailView({ id }: { id: string }) {
  const { product, cfg, isB2B, catOf, collOf, products, cartLabel } = useCatalog()
  const p = product(id)
  const addToCart = useAddToCart()
  const min = isB2B ? p?.moq ?? 1 : 1
  const [color, setColor] = useState(0)
  const [qty, setQty] = useState(min)

  if (!p) return <NotFoundView text="Bu ürün yayından kaldırılmış olabilir." />

  const similar = products.filter((x) => x.id !== p.id && (x.category === p.category || x.collection === p.collection)).slice(0, 8)
  const addLabel = isB2B ? "Teklif listesine ekle" : "Sepete ekle"
  const add = () => addToCart(p, color, qty)
  const ask = () => window.open(waLink(cfg.contact.whatsapp, productQuestion(p, window.location.href)), "_blank", "noopener")
  const barPrice = cfg.showPrices && p.price != null ? money(p.price * qty, cfg.currency) : undefined

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:pt-10">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery
              images={p.images}
              name={p.name}
              overlay={
                <div className="absolute top-4 right-4 flex flex-col gap-2 max-lg:right-9">
                  <FavButton id={p.id} />
                  <ShareButton title={`${p.name} · ${cfg.name}`} />
                </div>
              }
            />
          </div>
          <div className="space-y-8">
            <ProductSummary product={p} category={catOf(p.category)} cfg={cfg} />
            <VariantPicker colors={p.colors} value={color} onChange={setColor} />
            <PurchaseActions qty={qty} min={min} onQty={setQty} onAdd={add} onAsk={ask} addLabel={addLabel} />
            <ProductFacts product={p} collection={collOf(p.collection)} b2b={isB2B} />
            <ProductDetailsTabs product={p} b2b={isB2B} />
          </div>
        </div>
      </div>
      <ProductRail eyebrow="Tamamlayıcı parçalar" title="Benzer ürünler" products={similar} />
      <StickyPurchaseBar onAdd={add} onAsk={ask} addLabel={cartLabel === "Sepet" ? "Sepete ekle" : "Listeye ekle"} price={barPrice} />
    </>
  )
}
