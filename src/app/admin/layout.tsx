import type { Metadata } from "next"
import { AdminShell } from "@/components/admin/shell/admin-shell"

export const metadata: Metadata = { title: "Yönetim Paneli", robots: { index: false } }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
