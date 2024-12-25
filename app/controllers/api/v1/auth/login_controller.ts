import { AuthService } from '#services/api/v1/auth_service'
import { loginValidator } from '#validators/api/v1/auth'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class LoginController {
  constructor(protected authService: AuthService) {}

  async store({ request, response }: HttpContext) {
    const validated = await request.validateUsing(loginValidator)
    const result = await this.authService.validateCredential(validated)
    if (result instanceof AccessToken)
      return response.json({
        message: 'You logged in to your account.',
        data: result,
      })
    else
      return response.unauthorized({
        message: 'Your credential is not valid.',
      })
  }
}
