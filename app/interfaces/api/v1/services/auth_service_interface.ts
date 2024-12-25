import { TCredential } from '#contracts/auth'
import { AccessToken } from '@adonisjs/auth/access_tokens'

export default interface IAuthService {
  validateCredential(credential: TCredential): Promise<AccessToken | null>
  logout(): Promise<boolean>
}
