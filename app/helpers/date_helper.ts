export const calculateRelativeTime = (
  date: any,
  locale: string = 'en',
  options: object = { numeric: 'always' }
) => {
  const now: any = new Date()
  const diff: number = date - now
  const rtf: Intl.RelativeTimeFormat = new Intl.RelativeTimeFormat(locale, options)
  if (diff > 0) {
    const seconds: number = Math.round(diff / 1000)
    if (seconds < 60) {
      return rtf.format(seconds, 'second')
    }
    const minutes: number = Math.round(diff / (1000 * 60))
    if (minutes < 60) {
      return rtf.format(minutes, 'minute')
    }
    const hours: number = Math.round(diff / (1000 * 60 * 60))
    if (hours < 24) {
      return rtf.format(hours, 'hour')
    }
    const days: number = Math.round(diff / (1000 * 60 * 60 * 24))
    return rtf.format(days, 'day')
  } else {
    const seconds: number = Math.round(Math.abs(diff) / 1000)
    if (seconds < 60) {
      return rtf.format(-seconds, 'second')
    }
    const minutes: number = Math.round(Math.abs(diff) / (1000 * 60))
    if (minutes < 60) {
      return rtf.format(-minutes, 'minute')
    }
    const hours: number = Math.round(Math.abs(diff) / (1000 * 60 * 60))
    if (hours < 24) {
      return rtf.format(-hours, 'hour')
    }
    const days: number = Math.round(Math.abs(diff) / (1000 * 60 * 60 * 24))
    return rtf.format(-days, 'day')
  }
}
