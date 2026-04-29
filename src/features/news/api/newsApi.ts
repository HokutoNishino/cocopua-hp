import type { NewsItem, WpNewsItem } from '@/features/news/types'

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
  },
  {
    id: 102,
    title: '春のまつげパーマキャンペーン',
    content: '期間限定でまつげパーマの初回キャンペーンを実施しています。',
    date: '2026-04-20T09:00:00',
    modified: '2026-04-20T09:00:00',
  },
]

function normalizeNews(item: WpNewsItem): NewsItem {
  return {
    id: item.id,
    title: item.title.rendered,
    content: item.content.rendered,
    date: item.date,
    modified: item.modified,
  }
}

function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL?.replace(/\/$/, '')
}

export async function fetchNewsList(page = 1, perPage = 10): Promise<NewsListResult> {
  const baseUrl = getApiBaseUrl()

  if (!baseUrl) {
    const totalPages = Math.max(1, Math.ceil(fallbackNewsList.length / perPage))
    const start = (page - 1) * perPage
    const end = start + perPage
    return {
      items: fallbackNewsList.slice(start, end),
      totalPages,
    }
  }

  try {
    const response = await fetch(
      `${baseUrl}/wp-json/wp/v2/news?status=publish&per_page=${perPage}&page=${page}&orderby=date&order=desc`,
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch news list: ${response.status}`)
    }

    const totalPagesHeader = response.headers.get('X-WP-TotalPages')
    const totalPages = totalPagesHeader ? Number(totalPagesHeader) : 1
    const data = (await response.json()) as WpNewsItem[]
    return {
      items: data.map(normalizeNews),
      totalPages: Number.isNaN(totalPages) || totalPages < 1 ? 1 : totalPages,
    }
  } catch {
    const totalPages = Math.max(1, Math.ceil(fallbackNewsList.length / perPage))
    const start = (page - 1) * perPage
    const end = start + perPage
    return {
      items: fallbackNewsList.slice(start, end),
      totalPages,
    }
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
