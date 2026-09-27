"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { STOCK_DOT, STOCK_LABEL } from "@/lib/labels"
import type { StockStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

const ITEMS = (Object.keys(STOCK_LABEL) as StockStatus[]).map((v) => ({ value: v, label: STOCK_LABEL[v] }))

export function StockSelect({ value, onChange, className }: { value: StockStatus; onChange: (v: StockStatus) => void; className?: string }) {
  return (
    <Select items={ITEMS} value={value} onValueChange={(v) => v && onChange(v as StockStatus)}>
      <SelectTrigger size="sm" className={cn("min-w-36", className)} aria-label="Stok durumu">
        <span className={cn("size-2 shrink-0 rounded-full", STOCK_DOT[value])} />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ITEMS.map((i) => (
          <SelectItem key={i.value} value={i.value}>
            <span className={cn("size-2 rounded-full", STOCK_DOT[i.value])} /> {i.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
