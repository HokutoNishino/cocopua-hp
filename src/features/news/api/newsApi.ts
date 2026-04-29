import type {
  NewsCategory,
  NewsItem,
  NewsListQuery,
  WpNewsCategory,
  WpNewsItem,
} from '@/features/news/types'

export type NewsListResult = {
  items: NewsItem[]
  totalPages: number
}

const fallbackNewsList: NewsItem[] = [
  {
    id: 101,
    title: 'サイトを公開しました',
    content: 'Cocopua公式サイトを公開しました。最新情報は本ページでお知らせします。',
    date: '2026-04-22T09:00:00',
    modified: '2026-04-22T09:00:00',
    categoryIds: [1],
  },
  {
    id: 102,
    title: '春のまつげパーマキャンペーン',
    content: '期間限定でまつげパーマの初回キャンペーンを実施しています。',
    date: '2026-04-20T09:00:00',
    modified: '2026-04-20T09:00:00',
    categoryIds: [2],
  },
]

const fallbackCategories: NewsCategory[] = [
  { id: 1, name: 'お知らせ' },
  { id: 2, name: 'キャンペーン' },
]

const categoryFilterKeys = ['categories', 'news_category'] as const
const categoryEndpoints = ['categories', 'news_category', 'news-category'] as const

function normalizeNews(item: WpNewsItem): NewsItem {
  return {
    id: item.id,
    title: item.title.rendered,
    content: item.content.rendered,
    date: item.date,
    modified: item.modified,
    categoryIds: item.categories ?? [],
  }
}

function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL?.replace(/\/$/, '')
}

function applyFallbackSearch(items: NewsItem[], search: string | undefined) {
  const keyword = search?.trim().toLowerCase()

  if (!keyword) {
    return items
  }

  return items.filter((item) => {
    const title = item.title.toLowerCase()
    const content = item.content.toLowerCase()
    return title.includes(keyword) || content.includes(keyword)
  })
}

function applyFallbackCategory(items: NewsItem[], categoryId: number | null | undefined) {
  if (!categoryId) {
    return items
  }

  return items.filter((item) => item.categoryIds.includes(categoryId))
}

export async function fetchNewsList(query: NewsListQuery = {}): Promise<NewsListResult> {
  const page = query.page ?? 1
  const perPage = query.perPage ?? 10
  const search = query.search?.trim()
  const categoryId = query.categoryId ?? null
  const baseUrl = getApiBaseUrl()

  if (!baseUrl) {
    const byCategory = applyFallbackCategory(fallbackNewsList, categoryId)
    const filtered = applyFallbackSearch(byCategory, search)
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
    const start = (page - 1) * perPage
    const end = start + perPage
    return {
      items: filtered.slice(start, end),
      totalPages,
    }
  }

  try {
    let response: Response | null = null

    for (const filterKey of categoryFilterKeys) {
      const params = new URLSearchParams({
        status: 'publish',
        per_page: String(perPage),
        page: String(page),
        orderby: 'date',
        order: 'desc',
      })

      if (search) {
        params.set('search', search)
      }

      if (categoryId) {
        params.set(filterKey, String(categoryId))
      }

      response = await fetch(`${baseUrl}/wp-json/wp/v2/news?${params.toString()}`)

      if (response.ok) {
        break
      }

      if (!categoryId) {
        break
      }

      if (response.status !== 400) {
        break
      }
    }

    if (!response || !response.ok) {
      throw new Error(`Failed to fetch news list: ${response?.status ?? 'unknown'}`)
    }

    const totalPagesHeader = response.headers.get('X-WP-TotalPages')
    const totalPages = totalPagesHeader ? Number(totalPagesHeader) : 1
    const data = (await response.json()) as WpNewsItem[]
    return {
      items: data.map(normalizeNews),
      totalPages: Number.isNaN(totalPages) || totalPages < 1 ? 1 : totalPages,
    }
  } catch {
    const byCategory = applyFallbackCategory(fallbackNewsList, categoryId)
    const filtered = applyFallbackSearch(byCategory, search)
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
    const start = (page - 1) * perPage
    const end = start + perPage
    return {
      items: filtered.slice(start, end),
      totalPages,
    }
  }
}

export async function fetchNewsCategories(): Promise<NewsCategory[]> {
  const baseUrl = getApiBaseUrl()

  if (!baseUrl) {
    return fallbackCategories
  }

  try {
    for (const endpoint of categoryEndpoints) {
      const response = await fetch(
        `${baseUrl}/wp-json/wp/v2/${endpoint}?per_page=100&orderby=count&order=desc`,
      )

      if (!response.ok) {
        continue
      }

      const data = (await response.json()) as WpNewsCategory[]
      return data.map((item) => ({ id: item.id, name: item.name }))
    }

    return fallbackCategories
  } catch {
    return fallbackCategories
  }
}

export async function fetchNewsDetail(id: number): Promise<NewsItem | null> {
  const baseUrl = getApiBaseUrl()

  if (!baseUrl) {
    return fallbackNewsList.find((item) => item.id === id) ?? null
  }

  try {
    const response = await fetch(`${baseUrl}/wp-json/wp/v2/news/${id}`)

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch news detail: ${response.status}`)
    }

    const data = (await response.json()) as WpNewsItem
    return normalizeNews(data)
  } catch {
    return fallbackNewsList.find((item) => item.id === id) ?? null
  }
}
