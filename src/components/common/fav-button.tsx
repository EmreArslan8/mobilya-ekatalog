"use client"

import { Heart } from "lucide-react"
import { toast } from "sonner"
import { useVisitor } from "@/lib/store/visitor"
import { cn } from "@/lib/utils"

export function FavButton({ id, className }: { id: string; className?: string }) {
  const on = useVisitor((s) => s.fav.includes(id))
  const toggle = useVisitor((s) => s.toggleFav)
  return (
    <button
      type="button"
      aria-label={on ? "Favorilerden çıkar" : "Favorilere ekle"}
      aria-pressed={on}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toast(toggle(id) ? "Favorilere eklendi" : "Favorilerden çıkarıldı")
      }}
      className={cn("grid size-9 place-items-center rounded-md bg-white/85 text-neutral-900 backdrop-blur transition active:scale-90", className)}
    >
      <Heart strokeWidth={1.5} className={cn("size-[18px] transition", on && "fill-sale stroke-sale scale-110")} />
    </button>
  )
}
