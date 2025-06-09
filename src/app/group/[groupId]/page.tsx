import { db } from 'db'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { products, groups } from 'schema'

export default async function Page({ params }: { params: Promise<{ groupId: number }> }) {
  const { groupId } = await params
  const group = db.select().from(groups).where(eq(groups.id, groupId)).get()
  if (!group) return notFound()

  const ps = db.select().from(products).where(eq(products.groupId, groupId)).all()

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto">
      <div>{group.name}</div>
      {group.url ? (
        <a href={group.url} rel="nofollow noreferrer" target="_blank">
          URL
        </a>
      ) : null}
      <div className="grid grid-cols-6 gap-4">
        {ps.map((x) => (
          <div className="flex flex-col gap-2" key={x.id}>
            <img src={x.image || '#'} loading="lazy" />
            <div>{x.name}</div>
            <div>￥{x.price?.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
