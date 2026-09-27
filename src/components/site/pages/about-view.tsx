"use client"

import { Hammer, Leaf, Ruler, Sofa, type LucideIcon } from "lucide-react"
import { LinkButton } from "@/components/common/link-button"
import { SmartImg } from "@/components/common/smart-img"
import { useCatalog } from "@/lib/catalog-context"
import { PageCover } from "../listing/page-cover"

const VALUES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Hammer, title: "Ustalık", text: "Her parça deneyimli ustalarımızın elinden, tek tek kontrol edilerek çıkar." },
  { icon: Leaf, title: "Doğal malzeme", text: "Sertifikalı masif ahşap, doğal lifler ve su bazlı cilalar kullanırız." },
  { icon: Ruler, title: "Size özel", text: "Ölçü, kumaş ve renk seçenekleriyle yaşam alanınıza uyarlarız." },
  { icon: Sofa, title: "Uzun ömür", text: "Yıllarca kullanılacak, zamansız tasarımlar üretiriz." },
]

export function AboutView() {
  const { cfg, isB2B } = useCatalog()
  return (
    <>
      <PageCover image={isB2B ? "scene-loft" : "scene-panorama"} eyebrow="Hakkımızda" title={cfg.name} text={cfg.tagline} />
      <section className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 px-5 pt-16 md:px-8 md:pt-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <span className="t-eyebrow text-muted-foreground">Hikayemiz</span>
          <h2 className="t-h1 mt-3 text-balance">{isB2B ? "Üç kuşaktır mobilya üretiyoruz." : "Evleri, içinde yaşanan hikâyelerle birlikte düşünüyoruz."}</h2>
        </div>
        <div className="t-body space-y-4 text-muted-foreground">
          <p>{isB2B
            ? "1987’de küçük bir atölyede başlayan yolculuğumuz bugün 12.000 m² kapalı alanda, 140 kişilik ekibimizle devam ediyor. Türkiye genelinde 380’den fazla bayiye ve yurt dışında 14 ülkeye üretim yapıyoruz."
            : "İskandinav tasarımın sadeliğini Anadolu’nun zanaat geleneğiyle buluşturuyoruz. Kataloğumuzdaki her ürün; konfor, dayanıklılık ve zamansız estetik ilkeleriyle seçilir."}</p>
          <p>{isB2B
            ? "Bayilerimize dijital katalog, hızlı teklif ve esnek üretim planlamasıyla destek oluyoruz."
            : "Showroom’umuzda tüm ürünleri deneyebilir, iç mimarlarımızdan ücretsiz destek alabilirsiniz."}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 pt-14 md:grid-cols-3 md:gap-4 md:px-8">
        <SmartImg src="scene-gallery" size="lg" className="col-span-2 aspect-[16/10] rounded-lg md:col-span-2 md:row-span-2 md:aspect-auto" />
        <SmartImg src="scene-cream" className="aspect-[4/5] rounded-lg" />
        <SmartImg src="scene-orange" className="aspect-[4/5] rounded-lg" />
      </section>
      <section className="mx-auto max-w-7xl px-5 pt-20 md:px-8">
        <span className="t-eyebrow text-muted-foreground">Değerlerimiz</span>
        <ul className="mt-6 grid border-t sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <li key={v.title} className="border-b py-8 sm:odd:pr-8 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
              <v.icon className="size-6 text-muted-foreground" strokeWidth={1.3} />
              <h3 className="t-h3 mt-5">{v.title}</h3>
              <p className="t-small mt-2 text-muted-foreground">{v.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
          <LinkButton size="cta" href="/urunler">Kataloğu incele</LinkButton>
          <LinkButton size="cta" variant="outline" className="bg-transparent" href="/iletisim">İletişime geçin</LinkButton>
        </div>
      </section>
    </>
  )
}
