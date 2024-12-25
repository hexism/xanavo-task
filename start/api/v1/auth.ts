import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const LoginController = () => import('#controllers/api/v1/auth/login_controller')
const LogoutController = () => import('#controllers/api/v1/auth/logout_controller')

const authRoutes = () => {
  router
    .group(() => {
      router.post('/login', [LoginController, 'store']).as('login').use(middleware.guest())
      router.delete('/logout', [LogoutController, 'destroy']).as('logout').use(middleware.auth())
    })
    .as('auth')
    .prefix('auth')
}

export default authRoutes
