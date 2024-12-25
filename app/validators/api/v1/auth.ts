import vine from '@vinejs/vine'
import tables from '#config/tables'

export const loginValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .exists({ table: tables.users.root, column: 'email' })
      .maxLength(255),
    password: vine.string().minLength(8).maxLength(32),
  })
)
