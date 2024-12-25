import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, computed, hasMany, manyToMany, scope } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import { HttpContext } from '@adonisjs/core/http'
import Role from './role.js'
import Comment from './comment.js'
import datetimeSerializer from '#serializers/datetime_serializer'
import tables from '#config/tables'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

type Builder = ModelQueryBuilderContract<typeof Comment>

export default class User extends compose(BaseModel, AuthFinder) {
  public static table = tables.users.root

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true, serialize: datetimeSerializer })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: datetimeSerializer })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    table: tables.accessTokens.root,
    expiresIn: '1 day',
    prefix: 'xanova_',
  })

  @computed()
  get fullName() {
    return this?.firstName && this?.lastName ? `${this.firstName} ${this.lastName}` : null
  }

  @manyToMany(() => Role, {
    pivotTable: tables.users.roles,
    pivotForeignKey: 'user_id',
    pivotTimestamps: true,
  })
  declare roles: ManyToMany<typeof Role>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  // Scopes

  static scopeOnlyInitialInfo = scope((scopeQuery, extraColumns: string[] = []) => {
    const query = scopeQuery as Builder
    query.select('id', 'firstName', 'lastName', ...extraColumns)
  })

  // Helper methods

  static async hasAnyRole(user: User | null = null, authorizedRoles: string[]): Promise<boolean> {
    const ctx = HttpContext.get()
    const targetUser: User | undefined = user ?? ctx?.auth?.user
    await targetUser?.load('roles', (query) => query.whereIn('name', authorizedRoles))
    return Boolean(targetUser?.roles?.length)
  }
}
