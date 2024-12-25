import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class GuestMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (ctx?.auth?.isAuthenticated)
      return ctx?.response.forbidden({
        message: 'Just guest users can access to this resource.',
      })
    await next()
  }
}
