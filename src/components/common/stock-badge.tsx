import { STOCK_DOT, STOCK_LABEL } from "@/lib/labels"
import type { StockStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

export function StockBadge({ status, className }: { status: StockStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-semibold", className)}>
      <span className={cn("size-2 rounded-full", STOCK_DOT[status])} />
      {STOCK_LABEL[status]}
    </span>
  )
}
