import { CalendarClock, Layers, PackageCheck, ShieldCheck, Truck, Wrench, type LucideIcon } from "lucide-react"
import type { Collection, Product } from "@/lib/types"

type Fact = { icon: LucideIcon; label: string; value: string }

export function ProductFacts({ product: p, collection, b2b }: { product: Product; collection?: Collection; b2b: boolean }) {
  const facts: Fact[] = b2b
    ? [
        { icon: PackageCheck, label: "Minimum sipariş", value: `${p.moq ?? 1} adet` },
        { icon: CalendarClock, label: "Üretim süresi", value: p.leadTime ?? "Teklifte belirtilir" },
        { icon: Layers, label: "Seri", value: collection?.name ?? "-" },
        { icon: ShieldCheck, label: "Garanti", value: "36 ay üretici garantisi" },
      ]
    : [
        { icon: Truck, label: "Teslimat", value: p.stock === "siparis" ? "3–4 hafta" : "3–5 iş günü" },
        { icon: Wrench, label: "Montaj", value: "Ücretsiz kurulum" },
        { icon: ShieldCheck, label: "Garanti", value: "24 ay" },
        { icon: Layers, label: "Koleksiyon", value: collection?.name ?? "-" },
      ]
  return (
    <dl className="grid grid-cols-4 divide-x border-y">
      {facts.map((f) => (
        <div key={f.label} className="flex flex-col items-center gap-2 px-1.5 py-5 text-center">
          <f.icon className="size-6 text-muted-foreground" strokeWidth={1.3} />
          <dt className="text-[0.66rem] uppercase leading-tight tracking-[0.12em] text-muted-foreground sm:t-micro">{f.label}</dt>
          <dd className="t-micro font-medium leading-snug sm:t-small">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}
