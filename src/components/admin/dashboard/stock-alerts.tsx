import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { SectionCard } from "@/components/admin/common/section-card"
import { SmartImg } from "@/components/common/smart-img"
import { StockBadge } from "@/components/common/stock-badge"
import type { Product } from "@/lib/types"

export function StockAlerts({ products }: { products: Product[] }) {
  return (
    <SectionCard title="Stok uyarıları" text="“Son ürünler” durumundaki ürünler">
      {products.length ? (
        <ul className="divide-y">
          {products.map((p) => (
            <li key={p.id}>
              <Link href={`/admin/urunler/${p.id}`} className="flex items-center gap-3 py-2.5 hover:opacity-80">
                <SmartImg src={p.images[0]} className="size-10 shrink-0 rounded-md" />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.sku}</p></div>
                <StockBadge status={p.stock} className="text-xs" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="size-4 text-emerald-500" /> Tüm ürünlerin stoku yeterli.</p>
      )}
    </SectionCard>
  )
}
