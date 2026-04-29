export type NewsItem = {
  id: number
  title: string
  content: string
  date: string
  modified: string
  categoryIds: number[]
}

export type NewsListQuery = {
  page?: number
  perPage?: number
  search?: string
  categoryId?: number | null
}

export type NewsCategory = {
  id: number
  name: string
}

export type WpNewsItem = {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  date: string
  modified: string
  categories?: number[]
}

export type WpNewsCategory = {
  id: number
  name: string
}
