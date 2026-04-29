import { useEffect, useState } from 'react'

import { fetchNewsCategories, fetchNewsList } from '@/features/news/api/newsApi'
import type { NewsCategory, NewsItem } from '@/features/news/types'

export function useNewsList() {
  const perPage = 6
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [categories, setCategories] = useState<NewsCategory[]>([])
  const [newsList, setNewsList] = useState<NewsItem[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadCategories = async () => {
      const data = await fetchNewsCategories()
      if (!isMounted) return
      setCategories(data)
    }

    void loadCategories()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchNewsList({ page, perPage, search, categoryId })
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
  }, [page, search, categoryId])

  return {
    newsList,
    categories,
    isLoading,
    error,
    page,
    totalPages,
    setPage,
    search,
    setSearch,
    categoryId,
    setCategoryId,
  }
}
