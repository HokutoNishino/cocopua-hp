import { Link } from 'react-router-dom'

import logo from '../../../assets/brand/cocopua-logo.jpg'
import { useTopContent } from '@/features/top/hooks/useTopContent'

export function TopPage() {
  const { topContent, isLoading } = useTopContent()

  if (isLoading || !topContent) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="h-64 animate-pulse rounded-2xl border border-[var(--line-soft)] bg-white/70" />
      </section>
    )
  }

  return (
    <div className="space-y-0 pb-10">
      <section className="relative overflow-hidden border-b border-[var(--line-soft)] bg-[var(--bg-base)]">
        <div className="mx-auto grid min-h-[560px] max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="font-ui text-sm tracking-[0.22em] text-[var(--text-muted)]">Beauté du Regard</p>
            <h1 className="mt-6 font-serif-ja text-4xl leading-tight text-[var(--text-main)] sm:text-5xl">
              {topContent.heroCatchMain}
            </h1>
            <p className="mt-6 max-w-lg font-ui text-sm leading-7 text-[var(--text-muted)] sm:text-base">
              {topContent.heroCatchSub}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/menu" className="btn-pill bg-[var(--accent)] text-[var(--text-main)] hover:bg-[#ceb4ad]">
                メニューを見る
              </Link>
              <a
                href={topContent.reservationHotpepperUrl}
                className="btn-pill border border-[var(--line-soft)] bg-white text-[var(--text-main)] hover:bg-[var(--bg-sub)]"
              >
                今すぐ予約
              </a>
            </div>
            <div className="mt-12 flex items-center gap-3 font-ui text-xs tracking-[0.16em] text-[var(--text-muted)]">
              <span>Scroll</span>
              <span className="h-6 w-px bg-[var(--line-soft)]" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[var(--line-soft)] bg-[radial-gradient(circle_at_30%_20%,#ffffff_0%,#f0e5e1_45%,#e7d7d2_100%)]">
            <div className="absolute right-4 top-4 rounded-full border border-white/60 bg-white/45 px-5 py-5 text-center backdrop-blur">
              <p className="font-serif-en text-xs text-[var(--text-muted)]">special</p>
              <p className="mt-1 font-serif-en text-xl text-[var(--text-main)]">{topContent.heroBadgeText}</p>
            </div>
            <div className="flex h-full min-h-[380px] items-end justify-center p-8">
              <img src={logo} alt="Cocopua" className="h-40 w-40 rounded-full border border-white/70 object-cover sm:h-52 sm:w-52" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line-soft)] bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {topContent.uspItems.slice(0, 4).map((item) => (
            <article key={item.title} className="rounded-xl border border-[var(--line-soft)] bg-[var(--bg-base)]/50 p-4">
              <h2 className="font-serif-ja text-lg text-[var(--text-main)]">{item.title}</h2>
              <p className="mt-2 font-ui text-sm leading-6 text-[var(--text-muted)]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        <article className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 sm:p-8">
          <h2 className="font-serif-en text-4xl text-[var(--text-main)]">Menu</h2>
          <ul className="mt-6 space-y-3">
            {topContent.menuHighlightItems.map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-4 border-b border-[var(--line-soft)]/70 pb-2 font-ui text-sm text-[var(--text-main)]">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
          <Link to="/menu" className="btn-pill mt-8 border border-[var(--line-soft)] bg-[var(--bg-sub)] text-[var(--text-main)] hover:bg-[#e6dbd6]">
            メニュー一覧を見る
          </Link>
        </article>

        <div className="rounded-2xl border border-[var(--line-soft)] bg-[linear-gradient(135deg,#f7ece8,#efe2de)] p-6 sm:p-8">
          <p className="font-serif-en text-3xl text-[var(--text-main)]">Design your beauty.</p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="h-28 rounded-xl border border-[var(--line-soft)] bg-white/70" />
            <div className="h-28 rounded-xl border border-[var(--line-soft)] bg-white/70" />
            <div className="h-28 rounded-xl border border-[var(--line-soft)] bg-white/70" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 sm:p-8">
          <h2 className="font-serif-en text-4xl text-[var(--text-main)]">About</h2>
          <p className="mt-5 font-ui text-sm leading-7 text-[var(--text-muted)]">{topContent.aboutText}</p>
          <Link to="/staff" className="btn-pill mt-8 border border-[var(--line-soft)] bg-white text-[var(--text-main)] hover:bg-[var(--bg-sub)]">
            もっと見る
          </Link>
        </article>

        <article className="rounded-2xl border border-[var(--line-soft)] bg-white p-6 sm:p-8">
          <h2 className="font-serif-en text-4xl text-[var(--text-main)]">Gallery</h2>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="h-24 rounded-lg border border-[var(--line-soft)] bg-[var(--bg-sub)]" />
            <div className="h-24 rounded-lg border border-[var(--line-soft)] bg-[var(--bg-sub)]" />
            <div className="h-24 rounded-lg border border-[var(--line-soft)] bg-[var(--bg-sub)]" />
          </div>
          <Link to="/gallery" className="btn-pill mt-8 border border-[var(--line-soft)] bg-white text-[var(--text-main)] hover:bg-[var(--bg-sub)]">
            ギャラリーを見る
          </Link>
        </article>
      </section>

      <section className="mx-auto mt-10 max-w-6xl rounded-2xl border border-[var(--line-soft)] bg-[var(--bg-sub)] px-4 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-serif-ja text-2xl text-[var(--text-main)]">ご予約・お問い合わせはこちら</p>
            <p className="mt-2 font-ui text-sm text-[var(--text-muted)]">LINE・ホットペッパーから24時間ご予約いただけます。</p>
          </div>
          <div className="grid min-w-[280px] gap-3 sm:grid-cols-3">
            <a href={topContent.reservationLineUrl} className="btn-pill border border-[var(--line-soft)] bg-white text-center font-ui text-sm text-[var(--text-main)] hover:bg-[#e6dbd6]">
              LINE予約
            </a>
            <a href={topContent.reservationHotpepperUrl} className="btn-pill border border-[var(--line-soft)] bg-white text-center font-ui text-sm text-[var(--text-main)] hover:bg-[#e6dbd6]">
              ホットペッパー
            </a>
            <a href={topContent.reservationInstagramUrl} className="btn-pill border border-[var(--line-soft)] bg-white text-center font-ui text-sm text-[var(--text-main)] hover:bg-[#e6dbd6]">
              Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
