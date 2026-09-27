"use client"

import Link from "next/link"
import { useState } from "react"
import { Copy, ExternalLink, Eye, EyeOff, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { ConfirmDialog } from "@/components/admin/common/confirm-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { duplicateProduct } from "@/lib/admin/product-draft"
import { useDB } from "@/lib/store/db"
import type { Product } from "@/lib/types"

export function ProductRowActions({ product: p }: { product: Product }) {
  const data = useDB((s) => s.data)
  const save = useDB((s) => s.saveProduct)
  const remove = useDB((s) => s.deleteProduct)
  const [confirm, setConfirm] = useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="İşlemler" />}>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem render={<Link href={`/admin/urunler/${p.id}`} />}><Pencil /> Düzenle</DropdownMenuItem>
          <DropdownMenuItem render={<a href={`/urun/${p.id}`} target="_blank" rel="noopener" />} disabled={!p.published}><ExternalLink /> Sitede gör</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { const c = duplicateProduct(p, data); save(c); toast.success("Ürün kopyalandı", { description: `${c.name} taslak olarak eklendi` }) }}><Copy /> Kopyala</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { save({ ...p, published: !p.published }); toast(p.published ? "Ürün gizlendi" : "Ürün yayında") }}>
            {p.published ? <><EyeOff /> Yayından kaldır</> : <><Eye /> Yayınla</>}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => setConfirm(true)}><Trash2 /> Sil</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        open={confirm}
        onOpenChange={setConfirm}
        title="Ürün silinsin mi?"
        text={`“${p.name}” kalıcı olarak silinecek. Bu işlem geri alınamaz.`}
        onConfirm={() => { remove(p.id); toast.success("Ürün silindi") }}
      />
    </>
  )
}
