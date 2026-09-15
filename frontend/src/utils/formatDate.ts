const MONTH_YEAR_DOT = /^(\d{2})\.(\d{4})$/

/**
 * Reformats stored "mm.yyyy" dates per locale (de: "mm.yyyy", en: "mm/yyyy");
 * leaves anything else (years, "Heute"/"Present") untouched.
 */
export function formatMonthYear(value: string, locale: string): string {
  const match = MONTH_YEAR_DOT.exec(value)
  if (!match) {
    return value
  }

  const separator = locale === 'en' ? '/' : '.'
  return `${match[1]}${separator}${match[2]}`
}
