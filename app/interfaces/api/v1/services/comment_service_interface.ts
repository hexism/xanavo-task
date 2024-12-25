import { TCreateComment, TUpdateComment } from '#contracts/comments'
import Comment from '#models/comment'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default interface ICommentService {
  get(): Promise<ModelPaginatorContract<Comment>>

  create(data: TCreateComment): Promise<Comment | undefined>

  findOrFail(id: number): Promise<Comment>

  update(comment: Comment, data: TUpdateComment): Promise<Comment>

  delete(comment: Comment): Promise<void>
}
