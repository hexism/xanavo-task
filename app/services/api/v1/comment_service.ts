import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import BaseService from '#services/base_service'
import ICommentService from '#interfaces/api/v1/services/comment_service_interface'
import Comment from '#models/comment'
import User from '#models/user'
import { TCreateComment, TUpdateComment } from '#contracts/comments'
import { USER_ROLE } from '#config/acl'

export class CommentService extends BaseService implements ICommentService {
  async get(): Promise<ModelPaginatorContract<Comment>> {
    const isUser = await User?.hasAnyRole(null, [USER_ROLE])
    return await Comment.query()
      .withScopes((scopes) => scopes.scopeWhereParentIdIsNull())
      .withScopes((scopes) => scopes.scopeOnlyApproved())
      .if(isUser, (query) => query.withScopes((scopes) => scopes.scopeOnlyApproved()))
      .preload('user', (query) => query.withScopes((scopes) => scopes.scopeOnlyInitialInfo()))
      .preload('replies', (query) => query.withScopes((scopes) => scopes.scopeOnlyApproved()))
      .orderBy(this.sortBy, this.sortOrder)
      .paginate(this.page, this.perPage)
  }

  async create(data: TCreateComment): Promise<Comment | undefined> {
    const user = this.getUser()
    return await user?.related('comments').create(data)
  }

  async findOrFail(id: number, loadRelations: boolean = true): Promise<Comment> {
    return await Comment.query()
      .where('id', id)
      .if(loadRelations, (query) =>
        query.preload('user', (query) =>
          query.withScopes((scopes) => scopes.scopeOnlyInitialInfo())
        )
      )
      .firstOrFail()
  }

  async update(comment: Comment, data: TUpdateComment): Promise<Comment> {
    const isUser = await User.hasAnyRole(null, [USER_ROLE])
    if (isUser && data?.status) delete data.status
    return await comment.merge(data).save()
  }

  async delete(comment: Comment): Promise<void> {
    return await comment.delete()
  }
}
