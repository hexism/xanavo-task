import router from '@adonisjs/core/services/router'
import authRoutes from './auth.js'
import userRoutes from './user.js'

const v1Routes = () => {
  router
    .group(() => {
      authRoutes()
      userRoutes()
    })
    .as('v1')
    .prefix('v1')
}

export default v1Routes
