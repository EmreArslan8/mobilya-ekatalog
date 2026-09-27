import type { Product } from "@/lib/types"

/** Basit izometrik ölçü çizimi + tablo. */
export function DimensionsDiagram({ d }: { d: Product["dimensions"] }) {
  const rows = [["Genişlik", d.w], ["Derinlik", d.d], ["Yükseklik", d.h]] as const
  return (
    <div className="grid items-center gap-6 sm:grid-cols-[200px_1fr]">
      <svg viewBox="0 0 200 140" className="w-full max-w-[220px] text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <path d="M30 50 L120 50 L170 30 L80 30 Z M30 50 L30 110 L120 110 L120 50 M120 110 L170 90 L170 30" className="text-foreground" stroke="currentColor" />
        <path d="M30 124 L120 124 M30 119 V129 M120 119 V129" strokeDasharray="0" />
        <path d="M182 90 V30 M177 90 H187 M177 30 H187" />
        <path d="M128 22 L176 3" />
        <text x="75" y="138" textAnchor="middle" fill="currentColor" stroke="none" fontSize="11">{d.w} cm</text>
        <text x="192" y="64" fill="currentColor" stroke="none" fontSize="11" transform="rotate(90 192 64)" textAnchor="middle">{d.h} cm</text>
        <text x="150" y="10" fill="currentColor" stroke="none" fontSize="11" textAnchor="middle">{d.d} cm</text>
      </svg>
      <dl className="divide-y border-y">
        {rows.map(([l, v]) => (
          <div key={l} className="flex justify-between py-3 t-small">
            <dt className="text-muted-foreground">{l}</dt>
            <dd className="font-medium tabular-nums">{v} cm</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
