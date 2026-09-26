import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ProductCard } from "./product-card"

export function ProductGrid({ products, layout = "grid" }: { products: Product[]; layout?: "grid" | "list" }) {
  return (
    <div className={cn(layout === "list" ? "grid gap-3 md:grid-cols-2" : "grid grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-3 md:gap-x-5 md:gap-y-10 xl:grid-cols-4")}>
      {products.map((p, i) => <ProductCard key={p.id} product={p} layout={layout} priority={i < 4} />)}
    </div>
  )
}
