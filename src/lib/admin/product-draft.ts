import { uniqueSlug } from "../text"
import type { Business, Product } from "../types"

/** Yeni ürün için boş taslak. */
export function emptyProduct(d: Business): Product {
  const n = d.products.length + 1
  return {
    id: "",
    sku: `${d.config.shortName.slice(0, 2).toUpperCase()}-${String(1000 + n)}`,
    name: "",
    category: d.categories[0]?.slug ?? "",
    collection: d.collections[0]?.slug ?? "",
    price: null,
    oldPrice: null,
    images: [],
    colors: [{ name: "Standart", hex: "#D9C7AE" }],
    dimensions: { w: 0, d: 0, h: 0 },
    material: "",
    description: "",
    tags: ["yeni"],
    stock: "stokta",
    createdAt: new Date().toISOString(),
    published: true,
    ...(d.config.mode === "b2b" ? { moq: 1, leadTime: "15–20 iş günü", custom: [] } : {}),
  }
}

/** Kaydetmeden önce kimlik (slug) atar. */
export function finalizeProduct(p: Product, d: Business): Product {
  if (p.id) return p
  return { ...p, id: uniqueSlug(p.name, d.products.map((x) => x.id)), createdAt: new Date().toISOString() }
}

export function duplicateProduct(p: Product, d: Business): Product {
  const name = `${p.name} (kopya)`
  return { ...p, name, id: uniqueSlug(name, d.products.map((x) => x.id)), sku: `${p.sku}-K`, published: false, createdAt: new Date().toISOString() }
}

export type ProductErrors = Partial<Record<"name" | "sku" | "category" | "images" | "price" | "colors", string>>

export function validateProduct(p: Product, d: Business): ProductErrors {
  const e: ProductErrors = {}
  if (!p.name.trim()) e.name = "Ürün adı gerekli"
  if (!p.sku.trim()) e.sku = "Ürün kodu gerekli"
  else if (d.products.some((x) => x.sku === p.sku && x.id !== p.id)) e.sku = "Bu kod başka bir üründe kullanılıyor"
  if (!p.category) e.category = "Kategori seçin"
  if (!p.images.length) e.images = "En az bir görsel ekleyin"
  if (d.config.showPrices && (p.price == null || p.price <= 0)) e.price = "Fiyat girin"
  if (p.oldPrice != null && p.price != null && p.oldPrice <= p.price) e.price = "Eski fiyat, satış fiyatından yüksek olmalı"
  if (!p.colors.length || p.colors.some((c) => !c.name.trim())) e.colors = "Her varyantın bir adı olmalı"
  return e
}
