import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SocialAuthController {
  async redirect({ params, ally }: HttpContext) {
    const provider = params.provider
    return ally.use(provider).redirect()
  }

  async callback({ params, ally, auth, response, session }: HttpContext) {
    const provider = params.provider
    const socialProvider = ally.use(provider)
    if (socialProvider.accessDenied()) {
      session.flash('error', 'Access denied')
      return response.redirect().toPath('/')
    }
    if (socialProvider.hasError()) {
      session.flash('error', 'Unexpected error, please try again')
      return response.redirect().toPath('/')
    }

    const providerIdColumns: Record<string, string> = {
      google: 'googleId',
      discord: 'discordId',
    }
    const idColumn = providerIdColumns[provider]
    if (!idColumn) {
      session.flash('error', 'Unsupported provider')
      return response.redirect().toPath('/')
    }

    const providerUser = await socialProvider.user()
    let user = await User.findBy(idColumn, providerUser.id)
    if (user) {
      await auth.use('web').login(user)
      session.flash('success', `Successfully logged in with ${provider}!`)
      return response.redirect().toPath('/')
    }

    const existingUserByEmail = await User.findBy('email', providerUser.email)
    if (existingUserByEmail) {
      ;(existingUserByEmail as any)[idColumn] = providerUser.id
      await existingUserByEmail.save()

      await auth.use('web').login(existingUserByEmail)
      session.flash('success', `Successfully linked ${provider} to your existing account!`)
      return response.redirect().toPath('/')
    }

    user = await User.create({
      fullName: providerUser.name,
      email: providerUser.email,
      [idColumn]: providerUser.id,
    })

    await auth.use('web').login(user)
    session.flash('success', `Successfully created account and logged in with ${provider}!`)

    return response.redirect().toPath('/')
  }
}
