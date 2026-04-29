import { Link, useParams } from 'react-router-dom'

import { useNewsDetail } from '@/features/news/hooks/useNewsDetail'

function formatDate(dateText: string) {
  return new Date(dateText).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function NewsDetailPage() {
  const { id } = useParams()
  const parsedId = id ? Number(id) : null
  const { newsItem, isLoading, error } = useNewsDetail(Number.isNaN(parsedId) ? null : parsedId)

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <article className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 sm:p-8">
        {isLoading ? <div className="h-36 animate-pulse rounded-xl bg-[var(--bg-sub)]" /> : null}

        {!isLoading && error ? <p className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</p> : null}

        {!isLoading && !error && !newsItem ? (
          <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">対象のお知らせが見つかりませんでした。</p>
        ) : null}

        {!isLoading && !error && newsItem ? (
          <>
            <p className="text-xs text-[var(--text-muted)]">{formatDate(newsItem.date)}</p>
            <h1 className="mt-2 font-serif-ja text-3xl text-[var(--text-main)]">{newsItem.title}</h1>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text-muted)]">{newsItem.content.replace(/<[^>]*>/g, '')}</p>
          </>
        ) : null}

        <div className="mt-6">
          <Link to="/news" className="text-sm font-medium text-[var(--text-main)] underline underline-offset-4">
            お知らせ一覧に戻る
          </Link>
        </div>
      </article>
    </section>
  )
}
