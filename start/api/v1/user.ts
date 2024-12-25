import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const UserController = () => import('#controllers/api/v1/user_controller')

const userRoutes = () => {
  router
    .group(() => {
      router.get('/', [UserController, 'show']).as('show')
    })
    .as('user')
    .prefix('user')
    .middleware(middleware.auth())
}

export default userRoutes
