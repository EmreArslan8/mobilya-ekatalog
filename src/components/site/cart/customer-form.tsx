"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Customer } from "@/lib/store/visitor"

interface Props {
  value: Customer
  onChange: (c: Customer) => void
  b2b: boolean
  errors: Partial<Record<keyof Customer, string>>
}

export function CustomerForm({ value, onChange, b2b, errors }: Props) {
  const set = (k: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...value, [k]: e.target.value })
  const field = "h-12 rounded-md bg-background t-body"
  return (
    <div className="grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="c-name" className="t-micro uppercase tracking-[0.12em] text-muted-foreground">{b2b ? "Firma / mağaza adı" : "Ad soyad"} *</Label>
        <Input id="c-name" value={value.name} onChange={set("name")} autoComplete={b2b ? "organization" : "name"} aria-invalid={!!errors.name} className={field} />
        {errors.name && <p className="t-micro text-destructive">{errors.name}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="c-phone" className="t-micro uppercase tracking-[0.12em] text-muted-foreground">Telefon *</Label>
          <Input id="c-phone" type="tel" inputMode="tel" value={value.phone} onChange={set("phone")} autoComplete="tel" aria-invalid={!!errors.phone} className={field} />
          {errors.phone && <p className="t-micro text-destructive">{errors.phone}</p>}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="c-city" className="t-micro uppercase tracking-[0.12em] text-muted-foreground">Şehir</Label>
          <Input id="c-city" value={value.city} onChange={set("city")} autoComplete="address-level2" className={field} />
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="c-note" className="t-micro uppercase tracking-[0.12em] text-muted-foreground">Not</Label>
        <Textarea id="c-note" rows={3} value={value.note} onChange={set("note")} placeholder={b2b ? "Özel ölçü, kumaş kodu, termin…" : "Teslimat tarihi, kat / asansör bilgisi…"} className="rounded-md bg-background t-body" />
      </div>
    </div>
  )
}
