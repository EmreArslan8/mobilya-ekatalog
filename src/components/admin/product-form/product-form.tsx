"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/common/page-header"
import { SectionCard } from "@/components/admin/common/section-card"
import { ImagesField } from "@/components/admin/media/images-field"
import { LinkButton } from "@/components/common/link-button"
import { NotFoundView } from "@/components/common/not-found-view"
import { Button } from "@/components/ui/button"
import { B2BSection } from "./b2b-section"
import { BasicsSection } from "./basics-section"
import { DimensionsSection } from "./dimensions-section"
import { PricingSection } from "./pricing-section"
import { ProductPreview } from "./product-preview"
import { SaveBar } from "@/components/admin/common/save-bar"
import { useProductForm } from "./use-product-form"
import { VariantsSection } from "./variants-section"

export function ProductForm({ id }: { id: string }) {
  const { draft, set, errors, dirty, save, isNew, data } = useProductForm(id)
  const router = useRouter()
  if (!draft) return <NotFoundView text="Ürün bulunamadı veya silinmiş." />
  const b2b = data.config.mode === "b2b"

  return (
    <>
      <LinkButton href="/admin/urunler" variant="ghost" size="sm" className="-ml-2 mb-2 text-muted-foreground"><ArrowLeft /> Ürünler</LinkButton>
      <AdminPageHeader
        title={isNew ? "Yeni ürün" : draft.name || "Ürünü düzenle"}
        text={isNew ? "Ürün bilgilerini girin, görselleri ekleyin ve yayınlayın." : `${draft.sku} · son değişiklikler kaydedilene kadar sitede görünmez`}
        actions={<Button onClick={save}>{isNew ? "Ürünü ekle" : "Kaydet"}</Button>}
      />
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-5">
          <BasicsSection draft={draft} set={set} errors={errors} data={data} />
          <SectionCard title="Görseller" text="İlk görsel kapak olarak kullanılır. Dikey (4:5) fotoğraflar en iyi sonucu verir.">
            <ImagesField value={draft.images} onChange={(v) => set("images", v)} error={errors.images} />
          </SectionCard>
          <VariantsSection value={draft.colors} onChange={(v) => set("colors", v)} error={errors.colors} />
          <DimensionsSection value={draft.dimensions} onChange={(v) => set("dimensions", v)} />
        </div>
        <div className="grid content-start gap-5 lg:sticky lg:top-20">
          <PricingSection draft={draft} set={set} cfg={data.config} error={errors.price} />
          {b2b && <B2BSection draft={draft} set={set} />}
          <ProductPreview draft={draft} cfg={data.config} />
        </div>
      </div>
      <SaveBar visible={dirty} isNew={isNew} onSave={save} onDiscard={() => router.push("/admin/urunler")} />
    </>
  )
}
