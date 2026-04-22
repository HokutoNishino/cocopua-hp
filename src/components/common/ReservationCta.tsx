type ReservationCtaProps = {
  className?: string
  label?: string
}

const reservationUrl =
  import.meta.env.VITE_RESERVATION_URL ?? 'https://example.com/reservation'

export function ReservationCta({
  className = '',
  label = '予約する',
}: ReservationCtaProps) {
  return (
    <a
      href={reservationUrl}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-11 items-center justify-center rounded-xl bg-rose-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-600 ${className}`}
    >
      {label}
    </a>
  )
}
