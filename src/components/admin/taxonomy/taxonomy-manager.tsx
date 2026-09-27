"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { ConfirmDialog } from "@/components/admin/common/confirm-dialog"
import { AdminPageHeader } from "@/components/admin/common/page-header"
import { SmartImg } from "@/components/common/smart-img"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDB } from "@/lib/store/db"
import { TaxonomyDialog, type TaxDraft } from "./taxonomy-dialog"

interface Props {
  kind: "categories" | "collections"
  title: string
  noun: string
  text: string
}

/** Kategoriler ve koleksiyonlar için ortak yönetim ekranı. */
export function TaxonomyManager({ kind, title, noun, text }: Props) {
  const data = useDB((s) => s.data)
  const saveTax = useDB((s) => s.saveTaxonomy)
  const delTax = useDB((s) => s.deleteTaxonomy)
  const [editing, setEditing] = useState<TaxDraft | null>(null)
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState<TaxDraft | null>(null)

  const items = data[kind] as TaxDraft[]
  const key = kind === "categories" ? "category" : "collection"
  const count = (slug: string) => data.products.filter((p) => p[key] === slug).length

  const edit = (item: TaxDraft | null) => { setEditing(item); setOpen(true) }
  const askDelete = (item: TaxDraft) => {
    const n = count(item.slug)
    if (n) return toast.error(`Bu ${noun.toLocaleLowerCase("tr")} ${n} üründe kullanılıyor`, { description: "Önce ürünleri başka bir yere taşıyın." })
    setDeleting(item)
  }

  return (
    <>
      <AdminPageHeader title={title} text={text} actions={<Button onClick={() => edit(null)}><Plus /> Yeni {noun.toLocaleLowerCase("tr")}</Button>} />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {items.map((it) => (
          <div key={it.slug} className="group overflow-hidden rounded-xl border bg-card shadow-xs">
            <button onClick={() => edit(it)} className="block w-full"><SmartImg src={it.image} className="aspect-[4/3]" imgClassName="group-hover:scale-105" /></button>
            <div className="flex items-start justify-between gap-2 p-3">
              <div className="min-w-0">
                <p className="truncate font-medium">{it.name}</p>
                <p className="text-xs text-muted-foreground">{count(it.slug)} ürün</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="İşlemler" />}><MoreHorizontal /></DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => edit(it)}><Pencil /> Düzenle</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive" onClick={() => askDelete(it)}><Trash2 /> Sil</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
        <button onClick={() => edit(null)} className="flex min-h-48 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-sm text-muted-foreground transition hover:border-foreground/30 hover:bg-card">
          <Plus className="size-5" /> Yeni {noun.toLocaleLowerCase("tr")}
        </button>
      </div>

      <TaxonomyDialog
        open={open}
        onOpenChange={setOpen}
        initial={editing}
        withText={kind === "collections"}
        noun={noun}
        takenSlugs={items.map((i) => i.slug)}
        onSave={(item, prev) => {
          const clean = kind === "collections" ? { ...item, text: item.text ?? "" } : { slug: item.slug, name: item.name, image: item.image }
          saveTax(kind, clean as never, prev)
          toast.success(prev ? "Güncellendi" : `${noun} eklendi`, { description: item.name })
        }}
      />
      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
        title={`${noun} silinsin mi?`}
        text={`“${deleting?.name}” kalıcı olarak silinecek.`}
        onConfirm={() => { if (deleting) { delTax(kind, deleting.slug); toast.success("Silindi") } }}
      />
    </>
  )
}
