"use client"

import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"

interface Props {
  open: boolean
  onOpenChange: (o: boolean) => void
  onClear: () => void
  b2b: boolean
}

/** WhatsApp açıldıktan sonra: listeyi temizle / koru. */
export function OrderSentDialog({ open, onOpenChange, onClear, b2b }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg p-8 text-center sm:max-w-md">
        <CheckCircle2 className="mx-auto size-12 text-[#1FAF5A]" strokeWidth={1.3} />
        <DialogTitle className="t-h2 mt-2">{b2b ? "Teklif talebiniz hazır" : "Siparişiniz hazır"}</DialogTitle>
        <DialogDescription className="t-body">
          Mesajınız WhatsApp’ta açıldı. Göndere bastığınızda ekibimiz en kısa sürede size dönüş yapacak.
        </DialogDescription>
        <div className="mt-4 grid gap-2">
          <Button size="cta" onClick={() => { onClear(); onOpenChange(false) }}>Listeyi temizle</Button>
          <Button size="cta" variant="outline" className="bg-transparent" onClick={() => onOpenChange(false)}>Listeyi koru</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
