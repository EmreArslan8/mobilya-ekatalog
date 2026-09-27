"use client"

import Link from "next/link"
import { Clock, AtSign, Mail, MapPin, Phone } from "lucide-react"
import { BrandMark } from "@/components/common/brand-mark"
import { useCatalog } from "@/lib/catalog-context"
import { MAIN_NAV } from "@/lib/site-nav"

export function SiteFooter() {
  const { cfg, data } = useCatalog()
  const c = cfg.contact
  return (
    <footer className="mt-20 border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr_1.3fr] md:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <BrandMark name={cfg.name} />
            <span className="font-heading text-xl font-semibold tracking-tight">{cfg.name}</span>
          </div>
          <p className="t-small mt-3 max-w-xs text-muted-foreground">{cfg.tagline}. Kataloğumuzdaki ürünleri WhatsApp üzerinden kolayca sipariş edebilirsiniz.</p>
        </div>
        <FooterCol title="Kategoriler" links={data.categories.slice(0, 6).map((x) => ({ href: `/urunler?kategori=${x.slug}`, label: x.name }))} />
        <FooterCol title="Kurumsal" links={MAIN_NAV.slice(1)} />
        <div className="t-small space-y-2.5 text-muted-foreground">
          <p className="t-eyebrow mb-3 text-foreground">İletişim</p>
          <p className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0" />{c.address}</p>
          <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="flex gap-2 hover:text-foreground"><Phone className="size-4" />{c.phone}</a>
          <a href={`mailto:${c.email}`} className="flex gap-2 hover:text-foreground"><Mail className="size-4" />{c.email}</a>
          <p className="flex gap-2"><Clock className="size-4" />{c.hours}</p>
          <a href={`https://instagram.com/${c.instagram}`} target="_blank" rel="noopener" className="flex gap-2 hover:text-foreground"><AtSign className="size-4" />@{c.instagram}</a>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-4 py-5 t-micro text-muted-foreground md:px-8">
          <span>© {new Date().getFullYear()} {cfg.name} · {cfg.catalogTitle}</span>
          <span>Siparişler WhatsApp üzerinden alınır · Fiyatlara KDV dahildir</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="t-eyebrow mb-3">{title}</p>
      <ul className="t-small space-y-2.5 text-muted-foreground">
        {links.map((l) => (
          <li key={l.href}><Link href={l.href} className="hover:text-foreground">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  )
}
