/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import v1Routes from './api/v1/index.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    v1Routes()
  })
  .as('api')
