"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useHydrated } from "@/lib/store/hydrate"
import { AdminSidebar } from "./admin-sidebar"
import { AdminTopbar } from "./admin-topbar"

/** Admin: nötr shadcn teması (marka teması uygulanmaz), sidebar + üst bar. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const ready = useHydrated()
  if (!ready) {
    return (
      <div className="flex min-h-dvh">
        <Skeleton className="hidden w-64 rounded-none md:block" />
        <div className="flex-1 space-y-4 p-6"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>
      </div>
    )
  }
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset className="min-w-0 bg-muted/30">
          <AdminTopbar />
          <div className="mx-auto w-full max-w-6xl p-4 md:p-6 lg:p-8">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
