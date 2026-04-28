
/* daily modify record */
import Link from "next/link"
import { notFound } from "next/navigation"  [edited]
import { Card, CardBody } from "@/components/ui/Card"
import { ButtonLink } from "@/components/ui/Button"
import { getCatalog } from "@/lib/catalog"

export default async function JournalPostPage({
  params
}: {
  params: { slug: string }
}) {
  const catalog = await getCatalog()
  const post = catalog.journalPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-farm-800">
          <Link href="/journal" className="hover:underline">
            Farm Journal
          </Link>
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {post.title}
        </h1>
        {post.publishedAt ? (
          <p className="mt-2 text-sm text-zinc-600">
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        ) : null}
      </div>

      <Card>
        <CardBody>
          <div className="prose prose-zinc max-w-none">
            <p>{post.body}</p>
          </div>
        </CardBody>
      </Card>

      <div>
        <ButtonLink href="/journal" variant="ghost">
          ← Back to journal
        </ButtonLink>
      </div>
    </div>
  )
}

/* minor adjust */
