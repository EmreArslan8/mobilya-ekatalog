"use client"

import { useCatalog } from "@/lib/catalog-context"
import { useUI } from "@/lib/store/ui"
import { useVisitor } from "@/lib/store/visitor"
import type { Product } from "@/lib/types"

/** Sepete ekleme davranışı tek yerde: B2B minimum adet kuralı + "eklendi" paneli. */
export function useAddToCart() {
  const add = useVisitor((s) => s.addToCart)
  const showAdded = useUI((s) => s.showAdded)
  const { isB2B } = useCatalog()
  return (p: Product, color = 0, qty?: number) => {
    const min = isB2B ? p.moq ?? 1 : 1
    const item = { id: p.id, color, qty: Math.max(qty ?? min, min) }
    add(item)
    showAdded(item)
  }
}
