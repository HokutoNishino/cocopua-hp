import type { TopContent, WpTopResponse } from '@/features/top/types'

const fallbackTopContent: TopContent = {
  heroCatchMain: 'まつげからはじまる、わたしらしい美しさ。',
  heroCatchSub: 'ひとりひとりの目元に寄り添い、自然で上質な印象を引き出すアイデザインをご提案します。',
  heroBadgeText: '初回限定 10%OFF',
  uspItems: [
    { title: '丁寧なカウンセリング', description: '好みや生活に合わせて施術プランを提案します。' },
    { title: '高品質な商材', description: '目元への負担を抑え、持続力にもこだわります。' },
    { title: '落ち着く空間', description: 'リラックスできる静かな施術環境を整えています。' },
    { title: '理想の目元デザイン', description: 'ナチュラルから華やかまで幅広く対応します。' },
  ],
  menuHighlightItems: [
    { name: 'シングルラッシュ', price: '¥6,000〜' },
    { name: 'フラットラッシュ', price: '¥6,800〜' },
    { name: 'ボリュームラッシュ', price: '¥7,500〜' },
    { name: 'ラッシュリフト', price: '¥6,500〜' },
    { name: 'アイブロウスタイリング', price: '¥5,000〜' },
  ],
  aboutText:
    'Cocopuaは「目元の美しさ」を通して、日常に自信とときめきを届けるアイサロンです。丁寧な施術で、あなたらしい印象づくりをお手伝いします。',
  reservationLineUrl: '#',
  reservationHotpepperUrl: '#',
  reservationInstagramUrl: '#',
}

function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL?.replace(/\/$/, '')
}

function normalizeTopContent(data: WpTopResponse): TopContent {
  const acf = data.acf

  if (!acf) {
    return fallbackTopContent
  }

  return {
    heroCatchMain: acf.hero_catch_main ?? fallbackTopContent.heroCatchMain,
    heroCatchSub: acf.hero_catch_sub ?? fallbackTopContent.heroCatchSub,
    heroBadgeText: acf.hero_badge_text ?? fallbackTopContent.heroBadgeText,
    uspItems:
      acf.usp_items?.map((item) => ({
        title: item.title ?? '',
        description: item.description ?? '',
      })) ?? fallbackTopContent.uspItems,
    menuHighlightItems:
      acf.menu_highlight_items?.map((item) => ({
        name: item.name ?? '',
        price: item.price ?? '',
      })) ?? fallbackTopContent.menuHighlightItems,
    aboutText: acf.about_text ?? fallbackTopContent.aboutText,
    reservationLineUrl: acf.reservation_line_url ?? fallbackTopContent.reservationLineUrl,
    reservationHotpepperUrl:
      acf.reservation_hotpepper_url ?? fallbackTopContent.reservationHotpepperUrl,
    reservationInstagramUrl:
      acf.reservation_instagram_url ?? fallbackTopContent.reservationInstagramUrl,
  }
}

export async function fetchTopContent(): Promise<TopContent> {
  const baseUrl = getApiBaseUrl()

  if (!baseUrl) {
    return fallbackTopContent
  }

  try {
    const response = await fetch(`${baseUrl}/wp-json/cocopua/v1/top`)

    if (!response.ok) {
      throw new Error(`Failed to fetch top content: ${response.status}`)
    }

    const data = (await response.json()) as WpTopResponse
    return normalizeTopContent(data)
  } catch {
    return fallbackTopContent
  }
}
