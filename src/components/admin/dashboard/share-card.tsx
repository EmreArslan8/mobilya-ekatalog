"use client"

import { useEffect, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Copy, Download } from "lucide-react"
import { toast } from "sonner"
import { SectionCard } from "@/components/admin/common/section-card"
import { WhatsAppIcon } from "@/components/common/whatsapp-icon"
import { Button } from "@/components/ui/button"

/** Katalog linki + QR: showroom'a basılabilir, müşteriye WhatsApp'tan gönderilebilir. */
export function ShareCard({ name }: { name: string }) {
  const [url, setUrl] = useState("")
  useEffect(() => setUrl(window.location.origin), [])

  const downloadQR = () => {
    const svg = document.getElementById("catalog-qr")
    if (!svg) return
    const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: "image/svg+xml" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = "katalog-qr.svg"
    a.click()
  }

  return (
    <SectionCard title="Kataloğu paylaş" text="QR kodu showroom’a, fuara veya kartvizite basın.">
      <div className="flex items-center gap-4">
        <div className="rounded-lg border bg-white p-2">{url && <QRCodeSVG id="catalog-qr" value={url} size={104} marginSize={0} />}</div>
        <div className="grid min-w-0 flex-1 gap-2">
          <code className="truncate rounded-md bg-muted px-2 py-1.5 text-xs">{url}</code>
          <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(url).then(() => toast("Link kopyalandı"))}><Copy /> Linki kopyala</Button>
          <Button variant="outline" size="sm" onClick={downloadQR}><Download /> QR indir</Button>
          <Button size="sm" className="bg-[#1FAF5A] text-white hover:bg-[#1FAF5A]/90" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${name} kataloğunu inceleyin: ${url}`)}`, "_blank")}>
            <WhatsAppIcon className="size-4" /> WhatsApp’ta paylaş
          </Button>
        </div>
      </div>
    </SectionCard>
  )
}
