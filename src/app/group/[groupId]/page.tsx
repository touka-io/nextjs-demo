import { SiteHeader } from '@/components/site-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/db'
import { groups, products } from '@/schema'
import { IconTrendingUp } from '@tabler/icons-react'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ groupId: number }> }) {
  const { groupId } = await params
  const group = db.select().from(groups).where(eq(groups.id, groupId)).get()
  if (!group) return notFound()

  const ps = db.select().from(products).where(eq(products.groupId, groupId)).all()

  return (
    <>
      <SiteHeader title={group.name}>
        {group.url ? (
          <Button asChild variant="ghost">
            <a href={group.url} rel="nofollow noreferrer" target="_blank">
              URL
            </a>
          </Button>
        ) : null}
      </SiteHeader>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
              {ps.map((x) => (
                <Card className="@container/card pt-0 overflow-hidden" key={x.id}>
                  <img className="aspect-square" src={x.image || '#'} loading="lazy" />
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                      {x.name ?? '-'}
                    </CardTitle>
                    <CardDescription>
                      {x.publisher ?? '-'} ({x.publishDate ?? '-'})
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="gap-2 mt-auto">
                    <div className="line-clamp-1 flex gap-2 font-medium">￥{x.price?.toLocaleString() ?? '-'}</div>
                    <Badge variant="outline" className="bg-white">
                      <IconTrendingUp />
                      +12.5%
                    </Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
