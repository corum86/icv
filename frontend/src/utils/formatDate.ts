const MONTH_YEAR_DOT = /^(\d{2})\.(\d{4})$/
const YEAR = /^\d{4}$/

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

/** "04.2019 – Heute"; collapses to a single date when there is no distinct end. */
export function formatDateRange(start: string, end: string | undefined, locale: string): string {
  if (!end || end === start) {
    return formatMonthYear(start, locale)
  }

  return `${formatMonthYear(start, locale)} – ${formatMonthYear(end, locale)}`
}

/** An end value that is not a date ("Heute", "Present") marks an ongoing position. */
export function isOngoing(end: string | undefined): boolean {
  return !!end && !MONTH_YEAR_DOT.test(end) && !YEAR.test(end)
}

/** Full years elapsed since a "mm.yyyy" date, or undefined if it cannot be parsed. */
export function yearsSince(monthYear: string, now: Date = new Date()): number | undefined {
  const match = MONTH_YEAR_DOT.exec(monthYear)
  if (!match) {
    return undefined
  }

  const months =
    now.getFullYear() * 12 + now.getMonth() - (Number(match[2]) * 12 + Number(match[1]) - 1)
  return Math.floor(months / 12)
}
