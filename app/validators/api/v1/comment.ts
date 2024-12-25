import tables from '#config/tables'
import { CommentStatuses } from '#models/comment'
import vine from '@vinejs/vine'

const statuses = Object.values(CommentStatuses)

export const createCommentValidator = vine.compile(
  vine.object({
    parentId: vine.number().exists({ table: tables.comments.root, column: 'id' }).optional(),
    body: vine.string().maxLength(255),
  })
)

export const updateCommentValidator = vine.compile(
  vine.object({
    body: vine.string().maxLength(255),
    status: vine.enum(statuses).optional(),
  })
)
