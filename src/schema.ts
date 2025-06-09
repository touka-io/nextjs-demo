import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const products = sqliteTable('products', {
  id: integer().primaryKey(),
  name: text(),
  price: integer(),
  publisher: text(),
  publishDate: text('publish_date'),
  url: text(),
  desc: text(),
  image: text(),
  groupId: integer('group_id').references(() => groups.id),
})

export const productImages = sqliteTable('product_images', {
  id: integer().primaryKey(),
  image: text(),
  productId: integer('product_id').references(() => products.id),
})

export const groups = sqliteTable('groups', {
  id: integer().primaryKey(),
  name: text().notNull(),
  publishDate: text('publish_date'),
  url: text(),
})
