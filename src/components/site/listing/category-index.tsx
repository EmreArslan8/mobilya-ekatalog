"use client"

import Link from "next/link"
import { PageHeading } from "@/components/common/page-heading"
import { SmartImg } from "@/components/common/smart-img"
import { useCatalog } from "@/lib/catalog-context"
import { cn } from "@/lib/utils"

export function CategoryIndex() {
  const { data, products, cfg } = useCatalog()
  return (
    <>
      <PageHeading eyebrow={cfg.catalogTitle} title="Ürünler" text={`${products.length} model, ${data.categories.length} kategori. Bir kategori seçerek başlayın.`} />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 md:grid-cols-3 md:gap-5 md:px-8">
        {data.categories.map((c, i) => (
          <Link key={c.slug} href={`/kategori/${c.slug}`} className={cn("group relative overflow-hidden rounded-lg text-white", i === 0 ? "col-span-2 aspect-[16/10] md:row-span-2 md:aspect-auto" : "aspect-[3/4]")}>
            <SmartImg src={c.image} size={i === 0 ? "lg" : "sm"} className="absolute inset-0" imgClassName="duration-[1.2s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6">
              <h2 className={i === 0 ? "t-h1" : "t-h3"}>{c.name}</h2>
              <p className="t-micro mt-1 uppercase tracking-[0.14em] text-white/75">{products.filter((p) => p.category === c.slug).length} model</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
