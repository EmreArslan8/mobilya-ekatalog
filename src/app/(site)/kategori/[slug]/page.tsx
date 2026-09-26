import { CategoryListing } from "@/components/site/listing/listing-pages"

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <CategoryListing slug={slug} />
}
