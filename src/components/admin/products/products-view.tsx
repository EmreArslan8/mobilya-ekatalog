"use client"

import { useMemo, useState } from "react"
import { PackageSearch, Plus } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/common/page-header"
import { EmptyState } from "@/components/common/empty-state"
import { LinkButton } from "@/components/common/link-button"
import { useDB } from "@/lib/store/db"
import { norm } from "@/lib/text"
import { ProductsFilters, type ProductFilterState } from "./products-filters"
import { ProductsTable } from "./products-table"

export function ProductsView() {
  const data = useDB((s) => s.data)
  const [f, setF] = useState<ProductFilterState>({ q: "", category: "all", status: "all" })

  const list = useMemo(() => {
    const q = norm(f.q.trim())
    return [...data.products]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .filter((p) => !q || norm(`${p.name} ${p.sku}`).includes(q))
      .filter((p) => f.category === "all" || p.category === f.category)
      .filter((p) =>
        f.status === "all" ? true
        : f.status === "published" ? p.published
        : f.status === "draft" ? !p.published
        : f.status === "az" ? p.stock === "az"
        : !!p.oldPrice)
  }, [data.products, f])

  return (
    <>
      <AdminPageHeader
        title="Ürünler"
        text={`${data.products.length} ürün · ${data.products.filter((p) => p.published).length} yayında`}
        actions={<LinkButton href="/admin/urunler/yeni"><Plus /> Yeni ürün</LinkButton>}
      />
      <div className="mb-4"><ProductsFilters value={f} onChange={setF} categories={data.categories} /></div>
      {list.length ? <ProductsTable products={list} /> : <EmptyState icon={PackageSearch} title="Ürün bulunamadı" text="Filtreleri değiştirin veya yeni ürün ekleyin." />}
    </>
  )
}
