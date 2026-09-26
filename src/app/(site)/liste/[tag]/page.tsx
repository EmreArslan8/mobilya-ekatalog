import { TagListing } from "@/components/site/listing/listing-pages"

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  return <TagListing tag={tag} />
}
