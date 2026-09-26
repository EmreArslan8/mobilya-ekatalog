"use client"

import { useEffect } from "react"
import { themeVars } from "@/lib/theme"
import type { Theme } from "@/lib/types"

/** Marka temasını <html>'e uygular (portal'lar dahil her yer temayı alır); ayrılınca temizler. */
export function ThemeApplier({ theme }: { theme: Theme }) {
  useEffect(() => {
    const root = document.documentElement
    const vars = themeVars(theme)
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v))
    root.classList.toggle("dark", theme.scheme === "dark")
    root.style.colorScheme = theme.scheme
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme.bg)
    return () => {
      Object.keys(vars).forEach((k) => root.style.removeProperty(k))
      root.classList.remove("dark")
      root.style.colorScheme = ""
    }
  }, [theme])
  return null
}
