import { Link, useParams } from 'react-router-dom'

export function NewsDetailPage() {
  const { id } = useParams()

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <article className="rounded-2xl border border-rose-100 bg-white p-6 sm:p-8">
        <p className="text-xs text-zinc-500">2026-04-22</p>
        <h1 className="mt-2 text-2xl font-semibold">お知らせ詳細: {id}</h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600">
          ここにお知らせ本文が入ります。実装時は API またはストレージから対象IDのデータを取得して表示します。
        </p>
        <div className="mt-6">
          <Link to="/news" className="text-sm font-medium text-rose-600 hover:underline">
            お知らせ一覧に戻る
          </Link>
        </div>
      </article>
    </section>
  )
}
