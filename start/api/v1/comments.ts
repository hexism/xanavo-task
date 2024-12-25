import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const CommentsController = () => import('#controllers/api/v1/comments_controller')

const commentRoutes = () => {
  router
    .resource('comments', CommentsController)
    .apiOnly()
    .as('comments')
    .middleware('*', middleware.auth())
}

export default commentRoutes
