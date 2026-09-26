import { Container } from "./container"

/** Kapak görseli olmayan sayfaların başlığı. */
export function PageHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <Container className="pt-10 pb-8 md:pt-16 md:pb-12">
      {eyebrow && <span className="t-eyebrow text-muted-foreground">{eyebrow}</span>}
      <h1 className="t-display mt-3">{title}</h1>
      {text && <p className="t-body mt-4 max-w-xl text-muted-foreground">{text}</p>}
    </Container>
  )
}
