"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/** Üst şerit: avantajları sırayla gösterir (mobilde tek satır). */
export function AnnouncementBar({ items }: { items: string[] }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (items.length < 2) return
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 3500)
    return () => clearInterval(t)
  }, [items.length])
  if (!items.length) return null
  return (
    <div className="relative h-8 overflow-hidden bg-foreground text-background">
      {items.map((txt, n) => (
        <p
          key={txt}
          className={cn(
            "absolute inset-0 grid place-items-center t-micro font-semibold tracking-wide transition-all duration-500",
            n === i ? "translate-y-0 opacity-100" : n === (i - 1 + items.length) % items.length ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"
          )}
        >
          {txt}
        </p>
      ))}
    </div>
  )
}
