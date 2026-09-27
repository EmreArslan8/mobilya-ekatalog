import { ProductForm } from "@/components/admin/product-form/product-form"

/** /admin/urunler/yeni → yeni ürün, /admin/urunler/<id> → düzenle */
export default async function AdminProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProductForm key={id} id={id} />
}
