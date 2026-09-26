"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import { SmartImg } from "@/components/common/smart-img"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import type { HeroSlide } from "@/lib/types"
import { cn } from "@/lib/utils"

const DELAY = 6000

/** Tam genişlik (edge-to-edge) editoryal hero. */
export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!api) return
    const on = () => setIndex(api.selectedScrollSnap())
    api.on("select", on)
    return () => { api.off("select", on) }
  }, [api])

  return (
    <section className="relative">
      <Carousel setApi={setApi} opts={{ loop: true }} plugins={[Autoplay({ delay: DELAY, stopOnInteraction: true })]}>
        <CarouselContent className="ml-0">
          {slides.map((s, i) => (
            <CarouselItem key={i} className="relative pl-0">
              <div className="relative aspect-[4/5] max-h-[70dvh] sm:aspect-[16/10] lg:aspect-auto lg:h-[calc(100dvh-6.5rem)] lg:max-h-[860px] lg:min-h-[560px] w-full">
                <SmartImg src={s.image} size="lg" priority={i === 0} className="absolute inset-0" imgClassName={cn("scale-[1.06] transition-transform duration-[7s] ease-out", index === i && "scale-100")} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10 lg:bg-gradient-to-r lg:from-black/60 lg:via-black/15 lg:to-transparent" />
                <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-5 pb-14 text-white md:px-8 lg:justify-center lg:pb-0">
                  <div className={cn("max-w-xl transition-all delay-150 duration-1000", index === i ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
                    <span className="t-eyebrow text-white/75">{s.eyebrow}</span>
                    <h1 className="t-display mt-4 text-balance">{s.title}</h1>
                    <p className="t-body mt-4 max-w-md text-white/80 max-sm:hidden">{s.text}</p>
                    <Link href={`/${s.link}`} className="btn-cta mt-6 inline-flex sm:mt-8 items-center bg-white text-neutral-950 transition hover:bg-white/85">
                      {s.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {slides.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 lg:bottom-8">
          <div className="pointer-events-auto mx-auto flex max-w-7xl items-center gap-4 px-5 text-white md:px-8">
            <span className="t-micro tabular-nums tracking-[0.2em]">{String(index + 1).padStart(2, "0")}</span>
            <div className="flex flex-1 gap-2 md:max-w-xs">
              {slides.map((_, i) => (
                <button key={i} onClick={() => api?.scrollTo(i)} aria-label={`Slayt ${i + 1}`} className="flex-1 py-3">
                  <span className="relative block h-0.5 overflow-hidden bg-white/35">
                    {i === index && <span key={index} className="absolute inset-0 origin-left bg-white" style={{ animation: `hero-progress ${DELAY}ms linear forwards` }} />}
                  </span>
                </button>
              ))}
            </div>
            <span className="t-micro tabular-nums tracking-[0.2em] text-white/60">{String(slides.length).padStart(2, "0")}</span>
          </div>
        </div>
      )}
    </section>
  )
}
