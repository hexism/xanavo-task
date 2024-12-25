import { BaseSchema } from '@adonisjs/lucid/schema'
import { CommentStatuses } from '#models/comment'
import tables from '#config/tables'

export default class extends BaseSchema {
  protected tableName = tables.comments.root

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
        .integer('parent_id')
        .unsigned()
        .references(`${tables.comments.root}.id`)
        .onDelete('cascade')
      table
        .enum('status', Object.values(CommentStatuses))
        .defaultTo(CommentStatuses.DISAPPROVED)
        .index()
        .notNullable()
      table.string('body').index()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
