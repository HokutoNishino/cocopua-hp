import { useEffect, useState } from 'react'

import { fetchNewsList } from '@/features/news/api/newsApi'
import type { NewsItem } from '@/features/news/types'

export function useNewsList() {
  const [newsList, setNewsList] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchNewsList()
        if (!isMounted) return
        setNewsList(data)
      } catch {
        if (!isMounted) return
        setError('お知らせの取得に失敗しました。')
      } finally {
        if (!isMounted) return
        setIsLoading(false)
      }
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [])

  return { newsList, isLoading, error }
}
