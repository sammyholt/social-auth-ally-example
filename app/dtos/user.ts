import { BaseModelDto } from '@adocasts.com/dto/base'
import User from '#models/user'

export default class UserDto extends BaseModelDto {
  declare id: number
  declare fullName: string | null
  declare email: string
  declare password: string | null
  declare createdAt: string
  declare updatedAt: string | null
  declare googleId: string | null
  declare discordId: string | null

  constructor(user?: User) {
    super()

    if (!user) return
    this.id = user.id
    this.fullName = user.fullName
    this.email = user.email
    this.password = user.password
    this.createdAt = user.createdAt.toISO()!
    this.updatedAt = user.updatedAt?.toISO()! ?? null
    this.googleId = user.googleId
    this.discordId = user.discordId
  }
}
