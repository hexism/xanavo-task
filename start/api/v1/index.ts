import router from '@adonisjs/core/services/router'
import authRoutes from './auth.js'
import userRoutes from './user.js'
import commentRoutes from './comments.js'

const v1Routes = () => {
  router
    .group(() => {
      authRoutes()
      userRoutes()
      commentRoutes()
    })
    .as('v1')
    .prefix('v1')
}

export default v1Routes
