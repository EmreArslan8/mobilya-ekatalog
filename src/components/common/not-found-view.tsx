import { SearchX } from "lucide-react"
import { EmptyState } from "./empty-state"

export function NotFoundView({ text = "Aradığınız sayfa kaldırılmış olabilir." }: { text?: string }) {
  return <EmptyState icon={SearchX} title="Bulunamadı" text={text} action={{ label: "Ana sayfaya dön", href: "/" }} />
}
