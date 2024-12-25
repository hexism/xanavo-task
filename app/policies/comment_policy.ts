import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import BasePolicy from './base_policy.js'
import User from '#models/user'
import Comment, { CommentStatuses } from '#models/comment'

export default class CommentPolicy extends BasePolicy {
  view(user: User, comment: Comment): AuthorizerResponse {
    return user.id === comment.userId && comment.status === CommentStatuses.APPROVED
  }

  update(user: User, comment: Comment): AuthorizerResponse {
    return user.id === comment.userId && comment.status === CommentStatuses.APPROVED
  }

  delete(user: User, comment: Comment): AuthorizerResponse {
    return user.id === comment.userId && comment.status === CommentStatuses.APPROVED
  }
}
