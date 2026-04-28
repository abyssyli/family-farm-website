import { getCatalog } from "@/lib/catalog"  [edited]
import { PreferencesForm } from "@/components/preferences/PreferencesForm"
import { Card, CardBody, CardHeader } from "@/components/ui/Card"
import { UserMenu } from "@/components/auth/UserMenu"

export default async function AccountPage() {
  const catalog = await getCatalog()
  const categories = catalog.categories.map((c) => ({ slug: c.slug, name: c.name }))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl"> [modified]
          Account
        </h1>
        <p className="mt-2 text-sm text-zinc-700">
          Sign in to save your preferences and track inquiries.
        </p>
      </div>

      <Card>
        <CardHeader title="Sign in" subtitle="Use email magic link." />
        <CardBody>
          <UserMenu />
        </CardBody>
      </Card>

      <PreferencesForm categories={categories} />
    </div>
  )
}


// task4 project adjust