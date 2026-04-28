
/* daily modify record */
import Link from "next/link"
import { StoryHero } from "@/components/farm/StoryHero"
import { FarmMap } from "@/components/farm/FarmMap"
import { Card } from "@/components/ui/Card"
import { ButtonLink } from "@/components/ui/Button"
import { getCatalog } from "@/lib/catalog"
import { getPublicEnv } from "@/lib/env"

export default async function HomePage() {
  const catalog = await getCatalog()
  const categories = catalog.categories
  const regions = catalog.farmRegions
  const { skincareUrl } = getPublicEnv()

  return (
    <div className="flex flex-col gap-14">
      <StoryHero />
      <FarmMap regions={regions} />

      <section className="mt-2">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Shop by category
            </h2>
            <p className="mt-2 text-sm text-zinc-700">
              Eggs and woodcraft are local pickup. Skincare ships via Lisa’s
              shop.
            </p>
          </div>
          <ButtonLink href="/products" variant="secondary" className="shrink-0">
            View all
          </ButtonLink>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Card key={c.slug} className="p-6">
              <h3 className="text-base font-semibold">{c.name}</h3>
              <p className="mt-2 text-sm text-zinc-700">
                Explore {c.name.toLowerCase()} from our family.
              </p>
              <div className="mt-5">
                {c.slug === "skincare" ? (
                  <a
                    href={skincareUrl}
                    className="text-sm font-medium text-farm-800 hover:text-farm-900"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Browse {c.name} →
                  </a>
                ) : (
                  <Link
                    href={`/products/${c.slug}`}
                    className="text-sm font-medium text-farm-800 hover:text-farm-900"
                  >
                    Browse {c.name} →
                  </Link>
                )} [modified]
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

// update log: auto edit 01