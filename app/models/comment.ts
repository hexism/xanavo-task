import { BaseModel, beforeUpdate, belongsTo, column, hasMany, scope } from '@adonisjs/lucid/orm'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from './user.js'
import tables from '#config/tables'
import statusSerializer from '#serializers/status_serializer'
import datetimeSerializer from '#serializers/datetime_serializer'
import { USER_ROLE } from '#config/acl'

type Builder = ModelQueryBuilderContract<typeof Comment>

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

  @column({ serializeAs: null })
  declare parentId: number | null

  @column({ serialize: statusSerializer })
  declare status: CommentStatuses

  @column()
  declare body: string

  @column.dateTime({ autoCreate: true, serialize: datetimeSerializer })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: datetimeSerializer })
  declare updatedAt: DateTime

  // Hooks
  @beforeUpdate()
  static async onBeforeUpdate(comment: Comment) {
    const isUser = await User.hasAnyRole(null, [USER_ROLE])
    if (isUser && comment?.$dirty?.body) comment.status = CommentStatuses.DISAPPROVED
  }

  // Relations

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Comment, {
    foreignKey: 'parentId',
    localKey: 'id',
    onQuery(query) {
      return query.preload('replies', (query) =>
        query.where((builder) => builder.where('status', CommentStatuses.APPROVED))
      )
    },
  })
  declare replies: HasMany<typeof Comment>

  // Scopes

  static scopeWhereParentIdIsNull = scope((query: Builder) => query.whereNull('parentId'))

  static scopeOnlyApproved = scope((query: Builder) =>
    query.where('status', CommentStatuses.APPROVED)
  )
}
