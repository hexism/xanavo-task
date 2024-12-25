import { CommentStatuses } from '#models/comment'

export type TCreateComment = {
  parentId?: number | null
  body: string
}

export type TUpdateComment = {
  body: string
  status?: CommentStatuses
}
