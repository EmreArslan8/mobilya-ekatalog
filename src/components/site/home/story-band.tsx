import { SmartImg } from "@/components/common/smart-img"
import { LinkButton } from "@/components/common/link-button"

interface Props {
  b2b: boolean
}

export function StoryBand({ b2b }: Props) {
  const stats = b2b
    ? [["12.000 m²", "üretim alanı"], ["380+", "bayi"], ["38 yıl", "tecrübe"]]
    : [["300+", "ürün"], ["12", "taksit"], ["24 ay", "garanti"]]
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-24 md:grid-cols-2 md:gap-16 md:px-8">
      <div className="relative">
        <SmartImg src={b2b ? "scene-office" : "scene-reading"} size="lg" className="aspect-[4/5] rounded-lg md:aspect-[5/6]" />
        <SmartImg src={b2b ? "scene-loft" : "scene-gallery"} className="absolute -right-2 -bottom-6 aspect-square w-2/5 rounded-lg border-8 border-background md:-right-10" />
      </div>
      <div className="pt-4">
        <span className="t-eyebrow text-muted-foreground">{b2b ? "Üretici" : "Showroom"}</span>
        <h2 className="t-h1 mt-2 text-balance">{b2b ? "Kendi fabrikamızda, kendi ustalarımızla" : "Görün, dokunun, oturun"}</h2>
        <p className="t-body mt-4 text-muted-foreground">
          {b2b
            ? "Masif ahşap iskeletten döşemeye kadar tüm süreç tek çatı altında. Bayilerimize özel ölçü, kumaş ve termin esnekliği sunuyoruz."
            : "Kataloğumuzdaki ürünleri showroom’umuzda deneyebilir, kumaş ve renk kartelalarını yerinde inceleyebilirsiniz. Ücretsiz iç mimar desteği için randevu alın."}
        </p>
        <dl className="mt-8 grid grid-cols-3 gap-4 border-y py-6">
          {stats.map(([v, l]) => (
            <div key={l}>
              <dt className="t-h1">{v}</dt>
              <dd className="t-micro mt-1 text-muted-foreground">{l}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-2">
          <LinkButton size="cta" href="/hakkimizda">Hikayemiz</LinkButton>
          <LinkButton variant="outline" size="cta" href="/iletisim">{b2b ? "Bayimiz olun" : "Showroom’a gelin"}</LinkButton>
        </div>
      </div>
    </section>
  )
}
