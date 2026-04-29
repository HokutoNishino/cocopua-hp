export type UspItem = {
  title: string
  description: string
}

export type MenuHighlightItem = {
  name: string
  price: string
}

export type TopContent = {
  heroCatchMain: string
  heroCatchSub: string
  heroBadgeText: string
  uspItems: UspItem[]
  menuHighlightItems: MenuHighlightItem[]
  aboutText: string
  reservationLineUrl: string
  reservationHotpepperUrl: string
  reservationInstagramUrl: string
}

export type WpRenderedField = {
  rendered?: string
}

export type WpTopResponse = {
  acf?: {
    hero_catch_main?: string
    hero_catch_sub?: string
    hero_badge_text?: string
    usp_items?: Array<{ title?: string; description?: string }>
    menu_highlight_items?: Array<{ name?: string; price?: string }>
    about_text?: string
    reservation_line_url?: string
    reservation_hotpepper_url?: string
    reservation_instagram_url?: string
  }
  content?: WpRenderedField
}
