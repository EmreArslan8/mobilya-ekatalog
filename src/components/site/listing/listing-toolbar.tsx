"use client"

import { LayoutGrid, Rows3 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SORT_OPTIONS, type SortKey, type ViewMode } from "@/lib/listing"
import { cn } from "@/lib/utils"

interface Props {
  count: number
  sort: SortKey
  onSort: (s: SortKey) => void
  view: ViewMode
  onView: (v: ViewMode) => void
  showPrices: boolean
}

export function ListingToolbar({ count, sort, onSort, view, onView, showPrices }: Props) {
  const options = SORT_OPTIONS.filter((o) => showPrices || !o.needsPrice)
  return (
    <div className="flex items-center gap-2">
      <span className="mr-auto t-small text-muted-foreground tabular-nums">{count} ürün</span>
      <Select items={options} value={sort} onValueChange={(v) => v && onSort(v as SortKey)}>
        <SelectTrigger className="h-10 min-w-40 rounded-md bg-card t-small" aria-label="Sırala">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
        </SelectContent>
      </Select>
      <div className="flex rounded-md border bg-card p-0.5">
        {([["grid", LayoutGrid], ["list", Rows3]] as const).map(([v, Icon]) => (
          <button key={v} onClick={() => onView(v)} aria-label={v === "grid" ? "Izgara" : "Liste"} className={cn("grid size-9 place-items-center rounded-sm transition", view === v ? "bg-foreground text-background" : "text-muted-foreground")}>
            <Icon className="size-4" />
          </button>
        ))}
      </div>
    </div>
  )
}
