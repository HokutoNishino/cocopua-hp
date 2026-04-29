import { Link } from 'react-router-dom'

const newsItems = [
  { id: 'welcome', title: 'サイトを公開しました', date: '2026-04-22' },
  { id: 'campaign', title: '春のまつげパーマキャンペーン', date: '2026-04-20' },
]

export function NewsListPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold">News</h1>
      <div className="mt-8 grid gap-3">
        {newsItems.map((news) => (
          <Link
            key={news.id}
            to={`/news/${news.id}`}
            className="rounded-2xl border border-rose-100 bg-white p-5 transition hover:border-rose-200"
          >
            <p className="text-xs text-zinc-500">{news.date}</p>
            <p className="mt-2 text-base font-medium">{news.title}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
