export function StaffPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Staff</h1>
      <p className="mt-3 text-zinc-600">スタッフ紹介と得意なデザインを掲載します。</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-rose-100 bg-white p-5">
          <p className="text-lg font-medium">Stylist A</p>
          <p className="mt-2 text-sm text-zinc-600">ナチュラルなまつげパーマと似合わせ提案が得意です。</p>
        </article>
        <article className="rounded-2xl border border-rose-100 bg-white p-5">
          <p className="text-lg font-medium">Stylist B</p>
          <p className="mt-2 text-sm text-zinc-600">エクステの持続性と軽さを重視したデザインが得意です。</p>
        </article>
      </div>
    </section>
  )
}
