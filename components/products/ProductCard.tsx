
// optimize code detail
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/Card"
import type { CatalogProduct } from "@/lib/catalog-schema"

export function ProductCard({
  product,
  href
}: {
  product: CatalogProduct
  href: string
}) {
  return (
    <Card className="overflow-hidden">
      {product.imagePath ? (
        <div className="relative h-48 w-full">
          <Image
            src={product.imagePath}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : null}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4"> [modified]
          <h3 className="text-base font-semibold">{product.name}</h3>
        </div>
        {product.description ? (
          <p className="mt-2 line-clamp-3 text-sm text-zinc-700">
            {product.description}
          </p>
        ) : null}
        {product.priceHint ? (
          <p className="mt-3 text-xs font-medium text-zinc-600">
            {product.priceHint}
          </p>
        ) : null}
        <div className="mt-5">
          <Link
            href={href}
            className="text-sm font-medium text-farm-800 hover:text-farm-900"
          >
            View details →
          </Link>
        </div>
      </div>
    </Card>
  )
}


/* daily modify record */