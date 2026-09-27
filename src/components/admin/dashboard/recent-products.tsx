import Link from "next/link"
import { SectionCard } from "@/components/admin/common/section-card"
import { SmartImg } from "@/components/common/smart-img"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

export function RecentProducts({ products }: { products: Product[] }) {
  return (
    <SectionCard title="Son eklenen ürünler" action={<Link href="/admin/urunler" className="text-sm text-muted-foreground hover:text-foreground">Tümü →</Link>}>
      <ul className="divide-y">
        {products.map((p) => (
          <li key={p.id}>
            <Link href={`/admin/urunler/${p.id}`} className="flex items-center gap-3 py-2.5 hover:opacity-80">
              <SmartImg src={p.images[0]} className="size-10 shrink-0 rounded-md" />
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{new Date(p.createdAt).toLocaleDateString("tr-TR")}</p></div>
              {!p.published && <Badge variant="secondary">Gizli</Badge>}
            </Link>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}
