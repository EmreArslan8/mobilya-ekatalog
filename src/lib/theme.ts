import type { FontPreset, Theme } from "./types"

export const FONT_PRESETS: Record<FontPreset, { label: string; display: string; body: string; weight?: number; tracking?: string; bodyWeight?: number }> = {
  luxe: { label: "Lüks · Cormorant + Jost", display: "var(--ff-cormorant)", body: "var(--ff-jost)", weight: 600, tracking: "-0.015em", bodyWeight: 450 },
  editorial: { label: "Editoryal · Fraunces + Manrope", display: "var(--ff-fraunces)", body: "var(--ff-manrope)" },
  grotesk: { label: "Endüstriyel · Space Grotesk + Inter Tight", display: "var(--ff-space)", body: "var(--ff-inter)" },
  classic: { label: "Klasik · Playfair + DM Sans", display: "var(--ff-playfair)", body: "var(--ff-dmsans)" },
  modern: { label: "Sade · Inter Tight", display: "var(--ff-inter)", body: "var(--ff-inter)" },
}

export type Palette = Omit<Theme, "font" | "radius">

export const THEME_PRESETS: { name: string; theme: Palette }[] = [
  { name: "Fildişi", theme: { scheme: "light", bg: "#F8F5F0", surface: "#FFFFFF", surface2: "#EFEAE3", ink: "#171513", muted: "#7A7268", line: "#E2DBD0", accent: "#171513", accentInk: "#F8F5F0", sale: "#8E3B26" } },
  { name: "Orman", theme: { scheme: "light", bg: "#F5F0E8", surface: "#FFFFFF", surface2: "#EDE5DA", ink: "#1C1915", muted: "#776C60", line: "#E3D9CC", accent: "#2E5A4C", accentInk: "#FFFFFF", sale: "#B6532F" } },
  { name: "Pirinç Gece", theme: { scheme: "dark", bg: "#0F1012", surface: "#18191C", surface2: "#222429", ink: "#F1EDE6", muted: "#9B968D", line: "#2A2C31", accent: "#D6A64F", accentInk: "#15120C", sale: "#E07A55" } },
  { name: "Kiremit", theme: { scheme: "light", bg: "#FBF6F1", surface: "#FFFFFF", surface2: "#F3E7DC", ink: "#2A1A12", muted: "#8A6F60", line: "#EBDCCF", accent: "#B6532F", accentInk: "#FFFFFF", sale: "#2E5A4C" } },
  { name: "Lacivert", theme: { scheme: "light", bg: "#F4F5F7", surface: "#FFFFFF", surface2: "#E8EBF0", ink: "#131A2A", muted: "#667085", line: "#DDE1E8", accent: "#1F2A44", accentInk: "#FFFFFF", sale: "#C2410C" } },
  { name: "Kömür", theme: { scheme: "dark", bg: "#121212", surface: "#1C1C1C", surface2: "#262626", ink: "#F5F5F4", muted: "#A3A3A3", line: "#2E2E2E", accent: "#E7E5E4", accentInk: "#121212", sale: "#F97316" } },
]

/** Tema → shadcn CSS değişkenleri. <html>'e uygulanır ki portal'lar (drawer, dialog) da temayı alsın. */
export function themeVars(t: Theme): Record<string, string> {
  const f = FONT_PRESETS[t.font] ?? FONT_PRESETS.editorial
  return {
    "--background": t.bg,
    "--foreground": t.ink,
    "--card": t.surface,
    "--card-foreground": t.ink,
    "--popover": t.surface,
    "--popover-foreground": t.ink,
    "--primary": t.accent,
    "--primary-foreground": t.accentInk,
    "--secondary": t.surface2,
    "--secondary-foreground": t.ink,
    "--muted": t.surface2,
    "--muted-foreground": t.muted,
    "--accent": t.surface2,
    "--accent-foreground": t.ink,
    "--border": t.line,
    "--input": t.line,
    "--ring": t.accent,
    "--sale": t.sale,
    "--radius": `${t.radius}px`,
    "--app-font-body": f.body,
    "--app-font-display": f.display,
    "--heading-weight": String(f.weight ?? 600),
    "--heading-tracking": f.tracking ?? "-0.03em",
    "--body-weight": String(f.bodyWeight ?? 400),
  }
}
