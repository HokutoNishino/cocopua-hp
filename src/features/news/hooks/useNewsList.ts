import { useEffect, useState } from 'react'

import { fetchNewsList } from '@/features/news/api/newsApi'
import type { NewsItem } from '@/features/news/types'

export function useNewsList() {
  const perPage = 6
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [newsList, setNewsList] = useState<NewsItem[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchNewsList({ page, perPage, search })
        if (!isMounted) return
        setNewsList(data.items)
        setTotalPages(data.totalPages)
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
  }, [page, search])

  return { newsList, isLoading, error, page, totalPages, setPage, search, setSearch }
}
