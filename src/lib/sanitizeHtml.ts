import DOMPurify from 'dompurify'
import type { Config } from 'dompurify'

const sanitizeConfig: Config = {
  ALLOWED_TAGS: [
    'p',
    'br',
    'strong',
    'em',
    'ul',
    'ol',
    'li',
    'a',
    'h2',
    'h3',
    'blockquote',
    'span',
  ],
  ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
}

export function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, sanitizeConfig)
}
