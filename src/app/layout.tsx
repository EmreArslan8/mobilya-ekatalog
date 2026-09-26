import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, DM_Sans, Jost, Fraunces, Inter_Tight, Manrope, Playfair_Display, Space_Grotesk } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const cormorant = Cormorant_Garamond({ subsets: ["latin", "latin-ext"], variable: "--ff-cormorant", weight: ["400", "500", "600"] })
const jost = Jost({ subsets: ["latin", "latin-ext"], variable: "--ff-jost" })
// Firma temalarının seçebildiği font havuzu (lib/theme.ts → FONT_PRESETS)
const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], variable: "--ff-fraunces", axes: ["opsz"] })
const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--ff-manrope" })
const space = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--ff-space" })
const inter = Inter_Tight({ subsets: ["latin", "latin-ext"], variable: "--ff-inter" })
const playfair = Playfair_Display({ subsets: ["latin", "latin-ext"], variable: "--ff-playfair" })
const dmsans = DM_Sans({ subsets: ["latin", "latin-ext"], variable: "--ff-dmsans" })

export const metadata: Metadata = {
  title: "Mobilya E-Katalog",
  description: "Mobilya mağazaları ve imalatçılar için mobil odaklı e-katalog altyapısı",
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [cormorant, jost, fraunces, manrope, space, inter, playfair, dmsans].map((f) => f.variable).join(" ")
  return (
    <html lang="tr" className={`${fonts} antialiased`} suppressHydrationWarning>
      <body className="min-h-dvh">
        {children}
        <Toaster position="top-center" richColors={false} />
      </body>
    </html>
  )
}
