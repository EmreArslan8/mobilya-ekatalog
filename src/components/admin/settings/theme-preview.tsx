import { SmartImg } from "@/components/common/smart-img"
import { themeVars } from "@/lib/theme"
import type { SiteConfig } from "@/lib/types"

/** Taslak temayla küçük bir site önizlemesi (CSS değişkenleri sadece bu kutuya uygulanır). */
export function ThemePreview({ cfg }: { cfg: SiteConfig }) {
  const t = cfg.theme
  return (
    <div className="rounded-xl border bg-card p-3 shadow-xs">
      <p className="mb-2 px-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">Canlı önizleme</p>
      <div style={{ ...themeVars(t), background: t.bg, color: t.ink, fontFamily: "var(--app-font-body)" } as React.CSSProperties} className="overflow-hidden rounded-lg border">
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${t.line}` }}>
          <span style={{ fontFamily: "var(--app-font-display)" }} className="text-lg font-semibold tracking-wide uppercase">{cfg.shortName}</span>
          <span className="text-[10px] tracking-[0.14em] uppercase" style={{ color: t.muted }}>Ürünler · İletişim</span>
        </div>
        <div className="relative">
          <SmartImg src={cfg.hero[0]?.image ?? "scene-cream"} className="aspect-[16/10]" />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
            <p style={{ fontFamily: "var(--app-font-display)" }} className="text-2xl leading-none font-semibold">{cfg.hero[0]?.title ?? cfg.name}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 p-4">
          {["sofa-emerald", "armchair-yellow"].map((im, i) => (
            <div key={im}>
              <SmartImg src={im} className="aspect-[4/5]" imgClassName="" />
              <p className="mt-2 text-xs">{i ? "Oslo Berjer" : "Vera Kanepe"}</p>
              <p className="text-xs font-semibold">{cfg.showPrices ? (i ? "₺14.900" : "₺38.900") : cfg.priceLabel}</p>
            </div>
          ))}
        </div>
        <div className="px-4 pb-4">
          <div className="flex h-10 items-center justify-center text-[10px] font-semibold tracking-[0.16em] uppercase" style={{ background: t.accent, color: t.accentInk, borderRadius: t.radius }}>
            Sepete ekle
          </div>
        </div>
      </div>
    </div>
  )
}
