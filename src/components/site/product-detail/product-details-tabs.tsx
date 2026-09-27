import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Product } from "@/lib/types"
import { DimensionsDiagram } from "./dimensions-diagram"

export function ProductDetailsTabs({ product: p, b2b }: { product: Product; b2b: boolean }) {
  const trigger = "h-11 flex-none shrink-0 rounded-none px-0 t-micro font-medium uppercase tracking-[0.14em] data-active:shadow-none"
  return (
    <Tabs defaultValue="desc" className="gap-0">
      <TabsList variant="line" className="no-scrollbar h-auto w-full justify-start gap-5 overflow-x-auto border-b p-0 sm:gap-7">
        <TabsTrigger value="desc" className={trigger}>Açıklama</TabsTrigger>
        <TabsTrigger value="dims" className={trigger}>Ölçüler</TabsTrigger>
        <TabsTrigger value="care" className={trigger}>{b2b ? "Üretim" : "Teslimat"}</TabsTrigger>
      </TabsList>
      <TabsContent value="desc" className="pt-6 t-body text-muted-foreground">
        <p>{p.description}</p>
        <p className="mt-4"><span className="font-medium text-foreground">Malzeme:</span> {p.material}</p>
        {p.custom?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {p.custom.map((c) => <span key={c} className="rounded-sm border px-3 py-1.5 t-micro font-medium uppercase tracking-[0.1em] text-foreground">{c}</span>)}
          </div>
        ) : null}
      </TabsContent>
      <TabsContent value="dims" className="pt-6"><DimensionsDiagram d={p.dimensions} /></TabsContent>
      <TabsContent value="care" className="space-y-3 pt-6 t-body text-muted-foreground">
        {b2b ? (
          <>
            <p>Tüm ürünler siparişe göre fabrikamızda üretilir. Kumaş ve renk kartelası bayilere ücretsiz gönderilir.</p>
            <p>Toplu siparişlerde özel ölçü, etiketleme ve paketleme seçenekleri sunulur.</p>
          </>
        ) : (
          <>
            <p>İstanbul içi teslimat ve montaj ücretsizdir. Diğer şehirlere anlaşmalı nakliye ile gönderim yapılır.</p>
            <p>Kumaş yüzeyleri nemli bezle silinebilir; ahşap yüzeylerde alkol içeren temizleyici kullanmayın.</p>
          </>
        )}
      </TabsContent>
    </Tabs>
  )
}
