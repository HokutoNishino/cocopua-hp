import { useEffect, useState } from 'react'

import { fetchNewsDetail } from '@/features/news/api/newsApi'
import type { NewsItem } from '@/features/news/types'

export function useNewsDetail(id: number | null) {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      if (!id) {
        setNewsItem(null)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchNewsDetail(id)
        if (!isMounted) return
        setNewsItem(data)
      } catch {
        if (!isMounted) return
        setError('お知らせ詳細の取得に失敗しました。')
      } finally {
        if (!isMounted) return
        setIsLoading(false)
      }
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [id])

  return { newsItem, isLoading, error }
}
