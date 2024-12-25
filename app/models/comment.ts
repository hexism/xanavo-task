import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import tables from '#config/tables'

export enum CommentStatuses {
  APPROVED = 'approved',
  DISAPPROVED = 'disapproved',
}

export default class Comment extends BaseModel {
  public static table = tables.comments.root

  @column({ isPrimary: true })
  declare id: number

  @column({ serializeAs: null })
  declare userId: number

  @column()
  declare status: CommentStatuses

  @column()
  declare body: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
