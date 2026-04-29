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
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-main)]">
      <header className="sticky top-0 z-20 border-b border-[var(--line-soft)] bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Cocopua ロゴ"
              className="h-12 w-12 rounded-full border border-[var(--line-soft)] object-cover"
            />
            <div>
              <p className="font-ui text-xs tracking-[0.2em] text-[var(--text-muted)]">Beauté du Regard</p>
              <p className="font-serif-en text-3xl leading-none">Cocopua</p>
            </div>
          </NavLink>

          <nav className="flex flex-wrap items-center gap-1 font-ui text-sm sm:gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 transition ${
                    isActive
                      ? 'bg-[var(--bg-sub)] text-[var(--text-main)]'
                      : 'text-[var(--text-muted)] hover:bg-[var(--bg-sub)] hover:text-[var(--text-main)]'
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

      <footer className="mt-10 border-t border-[var(--line-soft)] bg-white/85">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Cocopua ロゴ" className="h-12 w-12 rounded-full border border-[var(--line-soft)] object-cover" />
            <div>
              <p className="font-serif-en text-2xl">Cocopua</p>
              <p className="font-ui text-xs text-[var(--text-muted)]">Beauté du Regard</p>
            </div>
          </div>
          <div className="font-ui text-sm text-[var(--text-muted)]">
            東京都〇〇区〇〇 1-2-3 / 10:00-19:00 / 最寄り駅: 〇〇駅
          </div>
          <div className="font-ui text-sm text-[var(--text-muted)] lg:text-right">© Cocopua Beauté du Regard</div>
        </div>
      </footer>
    </div>
  )
}
