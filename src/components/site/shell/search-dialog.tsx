"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { SmartImg } from "@/components/common/smart-img"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useCatalog } from "@/lib/catalog-context"
import { searchProducts } from "@/lib/search"
import { useUI } from "@/lib/store/ui"
import { money } from "@/lib/text"
import type { Product } from "@/lib/types"

/** ⌘K / mobil "Ara" sekmesi: ürün, kod, renk, malzeme araması. */
export function SearchDialog() {
  const { data, cfg, catOf, products } = useCatalog()
  const open = useUI((s) => s.searchOpen)
  const setOpen = useUI((s) => s.setSearchOpen)
  const [q, setQ] = useState("")
  const router = useRouter()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen(true) }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [setOpen])

  const results = useMemo(() => searchProducts(data, q).slice(0, 12), [data, q])
  const popular = useMemo(() => products.filter((p) => p.tags.includes("cok-satan")).slice(0, 5), [products])
  const go = (href: string) => { setOpen(false); setQ(""); router.push(href) }

  const row = (p: Product) => (
    <CommandItem key={p.id} value={p.id} onSelect={() => go(`/urun/${p.id}`)} className="gap-4 rounded-md p-2">
      <SmartImg src={p.images[0]} className="size-14 shrink-0 rounded-sm" />
      <div className="min-w-0 flex-1">
        <div className="truncate t-body font-medium">{p.name}</div>
        <div className="truncate t-micro text-muted-foreground">
          {p.sku} · {catOf(p.category)?.name}
        </div>
      </div>
      {cfg.showPrices && p.price != null && <span className="t-small font-semibold tabular-nums">{money(p.price, cfg.currency)}</span>}
    </CommandItem>
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Ürün ara" description="Ürün adı, kodu, rengi veya malzemesi" className="top-[10%] max-w-[calc(100%-2rem)] rounded-lg! sm:max-w-2xl">
      <Command shouldFilter={false} className="rounded-lg bg-popover p-2 [&_[cmdk-group-heading]]:t-eyebrow [&_[cmdk-group-heading]]:text-muted-foreground">
      <CommandInput placeholder="Kanepe, kadife, NV-100…" value={q} onValueChange={setQ} className="h-12 t-body" />
      <CommandList className="max-h-[65dvh]">
        {q ? (
          <>
            <CommandEmpty>
              <Search className="mx-auto mb-2 size-6 text-muted-foreground" />
              “{q}” için sonuç yok.
            </CommandEmpty>
            {results.length > 0 && <CommandGroup heading={`${results.length} ürün`}>{results.map(row)}</CommandGroup>}
          </>
        ) : (
          <>
            <CommandGroup heading="Kategoriler">
              {data.categories.map((c) => (
                <CommandItem key={c.slug} value={`cat-${c.slug}`} onSelect={() => go(`/urunler?kategori=${c.slug}`)} className="rounded-md py-2.5 t-body">
                  {c.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Popüler">{popular.map(row)}</CommandGroup>
          </>
        )}
      </CommandList>
      </Command>
    </CommandDialog>
  )
}
