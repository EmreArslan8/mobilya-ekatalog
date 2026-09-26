"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useCatalog } from "@/lib/catalog-context"
import { useVisitor } from "@/lib/store/visitor"
import type { Product } from "@/lib/types"

/** Sepete ekleme davranışı tek yerde: B2B'de minimum adet kuralı, geri bildirim toast'u. */
export function useAddToCart() {
  const add = useVisitor((s) => s.addToCart)
  const { isB2B, cartLabel } = useCatalog()
  const router = useRouter()
  return (p: Product, color = 0, qty?: number) => {
    const min = isB2B ? p.moq ?? 1 : 1
    const q = Math.max(qty ?? min, min)
    add({ id: p.id, color, qty: q })
    toast.success(`${cartLabel} güncellendi`, {
      description: `${p.name} · ${p.colors[color]?.name ?? ""} · ${q} adet`,
      action: { label: "Görüntüle", onClick: () => router.push("/sepet") },
    })
  }
}
