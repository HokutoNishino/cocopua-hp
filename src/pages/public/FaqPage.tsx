const faqs = [
  {
    q: '初めてでも予約できますか？',
    a: 'はい。予約ページからメニューを選択してそのままご予約いただけます。',
  },
  {
    q: 'メイクはして行っても大丈夫ですか？',
    a: '可能です。施術前に目元の状態を確認し、必要に応じてオフを行います。',
  },
  {
    q: '当日キャンセルはできますか？',
    a: 'キャンセル規定は予約SaaSの案内に準拠します。予約時にご確認ください。',
  },
]

export function FaqPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold">FAQ</h1>
      <div className="mt-8 grid gap-4">
        {faqs.map((faq) => (
          <article key={faq.q} className="rounded-2xl border border-rose-100 bg-white p-5">
            <h2 className="text-base font-medium">Q. {faq.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">A. {faq.a}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
