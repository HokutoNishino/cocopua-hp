import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { useNewsList } from '@/features/news/hooks/useNewsList'

function formatDate(dateText: string) {
  return new Date(dateText).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function NewsListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const {
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
  } = useNewsList()

  useEffect(() => {
    const pageFromQuery = Number(searchParams.get('page') ?? '1')
    const searchFromQuery = searchParams.get('search') ?? ''
    const categoryFromQueryRaw = searchParams.get('category')
    const categoryFromQuery = categoryFromQueryRaw ? Number(categoryFromQueryRaw) : null

    if (!Number.isNaN(pageFromQuery) && pageFromQuery > 0 && pageFromQuery !== page) {
      setPage(pageFromQuery)
    }

    if (searchFromQuery !== search) {
      setSearch(searchFromQuery)
    }

    if ((Number.isNaN(categoryFromQuery) ? null : categoryFromQuery) !== categoryId) {
      setCategoryId(Number.isNaN(categoryFromQuery) ? null : categoryFromQuery)
    }
  }, [searchParams, page, search, categoryId, setPage, setSearch, setCategoryId])

  useEffect(() => {
    const nextParams = new URLSearchParams()

    if (page > 1) {
      nextParams.set('page', String(page))
    }

    if (search.trim()) {
      nextParams.set('search', search.trim())
    }

    if (categoryId) {
      nextParams.set('category', String(categoryId))
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true })
    }
  }, [page, search, categoryId, searchParams, setSearchParams])

  function buildDetailLink(newsId: number) {
    const detailParams = new URLSearchParams()

    if (page > 1) {
      detailParams.set('fromPage', String(page))
    }

    if (search.trim()) {
      detailParams.set('fromSearch', search.trim())
    }

    const queryString = detailParams.toString()
    return queryString ? `/news/${newsId}?${queryString}` : `/news/${newsId}`
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif-en text-4xl text-[var(--text-main)]">News</h1>

      <form
        className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
        onSubmit={(event) => {
          event.preventDefault()
          setPage(1)
        }}
      >
        <select
          value={categoryId ?? ''}
          onChange={(event) => {
            const nextValue = event.target.value
            setCategoryId(nextValue ? Number(nextValue) : null)
            setPage(1)
          }}
          className="h-11 rounded-full border border-[var(--line-soft)] bg-white px-4 font-ui text-sm text-[var(--text-main)] outline-none focus:border-[#d9c1bb]"
        >
          <option value="">すべてのカテゴリ</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="キーワードで検索"
          className="h-11 w-full rounded-full border border-[var(--line-soft)] bg-white px-4 font-ui text-sm text-[var(--text-main)] outline-none focus:border-[#d9c1bb] sm:max-w-sm"
        />
        <button type="submit" className="btn-pill border border-[var(--line-soft)] bg-white text-sm text-[var(--text-main)]">
          検索する
        </button>
      </form>

      {isLoading ? (
        <div className="mt-8 h-28 animate-pulse rounded-2xl border border-[var(--line-soft)] bg-white/70" />
      ) : null}

      {error ? <p className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</p> : null}

      {!isLoading && !error ? (
        <>
          <div className="mt-8 grid gap-3">
            {newsList.map((news) => (
              <Link
                key={news.id}
                to={buildDetailLink(news.id)}
                className="rounded-2xl border border-[var(--line-soft)] bg-white p-5 transition hover:border-[#d9c1bb]"
              >
                <p className="text-xs text-[var(--text-muted)]">{formatDate(news.date)}</p>
                <p className="mt-2 text-base font-medium text-[var(--text-main)]">{news.title}</p>
              </Link>
            ))}

            {newsList.length === 0 ? (
              <p className="rounded-xl border border-[var(--line-soft)] bg-white p-5 font-ui text-sm text-[var(--text-muted)]">
                該当するお知らせは見つかりませんでした。
              </p>
            ) : null}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page <= 1}
              className="btn-pill border border-[var(--line-soft)] bg-white text-sm text-[var(--text-main)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              前へ
            </button>
            <p className="font-ui text-sm text-[var(--text-muted)]">
              {page} / {totalPages}
            </p>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page >= totalPages}
              className="btn-pill border border-[var(--line-soft)] bg-white text-sm text-[var(--text-main)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              次へ
            </button>
          </div>
        </>
      ) : null}
    </section>
  )
}
