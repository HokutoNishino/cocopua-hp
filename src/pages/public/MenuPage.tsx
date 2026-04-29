const menuItems = [
  { name: 'まつげパーマ', duration: '60分', price: '¥6,600' },
  { name: 'フラットラッシュ 100本', duration: '75分', price: '¥7,700' },
  { name: 'アイブロウスタイリング', duration: '45分', price: '¥5,500' },
]

export function MenuPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Menu</h1>
      <p className="mt-3 text-zinc-600">施術メニュー・所要時間・価格の一覧です。</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-rose-100 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-rose-50 text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium">メニュー</th>
              <th className="px-4 py-3 font-medium">所要時間</th>
              <th className="px-4 py-3 font-medium">価格</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.name} className="border-t border-rose-100">
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.duration}</td>
                <td className="px-4 py-3">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
