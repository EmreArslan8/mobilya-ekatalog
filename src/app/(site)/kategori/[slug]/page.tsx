import { redirect } from "next/navigation"

/** Eski/paylaşılmış kategori linkleri tek tarama sayfasına yönlenir. */
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  redirect(`/urunler?kategori=${slug}`)
}
