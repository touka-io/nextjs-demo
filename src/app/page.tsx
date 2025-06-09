import { db } from 'db'
import { desc, eq } from 'drizzle-orm'
import Link from 'next/link'
import { groups, products } from 'schema'

export default async function Page() {
  const groupItems = db
    .select({
      id: groups.id,
      name: groups.name,
      productsCount: db.$count(products, eq(products.groupId, groups.id)),
    })
    .from(groups)
    .orderBy(desc(groups.publishDate))
    .all()

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {groupItems.map((group) => (
        <div className="flex flex-col gap-4" key={group.id}>
          <Link href={`/group/${group.id}`}>
            {group.name} ({group.productsCount})
          </Link>
        </div>
      ))}
    </div>
  )
}
