import Link from "next/link"
import { SectionHeader } from "@/components/common/section-header"
import { SmartImg } from "@/components/common/smart-img"
import type { Collection, Product } from "@/lib/types"
import { cn } from "@/lib/utils"

/** Koleksiyonlar: mobilde kaydırmalı, masaüstünde asimetrik mozaik. */
export function CollectionShowcase({ collections, products, title }: { collections: Collection[]; products: Product[]; title: string }) {
  if (!collections.length) return null
  return (
    <section className="pt-24">
      <SectionHeader  title={title} />
      <div className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 md:grid md:grid-cols-4 md:grid-rows-2 md:gap-4 md:px-8">
        {collections.map((c, i) => (
          <Link
            key={c.slug}
            href={`/koleksiyon/${c.slug}`}
            className={cn(
              "group relative aspect-[3/4] w-[82%] shrink-0 snap-start overflow-hidden rounded-lg text-white md:aspect-auto md:w-auto",
              i === 0 && "md:col-span-2 md:row-span-2 md:min-h-[640px]",
              i === 3 && "md:col-span-2"
            )}
          >
            <SmartImg src={c.image} size="lg" className="absolute inset-0" imgClassName="duration-[1.2s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 md:min-h-[240px] md:content-end">
              <span className="t-eyebrow text-white/70">{products.filter((p) => p.collection === c.slug).length} parça</span>
              <h3 className="t-h1 mt-2">{c.name}</h3>
              <p className="t-small mt-2 max-w-xs text-white/80">{c.text}</p>
              <span className="mt-5 inline-block border-b border-white/60 pb-1 t-micro font-medium uppercase tracking-[0.16em] transition group-hover:border-white">
                Koleksiyonu incele
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
