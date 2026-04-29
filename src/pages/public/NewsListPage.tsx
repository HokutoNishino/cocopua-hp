import { Link } from 'react-router-dom'

import { useNewsList } from '@/features/news/hooks/useNewsList'

function formatDate(dateText: string) {
  return new Date(dateText).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function NewsListPage() {
  const { newsList, isLoading, error, page, totalPages, setPage } = useNewsList()

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif-en text-4xl text-[var(--text-main)]">News</h1>

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
                to={`/news/${news.id}`}
                className="rounded-2xl border border-[var(--line-soft)] bg-white p-5 transition hover:border-[#d9c1bb]"
              >
                <p className="text-xs text-[var(--text-muted)]">{formatDate(news.date)}</p>
                <p className="mt-2 text-base font-medium text-[var(--text-main)]">{news.title}</p>
              </Link>
            ))}
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
