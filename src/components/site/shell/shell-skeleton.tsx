import { Skeleton } from "@/components/ui/skeleton"

export function ShellSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 md:px-8">
      <div className="mb-4 flex items-center gap-3">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-5 w-28" />
      </div>
      <Skeleton className="aspect-[4/5] w-full rounded-3xl md:aspect-[16/7]" />
      <div className="mt-8 grid grid-cols-3 gap-3 md:grid-cols-6">
        {Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="aspect-square rounded-2xl" />)}
      </div>
    </div>
  )
}
