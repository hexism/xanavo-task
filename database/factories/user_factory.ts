import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { CommentFactory } from './comment_factory.js'
import Role from '#models/role'
import { USER_ROLE } from '#config/acl'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: 'password',
    }
  })
  .relation('comments', () => CommentFactory)
  .after('create', async (_factory, user) => {
    const userRole = await Role.findBy('name', USER_ROLE)
    if (userRole) await user.related('roles').attach([userRole.id])
  })
  .build()
