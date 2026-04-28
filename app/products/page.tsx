
// task4 project adjust [modified]
import { getCatalog } from "@/lib/catalog"
import { ProductsIndexClient } from "@/components/products/ProductsIndexClient"

export default async function ProductsPage() {
  const catalog = await getCatalog()
  return <ProductsIndexClient catalog={catalog} />
}  [edited]