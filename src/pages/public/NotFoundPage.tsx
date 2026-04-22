import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <p className="text-sm text-zinc-500">404</p>
      <h1 className="mt-2 text-3xl font-semibold">ページが見つかりません</h1>
      <p className="mt-4 text-sm text-zinc-600">URLをご確認いただくか、トップページからお探しください。</p>
      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-rose-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-600"
        >
          トップに戻る
        </Link>
      </div>
    </section>
  )
}
