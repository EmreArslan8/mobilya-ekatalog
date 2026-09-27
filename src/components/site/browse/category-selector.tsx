"use client"

import { LayoutGrid } from "lucide-react"
import { SmartImg } from "@/components/common/smart-img"
import type { Category } from "@/lib/types"
import { cn } from "@/lib/utils"

interface Props {
  categories: Category[]
  counts: Record<string, number>
  total: number
  value: string | null
  onChange: (slug: string | null) => void
}

/** Görselli kategori seçici: filtre gibi çalışır, seçili olan altı çizgili ve tam opak. */
export function CategorySelector({ categories, counts, total, value, onChange }: Props) {
  const item = (slug: string | null, label: string, count: number, visual: React.ReactNode) => {
    const on = value === slug
    return (
      <button
        key={slug ?? "all"}
        onClick={() => onChange(slug)}
        aria-pressed={on}
        className="group flex w-[84px] shrink-0 snap-start flex-col items-center gap-2.5 md:w-[104px]"
      >
        <span className={cn("relative block size-[76px] overflow-hidden rounded-md ring-1 ring-offset-2 ring-offset-background transition md:size-24", on ? "ring-foreground" : "ring-transparent opacity-80 group-hover:opacity-100")}>
          {visual}
        </span>
        <span className={cn("text-center t-micro leading-tight transition", on ? "font-semibold text-foreground" : "text-muted-foreground")}>
          {label}
          <span className="block tabular-nums opacity-60">{count}</span>
        </span>
      </button>
    )
  }
  return (
    <div className="no-scrollbar mx-auto flex max-w-7xl snap-x gap-3 overflow-x-auto px-5 pb-2 md:gap-4 md:px-8">
      {item(null, "Tümü", total, <span className="grid size-full place-items-center bg-foreground text-background"><LayoutGrid className="size-6" strokeWidth={1.4} /></span>)}
      {categories.map((c) => item(c.slug, c.name, counts[c.slug] ?? 0, <SmartImg src={c.image} className="size-full" />))}
    </div>
  )
}
