"use client"

import { useRef, useState } from "react"
import { Check, ImageUp, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { SmartImg } from "@/components/common/smart-img"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { resizeImage, STOCK_IMAGES } from "@/lib/images"
import { cn } from "@/lib/utils"

interface Props {
  open: boolean
  onOpenChange: (o: boolean) => void
  onPick: (refs: string[]) => void
  multiple?: boolean
}

/** Görsel seçici: demo kütüphanesi veya cihazdan yükleme (tarayıcıda küçültülür). */
export function ImagePickerDialog({ open, onOpenChange, onPick, multiple }: Props) {
  const [sel, setSel] = useState<string[]>([])
  const [busy, setBusy] = useState(false)
  const input = useRef<HTMLInputElement>(null)

  const finish = (refs: string[]) => {
    if (!refs.length) return
    onPick(refs)
    setSel([])
    onOpenChange(false)
  }
  const toggle = (r: string) => {
    if (!multiple) return finish([r])
    setSel((s) => (s.includes(r) ? s.filter((x) => x !== r) : [...s, r]))
  }
  const upload = async (files: FileList | null) => {
    if (!files?.length) return
    setBusy(true)
    try {
      const list = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, multiple ? 8 : 1)
      finish(await Promise.all(list.map((f) => resizeImage(f))))
    } catch {
      toast.error("Görsel işlenemedi")
    } finally {
      setBusy(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-hidden sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Görsel seç</DialogTitle>
          <DialogDescription>Kendi fotoğraflarınızı yükleyin veya demo kütüphanesinden seçin.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="upload" className="min-h-0">
          <TabsList>
            <TabsTrigger value="upload">Yükle</TabsTrigger>
            <TabsTrigger value="library">Kütüphane</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="pt-3">
            <button
              type="button"
              onClick={() => input.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); upload(e.dataTransfer.files) }}
              className="flex h-64 w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed text-muted-foreground transition hover:border-foreground/30 hover:bg-muted/50"
            >
              {busy ? <Loader2 className="size-8 animate-spin" /> : <ImageUp className="size-8" />}
              <span className="text-sm font-medium text-foreground">Dosyaları sürükleyin veya seçin</span>
              <span className="text-xs">JPG / PNG / WEBP · otomatik olarak küçültülür</span>
            </button>
            <input ref={input} type="file" accept="image/*" multiple={multiple} hidden onChange={(e) => upload(e.target.files)} />
          </TabsContent>
          <TabsContent value="library" className="pt-3">
            <div className="grid max-h-[50dvh] grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-5">
              {STOCK_IMAGES.map((r) => {
                const on = sel.includes(r)
                return (
                  <button key={r} type="button" onClick={() => toggle(r)} className={cn("relative overflow-hidden rounded-lg ring-2 ring-offset-2 ring-offset-background transition", on ? "ring-foreground" : "ring-transparent hover:opacity-85")}>
                    <SmartImg src={r} className="aspect-square" />
                    {on && <span className="absolute top-1.5 right-1.5 grid size-6 place-items-center rounded-full bg-foreground text-background"><Check className="size-3.5" /></span>}
                  </button>
                )
              })}
            </div>
            {multiple && (
              <DialogFooter className="mt-4">
                <Button onClick={() => finish(sel)} disabled={!sel.length}>{sel.length ? `${sel.length} görsel ekle` : "Görsel seçin"}</Button>
              </DialogFooter>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
