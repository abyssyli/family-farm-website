
// task4 project adjust
import { getCatalog } from "@/lib/catalog" [modified]
import { ProductsIndexClient } from "@/components/products/ProductsIndexClient"

export default async function ProductsPage() {
  const catalog = await getCatalog()
  return <ProductsIndexClient catalog={catalog} />
}  [edited]