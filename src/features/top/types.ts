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
  heroImageUrl: string
  uspItems: UspItem[]
  menuHighlightItems: MenuHighlightItem[]
  menuVisualImageUrl: string
  aboutText: string
  aboutImageUrl: string
  galleryImageUrls: string[]
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
    hero_image?: WpMediaField
    usp_items?: Array<{ title?: string; description?: string }>
    menu_highlight_items?: Array<{ name?: string; price?: string }>
    menu_visual_image?: WpMediaField
    about_text?: string
    about_image?: WpMediaField
    gallery_images?: WpMediaField[]
    reservation_line_url?: string
    reservation_hotpepper_url?: string
    reservation_instagram_url?: string
  }
  content?: WpRenderedField
}

export type WpMediaField =
  | string
  | {
      url?: string
      source_url?: string
      sizes?: Record<string, { url?: string }>
    }
