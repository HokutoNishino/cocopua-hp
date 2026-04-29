import { NavLink, Outlet } from 'react-router-dom'

import logo from '../../../assets/brand/cocopua-logo.jpg'

const links = [
  { to: '/', label: 'Top' },
  { to: '/menu', label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/staff', label: 'Staff' },
  { to: '/access', label: 'Access' },
  { to: '/faq', label: 'FAQ' },
  { to: '/news', label: 'News' },
]

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-orange-50 text-zinc-700">
      <header className="border-b border-rose-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Cocopua ロゴ"
              className="h-12 w-12 rounded-xl border border-rose-100 object-cover"
            />
            <div>
              <p className="text-xs tracking-wide text-rose-400">Beauté du Regard</p>
              <p className="text-lg font-semibold">Cocopua</p>
            </div>
          </NavLink>

          <nav className="flex flex-wrap items-center gap-2 text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 transition ${
                    isActive
                      ? 'bg-rose-100 text-rose-700'
                      : 'text-zinc-600 hover:bg-rose-50 hover:text-rose-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-rose-100 bg-white/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Cocopua</p>
            <p className="text-sm text-zinc-500">東京都〇〇区〇〇 1-2-3 / 10:00-19:00 / 最寄り駅: 〇〇駅</p>
          </div>
          <ReservationCta />
        </div>
      </footer>
    </div>
  )
}
