import { CollectionListing } from "@/components/site/listing/listing-pages"

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <CollectionListing slug={slug} />
}
