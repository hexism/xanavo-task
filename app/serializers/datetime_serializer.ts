import { TDateTime } from '#contracts/datetime'
import { calculateRelativeTime } from '#helpers/date_helper'

export const datetimeOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'Asia/Tehran',
  numberingSystem: 'latn',
}

export default function datetimeSerializer(
  value: any,
  _attribute: string,
  _model: any
): object | null {
  if (value) {
    const intl = Intl
    const result: TDateTime = {
      default: value,
      formatted: null,
    }
    result.difference = calculateRelativeTime(value)
    result.formatted = intl.DateTimeFormat('en-US', datetimeOptions).format(value)
    return result
  }
  return null
}
