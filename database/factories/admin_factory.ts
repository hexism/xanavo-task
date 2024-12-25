import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import Role from '#models/role'
import { ADMIN_ROLE } from '#config/acl'

export const AdminFactory = factory
  .define(User, async () => {
    return {
      firstName: 'Sajjad',
      lastName: 'Nuri',
      email: 'admin@xanova.com',
      password: 'P@ssw0rd',
    }
  })
  .after('create', async (_factory, admin) => {
    const adminRole = await Role.findBy('name', ADMIN_ROLE)
    if (adminRole) await admin.related('roles').attach([adminRole.id])
  })
  .build()
