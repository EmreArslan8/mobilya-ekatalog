import { Container } from "./container"

/**
 * Sayfa başlığı. "compact": işlevsel sayfalar (sepet, favoriler, ürünler) — içerik hemen başlasın.
 * "hero": editoryal sayfalar (iletişim vb.)
 */
export function PageHeading({ eyebrow, title, text, count, variant = "compact" }: { eyebrow?: string; title: string; text?: string; count?: string; variant?: "compact" | "hero" }) {
  if (variant === "compact") {
    return (
      <Container className="pt-6 pb-5 md:pt-10 md:pb-7">
        <div className="flex items-baseline gap-3">
          <h1 className="t-h1">{title}</h1>
          {count && <span className="t-small text-muted-foreground tabular-nums">{count}</span>}
        </div>
        {text && <p className="t-small mt-2 max-w-xl text-muted-foreground">{text}</p>}
      </Container>
    )
  }
  return (
    <Container className="pt-10 pb-8 md:pt-16 md:pb-12">
      {eyebrow && <span className="t-eyebrow text-muted-foreground">{eyebrow}</span>}
      <h1 className="t-display mt-3">{title}</h1>
      {text && <p className="t-body mt-4 max-w-xl text-muted-foreground">{text}</p>}
    </Container>
  )
}
