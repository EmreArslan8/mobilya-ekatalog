import Link from "next/link"
import type { VariantProps } from "class-variance-authority"
import { Button, type buttonVariants } from "@/components/ui/button"

type Props = VariantProps<typeof buttonVariants> & {
  href: string
  external?: boolean
  className?: string
  children: React.ReactNode
  "aria-label"?: string
  onClick?: () => void
}

/** Buton görünümlü link. İç linkler next/link, dış linkler yeni sekmede açılır. */
export function LinkButton({ href, external, children, ...rest }: Props) {
  const el = external || /^(https?:|tel:|mailto:)/.test(href)
    ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" />
    : <Link href={href} />
  return (
    <Button nativeButton={false} render={el} {...rest}>
      {children}
    </Button>
  )
}
