"use client"

import { useState } from "react"
import { ShieldCheck } from "lucide-react"
import { WhatsAppIcon } from "@/components/common/whatsapp-icon"
import { Button } from "@/components/ui/button"
import { useCatalog } from "@/lib/catalog-context"
import { useVisitor, type Customer } from "@/lib/store/visitor"
import { money } from "@/lib/text"
import { quoteMessage, waLink } from "@/lib/whatsapp"
import { CustomerForm } from "./customer-form"
import { OrderSentDialog } from "./order-sent-dialog"
import { useCartLines } from "./use-cart-lines"

export function CartSummary() {
  const { cfg, isB2B } = useCatalog()
  const { lines, count, total } = useCartLines()
  const saved = useVisitor((s) => s.customer)
  const saveCustomer = useVisitor((s) => s.setCustomer)
  const clear = useVisitor((s) => s.clearCart)
  const [customer, setCustomer] = useState<Customer>(saved)
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({})
  const [sent, setSent] = useState(false)

  const send = () => {
    const e: typeof errors = {}
    if (!customer.name.trim()) e.name = "Bu alan gerekli"
    if (customer.phone.replace(/\D/g, "").length < 10) e.phone = "Geçerli bir telefon girin"
    setErrors(e)
    if (Object.keys(e).length) return
    saveCustomer(customer)
    const msg = quoteMessage(cfg, lines.map((l) => ({ item: l.item, product: l.product })), customer)
    window.open(waLink(cfg.contact.whatsapp, msg), "_blank", "noopener")
    setSent(true)
  }

  return (
    <aside className="rounded-lg border bg-card p-5 md:p-7 lg:sticky lg:top-24">
      <h2 className="t-h3">{isB2B ? "Teklif özeti" : "Sipariş özeti"}</h2>
      <dl className="mt-5 space-y-3 border-b pb-5 t-small">
        <div className="flex justify-between"><dt className="text-muted-foreground">Ürün adedi</dt><dd className="font-medium tabular-nums">{count}</dd></div>
        {cfg.showPrices && (
          <>
            <div className="flex justify-between"><dt className="text-muted-foreground">Teslimat & montaj</dt><dd className="font-medium">Ücretsiz</dd></div>
            <div className="flex items-baseline justify-between pt-2"><dt className="t-body font-medium">Tahmini toplam</dt><dd className="text-2xl font-semibold tabular-nums">{money(total, cfg.currency)}</dd></div>
          </>
        )}
      </dl>
      <p className="t-small mt-5 mb-4 text-muted-foreground">
        {isB2B ? "Bilgilerinizi bırakın, listeniz WhatsApp üzerinden satış ekibimize iletilsin." : "Ödeme yapılmaz. Listeniz WhatsApp üzerinden satış temsilcimize iletilir, onay sonrası siparişiniz oluşturulur."}
      </p>
      <CustomerForm value={customer} onChange={setCustomer} b2b={isB2B} errors={errors} />
      <Button size="cta" onClick={send} className="mt-5 w-full bg-[#1FAF5A] text-white hover:bg-[#1FAF5A]/90">
        <WhatsAppIcon className="size-5" /> {isB2B ? "Teklif iste" : "WhatsApp ile sipariş ver"}
      </Button>
      <p className="t-micro mt-3 flex items-center justify-center gap-1.5 text-muted-foreground">
        <ShieldCheck className="size-3.5" /> Bilgileriniz sadece siparişiniz için kullanılır
      </p>
      <OrderSentDialog open={sent} onOpenChange={setSent} onClear={clear} b2b={isB2B} />
    </aside>
  )
}
