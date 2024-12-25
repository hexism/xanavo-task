import { AccessToken } from '@adonisjs/auth/access_tokens'
import IAuthService from '#interfaces/api/v1/services/auth_service_interface'
import User from '#models/user'
import { TCredential } from '#contracts/auth'
import BaseService from '#services/base_service'

export class AuthService extends BaseService implements IAuthService {
  async validateCredential(credential: TCredential): Promise<AccessToken | null> {
    const { email, password } = credential
    const user = await User.verifyCredentials(email, password)
    if (user) return User.accessTokens.create(user)
    return null
  }

  async logout(): Promise<boolean> {
    const user = this?.ctx?.auth?.user
    const currentToken = user?.currentAccessToken
    if (user && currentToken) {
      await User.accessTokens.delete(user, currentToken?.identifier)
      return true
    }
    return false
  }
}
