export type NewsItem = {
  id: number
  title: string
  content: string
  date: string
  modified: string
}

export type NewsListQuery = {
  page?: number
  perPage?: number
  search?: string
}

export type WpNewsItem = {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  date: string
  modified: string
}
