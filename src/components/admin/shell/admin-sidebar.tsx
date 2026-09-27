"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ExternalLink } from "lucide-react"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar"
import { ADMIN_NAV, isActive } from "@/lib/admin/nav"
import { useDB } from "@/lib/store/db"

export function AdminSidebar() {
  const path = usePathname()
  const data = useDB((s) => s.data)
  const { setOpenMobile } = useSidebar()
  const counts: Record<string, number> = {
    "/admin/urunler": data.products.length,
    "/admin/kategoriler": data.categories.length,
    "/admin/koleksiyonlar": data.collections.length,
  }
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2.5 px-1 py-1.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-foreground text-sm font-bold text-background">{data.config.name[0]}</span>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold">{data.config.name}</p>
            <p className="truncate text-xs text-muted-foreground">Yönetim paneli</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Katalog</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ADMIN_NAV.map((n) => (
                <SidebarMenuItem key={n.href}>
                  <SidebarMenuButton isActive={isActive(path, n.href, n.exact)} tooltip={n.label} render={<Link href={n.href} onClick={() => setOpenMobile(false)} />}>
                    <n.icon />
                    <span>{n.label}</span>
                  </SidebarMenuButton>
                  {counts[n.href] != null && <SidebarMenuBadge>{counts[n.href]}</SidebarMenuBadge>}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Siteyi görüntüle" render={<a href="/" target="_blank" rel="noopener" />}>
              <ExternalLink />
              <span>Siteyi görüntüle</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
