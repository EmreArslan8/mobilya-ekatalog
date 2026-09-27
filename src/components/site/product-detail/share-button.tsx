"use client"

import { Share2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function ShareButton({ title, className }: { title: string; className?: string }) {
  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title, url }) } catch {}
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      toast("Bağlantı kopyalandı")
    } catch {
      toast.error("Bağlantı kopyalanamadı")
    }
  }
  return (
    <button onClick={share} aria-label="Paylaş" className={cn("grid size-9 place-items-center rounded-md bg-white/85 text-neutral-900 backdrop-blur transition active:scale-90", className)}>
      <Share2 className="size-[17px]" strokeWidth={1.5} />
    </button>
  )
}
