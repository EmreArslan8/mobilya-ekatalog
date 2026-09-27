"use client"

import { Field } from "@/components/admin/common/field"
import { SectionCard } from "@/components/admin/common/section-card"
import { Input } from "@/components/ui/input"
import type { SiteConfig } from "@/lib/types"
import type { ConfigSetter } from "./use-settings-draft"

type C = SiteConfig["contact"]

export function ContactTab({ draft, set }: { draft: SiteConfig; set: ConfigSetter }) {
  const c = draft.contact
  const upd = (k: keyof C, v: string) => set("contact", { ...c, [k]: v })
  return (
    <SectionCard title="İletişim & sipariş hattı" text="Siparişler bu WhatsApp numarasına gelir.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="WhatsApp numarası" htmlFor="c-wa" hint="Ülke koduyla, boşluksuz: 905xxxxxxxxx">
          <Input id="c-wa" inputMode="tel" value={c.whatsapp} onChange={(e) => upd("whatsapp", e.target.value.replace(/\D/g, ""))} />
        </Field>
        <Field label="Telefon" htmlFor="c-ph"><Input id="c-ph" value={c.phone} onChange={(e) => upd("phone", e.target.value)} /></Field>
        <Field label="E-posta" htmlFor="c-em"><Input id="c-em" type="email" value={c.email} onChange={(e) => upd("email", e.target.value)} /></Field>
        <Field label="Instagram kullanıcı adı" htmlFor="c-ig"><Input id="c-ig" value={c.instagram} onChange={(e) => upd("instagram", e.target.value.replace("@", ""))} /></Field>
        <Field label="Adres" htmlFor="c-ad" className="sm:col-span-2" hint="İletişim sayfasındaki harita bu adresi gösterir"><Input id="c-ad" value={c.address} onChange={(e) => upd("address", e.target.value)} /></Field>
        <Field label="Çalışma saatleri" htmlFor="c-hr"><Input id="c-hr" value={c.hours} onChange={(e) => upd("hours", e.target.value)} /></Field>
      </div>
    </SectionCard>
  )
}
