"use client"

import { useEffect, useState } from "react"
import { Field } from "@/components/admin/common/field"
import { ImageField } from "@/components/admin/media/image-field"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { slugify } from "@/lib/text"

export interface TaxDraft { slug: string; name: string; image: string; text?: string }

interface Props {
  open: boolean
  onOpenChange: (o: boolean) => void
  initial: TaxDraft | null
  withText: boolean
  noun: string
  takenSlugs: string[]
  onSave: (item: TaxDraft, prevSlug?: string) => void
}

/** Kategori/koleksiyon ekle-düzenle. Adres (slug) addan otomatik üretilir, istenirse düzenlenir. */
export function TaxonomyDialog({ open, onOpenChange, initial, withText, noun, takenSlugs, onSave }: Props) {
  const [d, setD] = useState<TaxDraft>({ slug: "", name: "", image: "", text: "" })
  const [slugTouched, setSlugTouched] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!open) return
    setD(initial ?? { slug: "", name: "", image: "scene-cream", text: "" })
    setSlugTouched(!!initial)
    setError("")
  }, [open, initial])

  const submit = () => {
    if (!d.name.trim()) return setError("Ad gerekli")
    const slug = slugify(d.slug || d.name)
    if (takenSlugs.includes(slug) && slug !== initial?.slug) return setError("Bu adres zaten kullanılıyor")
    onSave({ ...d, name: d.name.trim(), slug }, initial?.slug)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader><DialogTitle>{initial ? `${noun} düzenle` : `Yeni ${noun.toLocaleLowerCase("tr")}`}</DialogTitle></DialogHeader>
        <div className="grid gap-4">
          <ImageField value={d.image} onChange={(image) => setD({ ...d, image })} aspect="aspect-[16/9]" />
          <Field label="Ad" htmlFor="t-name" error={error}>
            <Input id="t-name" value={d.name} autoFocus onChange={(e) => setD({ ...d, name: e.target.value, slug: slugTouched ? d.slug : slugify(e.target.value) })} />
          </Field>
          <Field label="Adres" htmlFor="t-slug" hint={`Site adresinde görünür: /${noun === "Kategori" ? "urunler?kategori=" : "koleksiyon/"}${d.slug || "…"}`}>
            <Input id="t-slug" value={d.slug} onChange={(e) => { setSlugTouched(true); setD({ ...d, slug: slugify(e.target.value) }) }} className="font-mono text-xs" />
          </Field>
          {withText && (
            <Field label="Kısa açıklama" htmlFor="t-text">
              <Textarea id="t-text" rows={2} value={d.text ?? ""} onChange={(e) => setD({ ...d, text: e.target.value })} />
            </Field>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Vazgeç</Button>
          <Button onClick={submit}>Kaydet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
