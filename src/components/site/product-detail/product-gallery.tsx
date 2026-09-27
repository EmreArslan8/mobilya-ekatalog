"use client"

import { useEffect, useState } from "react"
import { Expand, X } from "lucide-react"
import { SmartImg } from "@/components/common/smart-img"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { imgSrc } from "@/lib/images"
import { cn } from "@/lib/utils"

/** Mobilde kaydırmalı tam genişlik, masaüstünde küçük resimli galeri + tam ekran görüntüleme. */
export function ProductGallery({ images, name, overlay }: { images: string[]; name: string; overlay?: React.ReactNode }) {
  const [api, setApi] = useState<CarouselApi>()
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState<string | null>(null)

  useEffect(() => {
    if (!api) return
    const on = () => setIndex(api.selectedScrollSnap())
    api.on("select", on)
    return () => { api.off("select", on) }
  }, [api])

  return (
    <div className="lg:grid lg:grid-cols-[88px_1fr] lg:gap-4">
      <div className="hidden flex-col gap-3 lg:flex">
        {images.map((im, i) => (
          <button key={i} onClick={() => api?.scrollTo(i)} aria-label={`Görsel ${i + 1}`} className={cn("overflow-hidden rounded-md ring-1 ring-transparent ring-offset-2 ring-offset-background transition", i === index ? "ring-foreground" : "opacity-55 hover:opacity-100")}>
            <SmartImg src={im} className="aspect-[4/5]" />
          </button>
        ))}
      </div>
      <div className="relative max-lg:-mx-5">
        <Carousel setApi={setApi} className="overflow-hidden lg:rounded-lg">
          <CarouselContent className="ml-0">
            {images.map((im, i) => (
              <CarouselItem key={i} className="pl-0">
                <button onClick={() => setZoom(im)} className="block w-full cursor-zoom-in" aria-label="Büyüt">
                  <SmartImg src={im} size="lg" priority={i === 0} alt={name} className="aspect-[4/5] lg:aspect-[5/6]" />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {overlay}
        <span className="pointer-events-none absolute right-4 bottom-4 hidden size-10 place-items-center rounded-md bg-white/85 text-neutral-900 backdrop-blur lg:grid">
          <Expand className="size-4" />
        </span>
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5 lg:hidden">
            {images.map((_, i) => <span key={i} className={cn("h-0.5 rounded-full bg-white transition-all", i === index ? "w-8" : "w-4 opacity-50")} />)}
          </div>
        )}
      </div>

      <Dialog open={!!zoom} onOpenChange={(o) => !o && setZoom(null)}>
        <DialogContent showCloseButton={false} className="max-w-[min(96vw,1200px)] border-0 bg-transparent p-0 shadow-none ring-0 sm:max-w-[min(96vw,1200px)]">
          <DialogTitle className="sr-only">{name}</DialogTitle>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {zoom && <img src={imgSrc(zoom, "lg")} alt={name} className="max-h-[88dvh] w-full rounded-md object-contain" />}
          <button onClick={() => setZoom(null)} className="absolute top-3 right-3 grid size-10 place-items-center rounded-md bg-white/90 text-neutral-900" aria-label="Kapat">
            <X className="size-5" />
          </button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
