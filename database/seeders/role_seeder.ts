import { ROLES } from '#config/acl'
import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    for await (const name of ROLES) {
      await Role.create({ name })
    }
  }
}
