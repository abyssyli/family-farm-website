
// optimize code detail
import Image from "next/image"  [edited]
import Link from "next/link"
import { ButtonLink } from "@/components/ui/Button"
import type { CatalogProduct } from "@/lib/catalog-schema"

export function ProductDetail({
  product,
  categoryName,
  primaryAction
}: {
  product: CatalogProduct
  categoryName: string
  primaryAction: React.ReactNode
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start"> [modified]
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        {product.imagePath ? (
          <Image
            src={product.imagePath}
            alt={product.name}
            width={1400}
            height={1000}
            className="h-[360px] w-full object-cover sm:h-[440px]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-[360px] items-center justify-center text-sm text-zinc-500 sm:h-[440px]">
            No image
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-farm-800">
          <Link href={`/products/${product.categorySlug}`} className="hover:underline">
            {categoryName}
          </Link>
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {product.name}
        </h1>
        {product.description ? (
          <p className="mt-4 max-w-prose text-base text-zinc-700">
            {product.description}
          </p>
        ) : null}
        {product.priceHint ? (
          <p className="mt-4 text-sm font-medium text-zinc-700">
            {product.priceHint}
          </p>
        ) : null}

        <div className="mt-7 flex flex-wrap gap-3">{primaryAction}</div>

        <div className="mt-8">
          <ButtonLink href="/products" variant="ghost">
            ← Back to products
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}