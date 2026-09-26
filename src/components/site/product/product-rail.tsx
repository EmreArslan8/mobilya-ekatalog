import { SectionHeader } from "@/components/common/section-header"
import type { Product } from "@/lib/types"
import { ProductCard } from "./product-card"

/** Yatay kaydırılan ürün rayı (mobilde parmakla, masaüstünde 4'lü). */
export function ProductRail({ title, eyebrow, href, products }: { title: string; eyebrow?: string; href?: string; products: Product[] }) {
  if (!products.length) return null
  return (
    <section className="pt-14">
      <SectionHeader title={title} eyebrow={eyebrow} href={href} />
      <div className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 md:scroll-px-8 md:gap-5 md:px-8">
        {products.map((p) => (
          <div key={p.id} className="w-[62%] shrink-0 snap-start sm:w-[40%] md:w-[calc((100%-3*1.25rem)/4)]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
