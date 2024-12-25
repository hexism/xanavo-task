import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import tables from '#config/tables'

export default class Role extends BaseModel {
  public static table = tables.acl.roles

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
