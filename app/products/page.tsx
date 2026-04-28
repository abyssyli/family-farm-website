
// task4 project adjust
import { getCatalog } from "@/lib/catalog"
import { ProductsIndexClient } from "@/components/products/ProductsIndexClient"

export default async function ProductsPage() {
  const catalog = await getCatalog() [modified]
  return <ProductsIndexClient catalog={catalog} />
}  [edited]