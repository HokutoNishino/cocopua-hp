import logo from '../assets/brand/cocopua-logo.jpg'

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-orange-50 px-6 py-12">
      <div className="mx-auto max-w-md rounded-3xl border border-rose-100 bg-white/90 p-6 shadow-sm">
        <img
          src={logo}
          alt="Cocopua ロゴ"
          className="mx-auto w-52 rounded-2xl border border-rose-100 bg-white p-2"
        />

        <p className="mt-6 text-center text-sm text-rose-500">Beauté du Regard</p>
        <h1 className="mt-2 text-center text-3xl font-semibold text-zinc-700">Cocopua</h1>
        <p className="mt-4 text-center text-sm leading-relaxed text-zinc-600">
          React + Vite + Tailwind の初期設定が完了しました。次は shadcn/ui を導入して、
          予約導線とお知らせ投稿画面を実装していきます。
        </p>

        <div className="mt-6 grid gap-3 text-sm">
          <button className="rounded-xl bg-rose-500 px-4 py-3 font-medium text-white transition hover:bg-rose-600">
            予約する（外部SaaS）
          </button>
          <button className="rounded-xl border border-rose-200 bg-white px-4 py-3 font-medium text-rose-600 transition hover:bg-rose-50">
            お知らせ一覧を見る
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
