import seedJson from "@/data/farm-catalog.seed.json"
import { CatalogSchema, type Catalog, type CatalogProduct } from "./catalog-schema"
import { createServerSupabaseClient } from "./supabase/server"
  [edited]
export function getSeedCatalog(): Catalog {
  return CatalogSchema.parse(seedJson)
}

export async function getCatalog(): Promise<Catalog> {
  const supabase = createServerSupabaseClient()
  if (!supabase) return getSeedCatalog()

  const seedCatalog = getSeedCatalog()

  const [categoriesRes, productsRes, journalRes, regionsRes] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order", { ascending: true }),
    supabase.from("products").select("*").eq("is_active", true),
    supabase.from("journal_posts").select("*").order("published_at", { ascending: false }),
    supabase.from("farm_regions").select("*")
  ])

  if (categoriesRes.error || productsRes.error || journalRes.error || regionsRes.error) {
    return seedCatalog
  }

  const normalizeWoodcraftImagePath = (slug: string, imagePath: string | null) => {
    const fallbackBySlug: Record<string, string> = {
      "cutting-board": "/photos/Wooden1.jpg",
      "farmhouse-sign": "/photos/Wooden2.jpg",
      "wall-shelf": "/photos/Wooden3.jpg",
      "handmade-stool": "/photos/Wooden.jpg"
    }

    return imagePath && imagePath.includes("/photos/Wooden")
      ? imagePath
      : fallbackBySlug[slug] ?? "/photos/Wooden1.jpg"
  }

  const normalizeWoodcraftName = (slug: string, name: string) => {
    return slug === "handmade-stool" ? "Thoma's Handmade Stool" : name
  }

  const normalizeEggsImagePath = (slug: string, imagePath: string | null) => {
    const fallbackBySlug: Record<string, string> = {
      "fresh-dozen-eggs": "/photos/egg.jpg",
      "weekly-egg-reserve": "/photos/egg2.jpg",
      "coop-visit": "/photos/chicken.jpg",
      "hen-spotlight": "/photos/chicken1.jpg",
      "coop-morning": "/photos/chicken2.jpg"
    }

    const fallback = fallbackBySlug[slug]
    if (!fallback) return imagePath
    return imagePath === fallback ? imagePath : fallback
  }

  const normalizeFarmRegionImagePath = (slug: string, imagePath: string | null) => {
    if (slug === "chicken-coop") {
      return imagePath &&
        (imagePath.includes("/photos/chicken") || imagePath.includes("/photos/egg"))
        ? imagePath
        : "/photos/chicken.jpg"
    }
    if (slug === "woodshop") {
      return imagePath && imagePath.includes("/photos/Wooden") ? imagePath : "/photos/Wooden1.jpg"
    }
    return imagePath
  }

  const dbCategories = categoriesRes.data.map((c) => ({
    slug: c.slug,
    name: c.name,
    sortOrder: c.sort_order
  }))

  const dbProducts = productsRes.data.map((p) => ({
    id: p.id,
    categorySlug: p.category_slug,
    slug: p.slug,
    name: p.category_slug === "woodcraft" ? normalizeWoodcraftName(p.slug, p.name) : p.name,
    description: p.description,
    imagePath:
      p.category_slug === "woodcraft"
        ? normalizeWoodcraftImagePath(p.slug, p.image_path)
        : p.category_slug === "eggs"
          ? normalizeEggsImagePath(p.slug, p.image_path)
        : p.image_path,
    priceHint: p.price_hint,
    externalUrl: p.external_url, [modified]
    isActive: p.is_active
  }))

  const journalPosts = journalRes.data.map((j) => ({
    id: j.id,
    slug: j.slug,
    title: j.title,
    excerpt: j.excerpt,
    body: j.body,
    publishedAt: j.published_at
  }))

  const dbFarmRegions = regionsRes.data.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    imagePath: normalizeFarmRegionImagePath(r.slug, r.image_path),
    ctaLabel: r.cta_label,
    ctaHref: r.cta_href,
    x: r.x,
    y: r.y
  }))

  const categoriesBySlug = new Map(seedCatalog.categories.map((c) => [c.slug, c] as const))
  for (const c of dbCategories) categoriesBySlug.set(c.slug, c)
  const categories = Array.from(categoriesBySlug.values()).sort(
    (a, b) => a.sortOrder - b.sortOrder
  )

  const productsById = new Map(seedCatalog.products.map((p) => [p.id, p] as const))
  for (const p of dbProducts) productsById.set(p.id, p)
  const products = Array.from(productsById.values()).map((p) =>
    p.categorySlug === "woodcraft"
      ? {
          ...p,
          name: normalizeWoodcraftName(p.slug, p.name),
          imagePath: normalizeWoodcraftImagePath(p.slug, p.imagePath ?? null)
        }
      : p.categorySlug === "eggs"
        ? { ...p, imagePath: normalizeEggsImagePath(p.slug, p.imagePath ?? null) }
      : p
  )

  const regionsBySlug = new Map(seedCatalog.farmRegions.map((r) => [r.slug, r] as const))
  for (const r of dbFarmRegions) regionsBySlug.set(r.slug, r)  [edited]
  const farmRegions = Array.from(regionsBySlug.values()).map((r) => ({
    ...r,
    imagePath: normalizeFarmRegionImagePath(r.slug, r.imagePath ?? null)
  }))

  return CatalogSchema.parse({ categories, products, journalPosts, farmRegions })
}

export function isExternalProduct(product: CatalogProduct) {
  return Boolean(product.externalUrl)
}