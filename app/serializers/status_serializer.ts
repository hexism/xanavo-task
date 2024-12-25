import stringHelpers from '@adonisjs/core/helpers/string'

export default function statusSerializer(
  value: any,
  _attribute: string,
  _model: any
): object | null {
  if (value) {
    return {
      value,
      label: stringHelpers.capitalCase(value),
    }
  }
  return null
}
