import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { errors as coreErrors } from '@adonisjs/core'
import { errors as lucidErrors } from '@adonisjs/lucid'
import { errors as authErrors } from '@adonisjs/auth'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: any, ctx: HttpContext) {
    if (error instanceof authErrors.E_INVALID_CREDENTIALS)
      return ctx.response.unprocessableEntity({
        message: 'Your credential is not valid',
      })
    if (error instanceof authErrors.E_UNAUTHORIZED_ACCESS)
      return ctx.response.unauthorized({
        message: 'Please login to your account.',
      })
    if (error instanceof lucidErrors.E_ROW_NOT_FOUND)
      return ctx.response.notFound({
        message: 'Resource not found.',
      })
    if (error instanceof coreErrors.E_ROUTE_NOT_FOUND)
      return ctx.response.notFound({
        message: 'Route not found.',
      })
    if (error?.status >= 500)
      return ctx.response.serviceUnavailable({
        message: 'Service unavailable, Please type again later.',
        ...(app.inDev && error),
      })
    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
