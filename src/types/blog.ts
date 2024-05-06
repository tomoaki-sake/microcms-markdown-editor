import type { Category } from "./category"
import type { Tag } from "./tag"

export type Blog = {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  markdown: string
  category: Category
  tags: Tag[]
}
