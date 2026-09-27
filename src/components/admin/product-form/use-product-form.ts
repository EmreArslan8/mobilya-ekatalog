"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { emptyProduct, finalizeProduct, validateProduct, type ProductErrors } from "@/lib/admin/product-draft"
import { useDB } from "@/lib/store/db"
import type { Product } from "@/lib/types"

/** Ürün formunun tüm durumu: taslak, değişiklik takibi, doğrulama, kaydetme. */
export function useProductForm(id: string) {
  const data = useDB((s) => s.data)
  const saveProduct = useDB((s) => s.saveProduct)
  const router = useRouter()
  const isNew = id === "yeni"
  const initial = useMemo(() => (isNew ? emptyProduct(data) : data.products.find((p) => p.id === id)), [id]) // eslint-disable-line react-hooks/exhaustive-deps
  const [draft, setDraft] = useState<Product | undefined>(initial)
  const [errors, setErrors] = useState<ProductErrors>({})

  const dirty = JSON.stringify(draft) !== JSON.stringify(initial)
  const set = <K extends keyof Product>(k: K, v: Product[K]) => setDraft((d) => (d ? { ...d, [k]: v } : d))

  const save = () => {
    if (!draft) return
    const e = validateProduct(draft, data)
    setErrors(e)
    if (Object.keys(e).length) {
      toast.error("Eksik alanlar var", { description: Object.values(e)[0] })
      return
    }
    const final = finalizeProduct(draft, data)
    saveProduct(final)
    toast.success(isNew ? "Ürün eklendi" : "Değişiklikler kaydedildi", { description: final.name })
    router.push("/admin/urunler")
  }

  return { draft, set, setDraft, errors, dirty, save, isNew, data }
}
