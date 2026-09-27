import Link from "next/link"
import { SectionHeader } from "@/components/common/section-header"
import { SmartImg } from "@/components/common/smart-img"
import type { Category, Product } from "@/lib/types"

export function CategoryRail({ categories, products }: { categories: Category[]; products: Product[] }) {
  return (
    <section className="pt-12 md:pt-20">
      <SectionHeader title="Kategoriler" href="/urunler" linkLabel="Tümü" />
      <div className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 md:grid md:grid-cols-7 md:gap-4 md:px-8">
        {categories.map((c) => (
          <Link key={c.slug} href={`/urunler?kategori=${c.slug}`} className="group w-[38%] shrink-0 snap-start sm:w-[24%] md:w-auto">
            <SmartImg src={c.image} className="aspect-[3/4] rounded-lg" imgClassName="group-hover:scale-105" />
            <p className="mt-3 t-micro font-medium uppercase tracking-[0.14em]">{c.name}</p>
            <p className="t-micro mt-0.5 text-muted-foreground">{products.filter((p) => p.category === c.slug).length} model</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
