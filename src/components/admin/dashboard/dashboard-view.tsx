"use client"

import { Eye, FolderTree, Package, TriangleAlert } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/common/page-header"
import { StatCard } from "@/components/admin/common/stat-card"
import { catalogStats } from "@/lib/admin/stats"
import { useDB } from "@/lib/store/db"
import { QuickActions } from "./quick-actions"
import { RecentProducts } from "./recent-products"
import { ShareCard } from "./share-card"
import { StockAlerts } from "./stock-alerts"

export function DashboardView() {
  const data = useDB((s) => s.data)
  const s = catalogStats(data)
  return (
    <>
      <AdminPageHeader title={`Merhaba, ${data.config.name}`} text={`${data.config.catalogTitle} · son güncelleme ${new Date(data.updatedAt).toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" })}`} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={Package} label="Toplam ürün" value={s.total} hint={`${s.drafts} gizli`} />
        <StatCard icon={Eye} label="Yayında" value={s.published} hint={`${s.onSale} indirimli`} />
        <StatCard icon={TriangleAlert} label="Stok azalan" value={s.low.length} hint={`${s.onOrder} siparişe özel`} />
        <StatCard icon={FolderTree} label="Kategori" value={s.categories} hint={`${s.collections} koleksiyon`} />
      </div>
      <div className="mt-5"><QuickActions /></div>
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <RecentProducts products={s.recent} />
        <div className="grid content-start gap-5">
          <ShareCard name={data.config.name} />
          <StockAlerts products={s.low} />
        </div>
      </div>
    </>
  )
}
