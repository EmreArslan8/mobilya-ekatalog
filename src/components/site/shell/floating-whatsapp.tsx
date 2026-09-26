"use client"

import { usePathname } from "next/navigation"
import { WhatsAppIcon } from "@/components/common/whatsapp-icon"
import { useCatalog } from "@/lib/catalog-context"
import { waLink } from "@/lib/whatsapp"

/** Her sayfada erişilebilir WhatsApp kısayolu (ürün detayı ve sepette kendi butonları var). */
export function FloatingWhatsApp() {
  const { cfg } = useCatalog()
  const path = usePathname()
  if (path.startsWith("/urun/") || path.startsWith("/sepet")) return null
  return (
    <a
      href={waLink(cfg.contact.whatsapp, `Merhaba ${cfg.name}, bilgi almak istiyorum.`)}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp ile yazın"
      className="fixed right-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-30 grid size-13 place-items-center rounded-full bg-[#1FAF5A] text-white shadow-xl shadow-black/15 transition hover:scale-105 active:scale-95 lg:bottom-6"
    >
      <WhatsAppIcon className="relative size-7" />
    </a>
  )
}
