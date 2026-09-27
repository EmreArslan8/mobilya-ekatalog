import { Suspense } from "react"
import { ProductBrowser } from "@/components/site/browse/product-browser"

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductBrowser />
    </Suspense>
  )
}
