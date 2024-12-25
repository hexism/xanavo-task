import { AuthService } from '#services/api/v1/auth_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class LogoutsController {
  constructor(protected authService: AuthService) {}

  async destroy({ response }: HttpContext) {
    await this.authService.logout()
    return response.json({
      message: 'You logged out successfully.',
    })
  }
}
