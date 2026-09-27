"use client"

import { AtSign, Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react"
import { LinkButton } from "@/components/common/link-button"
import { PageHeading } from "@/components/common/page-heading"
import { WhatsAppIcon } from "@/components/common/whatsapp-icon"
import { useCatalog } from "@/lib/catalog-context"
import { waLink } from "@/lib/whatsapp"

export function ContactView() {
  const { cfg, isB2B } = useCatalog()
  const c = cfg.contact
  const rows: { icon: LucideIcon; label: string; value: string; href?: string }[] = [
    { icon: MapPin, label: isB2B ? "Fabrika" : "Showroom", value: c.address, href: `https://maps.google.com/?q=${encodeURIComponent(c.address)}` },
    { icon: Phone, label: "Telefon", value: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "E-posta", value: c.email, href: `mailto:${c.email}` },
    { icon: Clock, label: "Çalışma saatleri", value: c.hours },
    { icon: AtSign, label: "Instagram", value: `@${c.instagram}`, href: `https://instagram.com/${c.instagram}` },
  ]
  return (
    <>
      <PageHeading variant="hero" eyebrow={cfg.tagline} title="İletişim" text={isB2B ? "Bayilik, proje satışları ve toplu siparişler için bize ulaşın." : "Showroom’umuza bekleriz. Sorularınız için WhatsApp hattımız her gün açık."} />
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-8 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-14">
        <div>
          <ul className="divide-y border-y">
            {rows.map((r) => {
              const inner = (
                <>
                  <r.icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" strokeWidth={1.4} />
                  <div>
                    <p className="t-micro uppercase tracking-[0.14em] text-muted-foreground">{r.label}</p>
                    <p className="t-body mt-1 font-medium">{r.value}</p>
                  </div>
                </>
              )
              return (
                <li key={r.label}>
                  {r.href ? (
                    <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="flex gap-4 py-5 transition hover:bg-muted/50">{inner}</a>
                  ) : (
                    <div className="flex gap-4 py-5">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
          <LinkButton size="cta" href={waLink(c.whatsapp, `Merhaba ${cfg.name}, bilgi almak istiyorum.`)} className="mt-6 w-full bg-[#1FAF5A] text-white hover:bg-[#1FAF5A]/90">
            <WhatsAppIcon className="size-5" /> WhatsApp’tan yazın
          </LinkButton>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <iframe
            title="Harita"
            src={`https://www.google.com/maps?q=${encodeURIComponent(c.address)}&output=embed`}
            className="aspect-[4/3] h-full min-h-[360px] w-full grayscale-[0.6]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </>
  )
}
