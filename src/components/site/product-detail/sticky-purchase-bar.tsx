"use client"

import { ShoppingBag } from "lucide-react"
import { WhatsAppIcon } from "@/components/common/whatsapp-icon"
import { Button } from "@/components/ui/button"

/** Mobil: ekranın altında sabit satın alma çubuğu (tab bar ürün sayfasında gizlenir). */
export function StickyPurchaseBar({ onAdd, onAsk, addLabel, price }: { onAdd: () => void; onAsk: () => void; addLabel: string; price?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 pb-safe backdrop-blur-xl lg:hidden animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center gap-2 px-4 py-3">
        <Button onClick={onAsk} variant="outline" className="size-14 shrink-0 bg-transparent p-0" aria-label="WhatsApp’tan sor">
          <WhatsAppIcon className="size-6 text-[#1FAF5A]" />
        </Button>
        <Button onClick={onAdd} size="cta" className="flex-1 justify-between px-5">
          <span className="flex items-center gap-2"><ShoppingBag className="size-4" /> {addLabel}</span>
          {price && <span className="tabular-nums tracking-normal">{price}</span>}
        </Button>
      </div>
    </div>
  )
}
