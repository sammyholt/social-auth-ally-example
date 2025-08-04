/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import SocialAuthController from '#controllers/social_auth_controller'
import router from '@adonisjs/core/services/router'
import type { HttpContext } from '@adonisjs/core/http'
import { middleware } from '#start/kernel'

router.on('/').renderInertia('landing')
router.on('/login').renderInertia('login').use(middleware.guest())
router.on('/dashboard').renderInertia('dashboard/home').use(middleware.auth())

router.get('/:provider/redirect', [SocialAuthController, 'redirect']).as('social.redirect')
router.get('/:provider/callback', [SocialAuthController, 'callback']).as('social.callback')

// Logout route
router
  .post('/logout', async ({ auth, response, session }: HttpContext) => {
    await auth.use('web').logout()
    session.flash('success', 'Successfully logged out')
    return response.redirect().toPath('/')
  })
  .as('logout')
