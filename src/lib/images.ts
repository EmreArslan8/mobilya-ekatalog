export const STOCK_IMAGES = [
  "sofa-emerald", "sofa-leather", "sofa-terracotta", "sofa-yellow", "sofa-grey-tufted", "sofa-blue", "sofa-cream",
  "armchair-yellow", "armchair-mustard-set", "armchair-white", "chair-grey-velvet", "chair-black-shell", "chair-dark",
  "chair-wood-classic", "chair-yellow-pair", "barstool-black", "stool-white",
  "bed-channel", "bed-tufted", "bed-grey", "bed-navy", "bed-green", "nightstand-oak",
  "dining-emerald", "dining-walnut", "dining-round", "wallunit-oak", "cabinet-tall", "console-oak",
  "desk-walnut", "desk-white",
  "scene-cream", "scene-orange", "scene-panorama", "scene-loft", "scene-sectional", "scene-gallery",
  "scene-reading", "scene-bright", "scene-boho", "scene-kitchen", "scene-office",
] as const

/** Görsel referansı → URL. Stok görsel adı ya da yüklenmiş data: URL olabilir. */
export function imgSrc(ref: string | undefined, size: "sm" | "lg" = "lg") {
  if (!ref) return ""
  if (/^(data:|https?:|\/)/.test(ref)) return ref
  return size === "sm" ? `/img/sm/${ref}.jpg` : `/img/${ref}.jpg`
}

/** Yüklenen dosyayı tarayıcıda küçültüp JPEG data URL'e çevirir (localStorage kotası için). */
export async function resizeImage(file: File, max = 1000, quality = 0.78): Promise<string> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL("image/jpeg", quality)
}
