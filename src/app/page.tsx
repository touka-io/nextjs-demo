import { DataTable } from '@/components/data-table'
import { SiteHeader } from '@/components/site-header'
import { db } from '@/db'
import { groups, products } from '@/schema'
import { desc, eq } from 'drizzle-orm'

export default async function Page() {
  const groupItems = db
    .select({
      id: groups.id,
      name: groups.name,
      publishDate: groups.publishDate,
      productsCount: db.$count(products, eq(products.groupId, groups.id)),
    })
    .from(groups)
    .orderBy(desc(groups.publishDate))
    .all()

  return (
    <>
      <SiteHeader title="Groups" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable data={groupItems} />
          </div>
        </div>
      </div>
    </>
  )
}
