import vine from '@vinejs/vine'

export const queryStringValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    perPage: vine.number().min(5).max(50).optional(),
    count: vine.number().min(1).max(50).optional(),
    sortBy: vine.string().in(['createdAt', 'updatedAt', 'expiresAt']).optional(),
    sortOrder: vine.string().in(['asc', 'desc']).optional(),
    search: vine.string().maxLength(64).optional(),
  })
)
