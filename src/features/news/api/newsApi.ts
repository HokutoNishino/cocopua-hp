import type { NewsItem, WpNewsItem } from '@/features/news/types'

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

export async function fetchNewsList(): Promise<NewsItem[]> {
  const baseUrl = getApiBaseUrl()

  if (!baseUrl) {
    return fallbackNewsList
  }

  try {
    const response = await fetch(
      `${baseUrl}/wp-json/wp/v2/news?status=publish&per_page=10&orderby=date&order=desc`,
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch news list: ${response.status}`)
    }

    const data = (await response.json()) as WpNewsItem[]
    return data.map(normalizeNews)
  } catch {
    return fallbackNewsList
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
