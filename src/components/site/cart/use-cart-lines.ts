"use client"

import { useCatalog } from "@/lib/catalog-context"
import { useVisitor } from "@/lib/store/visitor"

/** Sepet kalemlerini ürün verisiyle birleştirir; yayından kalkan ürünleri atlar. */
export function useCartLines() {
  const { product, cfg } = useCatalog()
  const cart = useVisitor((s) => s.cart)
  const lines = cart
    .map((item, index) => ({ item, index, product: product(item.id)! }))
    .filter((l) => l.product)
  const count = lines.reduce((a, l) => a + l.item.qty, 0)
  const total = lines.reduce((a, l) => a + (l.product.price ?? 0) * l.item.qty, 0)
  return { lines, count, total, priced: cfg.showPrices }
}
