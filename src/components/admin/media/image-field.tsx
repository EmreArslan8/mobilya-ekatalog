"use client"

import { useState } from "react"
import { ImagePlus } from "lucide-react"
import { SmartImg } from "@/components/common/smart-img"
import { Button } from "@/components/ui/button"
import { ImagePickerDialog } from "./image-picker-dialog"

/** Tekli görsel (kategori, koleksiyon, banner kapakları). */
export function ImageField({ value, onChange, aspect = "aspect-[4/3]" }: { value: string; onChange: (v: string) => void; aspect?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative overflow-hidden rounded-lg border">
      {value ? <SmartImg src={value} className={aspect} /> : <div className={`${aspect} grid place-items-center bg-muted text-muted-foreground`}><ImagePlus className="size-6" /></div>}
      <Button type="button" size="sm" variant="secondary" onClick={() => setOpen(true)} className="absolute right-2 bottom-2 shadow-sm">
        <ImagePlus /> {value ? "Değiştir" : "Görsel seç"}
      </Button>
      <ImagePickerDialog open={open} onOpenChange={setOpen} onPick={([r]) => onChange(r)} />
    </div>
  )
}
