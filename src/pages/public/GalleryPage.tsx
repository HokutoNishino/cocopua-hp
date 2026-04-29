const cards = ['Natural Curl', 'Elegant Lash', 'Soft Volume', 'Brown Design']

export function GalleryPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Gallery</h1>
      <p className="mt-3 text-zinc-600">施術デザインの雰囲気を掲載します（画像は後で差し替え）。</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((name) => (
          <article key={name} className="rounded-2xl border border-rose-100 bg-white p-4">
            <div className="h-40 rounded-xl bg-gradient-to-br from-rose-100 to-orange-100" />
            <p className="mt-3 text-sm font-medium">{name}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
