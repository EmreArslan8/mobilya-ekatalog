"use client"

import { Heart } from "lucide-react"
import { EmptyState } from "@/components/common/empty-state"
import { PageHeading } from "@/components/common/page-heading"
import { useCatalog } from "@/lib/catalog-context"
import { useVisitor } from "@/lib/store/visitor"
import { ProductGrid } from "../product/product-grid"

export function FavoritesView() {
  const { product } = useCatalog()
  const ids = useVisitor((s) => s.fav)
  const items = ids.map(product).filter((p) => !!p)
  if (!items.length) {
    return <EmptyState icon={Heart} title="Favori listeniz boş" text="Beğendiğiniz ürünlerdeki kalbe dokunun, burada toplansın." action={{ label: "Kataloğa göz at", href: "/urunler" }} />
  }
  return (
    <>
      <PageHeading title="Favoriler" count={`${items.length} ürün`} />
      <div className="mx-auto max-w-7xl px-5 md:px-8"><ProductGrid products={items} /></div>
    </>
  )
}
