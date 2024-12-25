import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }

  async run() {
    await this.runSeeder(await import('../role_seeder.js'))
    await this.runSeeder(await import('../admin_seeder.js'))
    await this.runSeeder(await import('../user_seeder.js'))
  }
}
