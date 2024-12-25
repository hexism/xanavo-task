import { BaseSchema } from '@adonisjs/lucid/schema'
import tables from '#config/tables'

export default class extends BaseSchema {
  protected tableName = tables.acl.roles

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name', 32).unique().notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
