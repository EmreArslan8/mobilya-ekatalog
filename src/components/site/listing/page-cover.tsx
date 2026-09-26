import { SmartImg } from "@/components/common/smart-img"

export function PageCover({ image, eyebrow, title, text }: { image: string; eyebrow?: string; title: string; text?: string }) {
  return (
    <section className="relative h-[42dvh] min-h-[300px] max-h-[520px] text-white">
      <SmartImg src={image} size="lg" priority className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
      <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-5 pb-8 md:px-8 md:pb-12">
        {eyebrow && <span className="t-eyebrow text-white/75">{eyebrow}</span>}
        <h1 className="t-display mt-3">{title}</h1>
        {text && <p className="t-body mt-3 max-w-lg text-white/85">{text}</p>}
      </div>
    </section>
  )
}
