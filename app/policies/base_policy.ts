import { BasePolicy as MainBasePolicy } from '@adonisjs/bouncer'
import User from '#models/user'
import { ADMIN_ROLE } from '#config/acl'

export default class BasePolicy extends MainBasePolicy {
  async before(user: User | null) {
    if (user && (await User?.hasAnyRole(user, [ADMIN_ROLE]))) return true
  }
}
