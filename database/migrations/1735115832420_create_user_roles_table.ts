import tables from '#config/tables'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = tables.users.roles

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references(`${tables.users.root}.id`)
        .onDelete('cascade')
        .notNullable()
      table
        .integer('role_id')
        .unsigned()
        .references(`${tables.acl.roles}.id`)
        .onDelete('cascade')
        .notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
