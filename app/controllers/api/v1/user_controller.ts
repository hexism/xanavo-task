import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async show({ response, auth }: HttpContext) {
    return response.json({
      data: auth.user,
    })
  }
}
