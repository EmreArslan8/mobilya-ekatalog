"use client"

import Link from "next/link"
import { SmartImg } from "@/components/common/smart-img"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDB } from "@/lib/store/db"
import { money } from "@/lib/text"
import type { Product } from "@/lib/types"
import { ProductRowActions } from "./product-row-actions"
import { StockSelect } from "./stock-select"

export function ProductsTable({ products }: { products: Product[] }) {
  const data = useDB((s) => s.data)
  const save = useDB((s) => s.saveProduct)
  const cat = (slug: string) => data.categories.find((c) => c.slug === slug)?.name ?? "—"
  const price = (p: Product) => (p.price != null ? money(p.price, data.config.currency) : "—")

  return (
    <>
      {/* Masaüstü tablo */}
      <div className="hidden overflow-hidden rounded-xl border bg-card shadow-xs md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%] pl-4">Ürün</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Fiyat</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead>Yayında</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="pl-4">
                  <Link href={`/admin/urunler/${p.id}`} className="flex items-center gap-3">
                    <SmartImg src={p.images[0]} className="size-11 shrink-0 rounded-md" />
                    <div className="min-w-0">
                      <p className="truncate font-medium hover:underline">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.sku}</p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">{cat(p.category)}</TableCell>
                <TableCell className="tabular-nums">
                  {price(p)}
                  {p.oldPrice && <Badge variant="secondary" className="ml-2">İndirim</Badge>}
                </TableCell>
                <TableCell><StockSelect value={p.stock} onChange={(stock) => save({ ...p, stock })} /></TableCell>
                <TableCell><Switch checked={p.published} onCheckedChange={(v) => save({ ...p, published: v })} aria-label="Yayında" /></TableCell>
                <TableCell><ProductRowActions product={p} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobil kartlar */}
      <ul className="grid gap-2 md:hidden">
        {products.map((p) => (
          <li key={p.id} className="rounded-xl border bg-card p-3 shadow-xs">
            <div className="flex gap-3">
              <Link href={`/admin/urunler/${p.id}`} className="shrink-0"><SmartImg src={p.images[0]} className="size-16 rounded-md" /></Link>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/admin/urunler/${p.id}`} className="min-w-0">
                    <p className="truncate font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.sku} · {cat(p.category)}</p>
                  </Link>
                  <ProductRowActions product={p} />
                </div>
                <p className="mt-1 text-sm font-medium tabular-nums">{price(p)}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 border-t pt-3">
              <StockSelect value={p.stock} onChange={(stock) => save({ ...p, stock })} />
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                Yayında <Switch checked={p.published} onCheckedChange={(v) => save({ ...p, published: v })} />
              </label>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
