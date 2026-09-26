"use client"

import { useState } from "react"
import { imgSrc } from "@/lib/images"
import { cn } from "@/lib/utils"

interface Props {
  src: string
  alt?: string
  size?: "sm" | "lg"
  className?: string
  imgClassName?: string
  priority?: boolean
}

/** Skeleton arka planlı, yüklenince yumuşakça beliren görsel. Stok ad veya data URL kabul eder. */
export function SmartImg({ src, alt = "", size = "sm", className, imgClassName, priority }: Props) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={cn("relative overflow-hidden bg-muted", !loaded && "animate-pulse", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc(src, size)}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        ref={(el) => { if (el?.complete && el.naturalWidth) setLoaded(true) }}
        onLoad={() => setLoaded(true)}
        className={cn(
          "size-full object-cover transition-[opacity,transform] duration-700 ease-out",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName
        )}
      />
    </div>
  )
}
