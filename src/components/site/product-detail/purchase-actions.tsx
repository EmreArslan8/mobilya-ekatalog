"use client"

import { ShoppingBag } from "lucide-react"
import { QtyStepper } from "@/components/common/qty-stepper"
import { WhatsAppIcon } from "@/components/common/whatsapp-icon"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Props {
  qty: number
  min: number
  onQty: (n: number) => void
  onAdd: () => void
  onAsk: () => void
  addLabel: string
  className?: string
}

/** Satın alma bloğu: [adet][sepete ekle] + tam genişlik WhatsApp, hepsi h-14.
 *  Mobilde butonlar StickyPurchaseBar'da olduğu için burada sadece adet görünür. */
export function PurchaseActions({ qty, min, onQty, onAdd, onAsk, addLabel, className }: Props) {
  return (
    <div className={cn("space-y-2.5", className)}>
      <div className="flex gap-2.5">
        <QtyStepper value={qty} min={min} onChange={onQty} className="w-full shrink-0 lg:w-36" />
        <Button onClick={onAdd} size="cta" className="flex-1 max-lg:hidden">
          <ShoppingBag className="size-[18px]" strokeWidth={1.6} /> {addLabel}
        </Button>
      </div>
      <Button onClick={onAsk} variant="outline" size="cta" className="w-full bg-transparent max-lg:hidden">
        <WhatsAppIcon className="size-[18px] text-[#1FAF5A]" /> WhatsApp’tan sor
      </Button>
      {min > 1 && <p className="t-small text-muted-foreground">Minimum sipariş adedi: {min}</p>}
    </div>
  )
}
