import { Link } from 'react-router-dom'

export function TopPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="rounded-3xl border border-rose-100 bg-white/90 p-8 shadow-sm sm:p-12">
        <p className="text-sm text-rose-500">目元から、私らしい印象へ</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">上質で自然なアイデザインを。</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
          Cocopuaは、まつげパーマ・エクステ・アイブロウを中心に、一人ひとりの目元に合わせた提案を行うアイサロンです。
          初めての方でも不安なくご来店いただけるよう、施術内容や料金を分かりやすくご案内します。
        </p>

        <div className="mt-8">
          <Link
            to="/menu"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-rose-200 bg-white px-5 py-3 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
          >
            メニューを見る
          </Link>
        </div>
      </div>
    </section>
  )
}
