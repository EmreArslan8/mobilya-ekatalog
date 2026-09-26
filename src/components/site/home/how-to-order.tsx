import { MessageCircle, MousePointerClick, ShoppingBag, Truck } from "lucide-react"

/** WhatsApp sipariş akışını ziyaretçiye 4 adımda anlatan bölüm. */
export function HowToOrder({ b2b }: { b2b: boolean }) {
  const steps = [
    { icon: MousePointerClick, title: "Ürünü seçin", text: "Renk, kumaş ve adet tercihlerinizi belirleyin." },
    { icon: ShoppingBag, title: b2b ? "Listeye ekleyin" : "Sepete ekleyin", text: "Dilediğiniz kadar ürünü tek listede toplayın." },
    { icon: MessageCircle, title: "WhatsApp’tan gönderin", text: "Listeniz hazır mesaj olarak tek dokunuşla bize ulaşır." },
    { icon: Truck, title: b2b ? "Teklif & üretim" : "Onay & teslimat", text: b2b ? "Bayi fiyatı ve termin bilgisi size iletilir." : "Temsilcimiz dönüş yapar, teslimatı planlarız." },
  ]
  return (
    <section className="mt-24 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <span className="t-eyebrow opacity-60">Nasıl sipariş verilir?</span>
            <h2 className="t-h1 mt-4 text-balance">Katalogdan seçin, WhatsApp’tan tek mesajla sipariş verin.</h2>
          </div>
          <ol className="grid border-t border-background/15 sm:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5 border-b border-background/15 py-6 sm:odd:pr-8 sm:even:border-l sm:even:pl-8">
                <span className="t-micro pt-1 tabular-nums tracking-[0.2em] opacity-50">0{i + 1}</span>
                <div>
                  <s.icon className="mb-4 size-5 opacity-80" strokeWidth={1.4} />
                  <p className="t-body font-medium">{s.title}</p>
                  <p className="t-small mt-1.5 opacity-60">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
