"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Category } from "@/lib/types"

export interface ProductFilterState { q: string; category: string; status: string }

const STATUS = [
  { value: "all", label: "Tüm durumlar" },
  { value: "published", label: "Yayında" },
  { value: "draft", label: "Gizli / taslak" },
  { value: "az", label: "Stok azalan" },
  { value: "sale", label: "İndirimli" },
]

export function ProductsFilters({ value, onChange, categories }: { value: ProductFilterState; onChange: (v: ProductFilterState) => void; categories: Category[] }) {
  const cats = [{ value: "all", label: "Tüm kategoriler" }, ...categories.map((c) => ({ value: c.slug, label: c.name }))]
  return (
    <div className="grid grid-cols-2 gap-2 sm:flex">
      <div className="relative col-span-2 flex-1">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={value.q} onChange={(e) => onChange({ ...value, q: e.target.value })} placeholder="Ürün adı veya kodu ara" className="h-9 bg-card pl-9" />
      </div>
      <Select items={cats} value={value.category} onValueChange={(v) => onChange({ ...value, category: String(v) })}>
        <SelectTrigger className="h-9 w-full bg-card sm:w-auto sm:min-w-44"><SelectValue /></SelectTrigger>
        <SelectContent>{cats.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
      </Select>
      <Select items={STATUS} value={value.status} onValueChange={(v) => onChange({ ...value, status: String(v) })}>
        <SelectTrigger className="h-9 w-full bg-card sm:w-auto sm:min-w-40"><SelectValue /></SelectTrigger>
        <SelectContent>{STATUS.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  )
}
