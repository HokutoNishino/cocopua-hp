import { ReservationCta } from '@/components/common/ReservationCta'

export function ReservationPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-3xl border border-rose-100 bg-white p-8 text-center sm:p-10">
        <h1 className="text-3xl font-semibold">Reservation</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-600">
          ご予約は外部予約システムから承っています。空き状況確認から予約確定まで数分で完了します。
        </p>
        <div className="mt-8">
          <ReservationCta className="w-full sm:w-auto" label="予約する" />
        </div>
      </div>
    </section>
  )
}
