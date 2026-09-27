"use client"

import { ShoppingBag } from "lucide-react"
import { EmptyState } from "@/components/common/empty-state"
import { PageHeading } from "@/components/common/page-heading"
import { useCatalog } from "@/lib/catalog-context"
import { CartLine } from "./cart-line"
import { CartSummary } from "./cart-summary"
import { useCartLines } from "./use-cart-lines"

export function CartView() {
  const { isB2B, cartLabel } = useCatalog()
  const { lines, count } = useCartLines()
  if (!lines.length) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title={`${cartLabel} boş`}
        text={isB2B ? "Ürünleri teklif listesine ekleyin, tek mesajla fiyat isteyin." : "Beğendiğiniz ürünleri ekleyin, siparişinizi WhatsApp’tan tek mesajla iletin."}
        action={{ label: "Ürünleri keşfet", href: "/urunler" }}
      />
    )
  }
  return (
    <>
      <PageHeading title={cartLabel} count={`${count} ürün`} />
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-8 px-5 md:px-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
        <ul className="divide-y border-y">
          {lines.map((l) => <CartLine key={`${l.item.id}-${l.item.color}`} {...l} />)}
        </ul>
        <CartSummary />
      </div>
    </>
  )
}
