import { useEffect, useState } from 'react'

import { fetchTopContent } from '@/features/top/api/topApi'
import type { TopContent } from '@/features/top/types'

export function useTopContent() {
  const [topContent, setTopContent] = useState<TopContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      setIsLoading(true)
      const data = await fetchTopContent()
      if (!isMounted) return
      setTopContent(data)
      setIsLoading(false)
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [])

  return { topContent, isLoading }
}
