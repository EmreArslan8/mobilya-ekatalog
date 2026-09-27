"use client"

import { usePathname } from "next/navigation"
import { ExternalLink } from "lucide-react"
import { LinkButton } from "@/components/common/link-button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ADMIN_NAV, isActive } from "@/lib/admin/nav"

export function AdminTopbar() {
  const path = usePathname()
  const current = [...ADMIN_NAV].reverse().find((n) => isActive(path, n.href, n.exact))
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b bg-background/90 px-3 backdrop-blur md:px-5">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mx-1 h-5" />
      <span className="text-sm font-medium">{current?.label ?? "Panel"}</span>
      <span className="ml-3 hidden rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800 sm:inline">Demo · veriler tarayıcıda saklanır</span>
      <LinkButton href="/" external variant="outline" size="sm" className="ml-auto">
        <ExternalLink /> Site
      </LinkButton>
    </header>
  )
}
