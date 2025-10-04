/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const SharedTestController = () => import('#controllers/shared_test_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/health', async () => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
  }
})

// Shared function testing routes
router
  .group(() => {
    router.get('/greeting', [SharedTestController, 'greeting'])
    router.get('/user', [SharedTestController, 'user'])
    router.get('/validate-email', [SharedTestController, 'validateEmail'])
    router.get('/all', [SharedTestController, 'all'])
  })
  .prefix('/api/shared')
