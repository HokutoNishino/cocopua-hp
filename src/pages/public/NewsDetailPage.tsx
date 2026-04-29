import { Link, useParams, useSearchParams } from 'react-router-dom'

import { useNewsDetail } from '@/features/news/hooks/useNewsDetail'
import { sanitizeHtml } from '@/lib/sanitizeHtml'

function formatDate(dateText: string) {
  return new Date(dateText).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function NewsDetailPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const parsedId = id ? Number(id) : null
  const { newsItem, isLoading, error } = useNewsDetail(Number.isNaN(parsedId) ? null : parsedId)

  const fromPage = searchParams.get('fromPage')
  const fromSearch = searchParams.get('fromSearch')
  const backParams = new URLSearchParams()

  if (fromPage) {
    backParams.set('page', fromPage)
  }

  if (fromSearch) {
    backParams.set('search', fromSearch)
  }

  const backToListLink = backParams.toString() ? `/news?${backParams.toString()}` : '/news'

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
            <div
              className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--text-muted)] [&_a]:underline [&_a]:underline-offset-2"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(newsItem.content),
              }}
            />
          </>
        ) : null}

        <div className="mt-6">
          <Link to={backToListLink} className="text-sm font-medium text-[var(--text-main)] underline underline-offset-4">
            お知らせ一覧に戻る
          </Link>
        </div>
      </article>
    </section>
  )
}
