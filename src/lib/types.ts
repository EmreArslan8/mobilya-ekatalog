export type StockStatus = "stokta" | "az" | "siparis" | "uretim"
export type ProductTag = "yeni" | "cok-satan" | "indirim"
export type CatalogMode = "retail" | "b2b"
export type FontPreset = "luxe" | "editorial" | "grotesk" | "classic" | "modern"

export interface Color {
  name: string
  hex: string
}

export interface Product {
  id: string
  sku: string
  name: string
  category: string
  collection: string
  price: number | null
  oldPrice: number | null
  /** Stok görsel adı ("sofa-emerald") veya yüklenen görsel (data: URL) */
  images: string[]
  colors: Color[]
  dimensions: { w: number; d: number; h: number }
  material: string
  description: string
  tags: ProductTag[]
  stock: StockStatus
  createdAt: string
  published: boolean
  /** B2B alanları */
  moq?: number
  leadTime?: string
  custom?: string[]
}

export interface Category {
  slug: string
  name: string
  image: string
}

export interface Collection {
  slug: string
  name: string
  text: string
  image: string
}

export interface HeroSlide {
  image: string
  eyebrow: string
  title: string
  text: string
  cta: string
  /** Firma köküne göre yol: "koleksiyon/nordic" */
  link: string
}

export interface Theme {
  scheme: "light" | "dark"
  bg: string
  surface: string
  surface2: string
  ink: string
  muted: string
  line: string
  accent: string
  accentInk: string
  sale: string
  radius: number
  font: FontPreset
}

export interface SiteConfig {
  name: string
  shortName: string
  tagline: string
  catalogTitle: string
  mode: CatalogMode
  currency: string
  showPrices: boolean
  priceLabel: string
  theme: Theme
  hero: HeroSlide[]
  perks: string[]
  contact: {
    whatsapp: string
    phone: string
    email: string
    address: string
    hours: string
    instagram: string
  }
}

/** Sitenin (tek marka kurulumu) tüm katalog verisi. */
export interface Business {
  config: SiteConfig
  categories: Category[]
  collections: Collection[]
  products: Product[]
  updatedAt: string
}

export interface QuoteItem {
  id: string
  color: number
  qty: number
}
