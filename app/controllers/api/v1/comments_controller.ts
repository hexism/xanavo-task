import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { CommentService } from '#services/api/v1/comment_service'
import { createCommentValidator, updateCommentValidator } from '#validators/api/v1/comment'
import { queryStringValidator } from '#validators/query_string'

@inject()
export default class CommentsController {
  constructor(protected commentService: CommentService) {}
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const queryStrings = request.qs()
    await request.validateUsing(queryStringValidator, { data: queryStrings })
    const comments = await this.commentService.get()
    return response.json(comments)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const validated = await request.validateUsing(createCommentValidator)
    await this.commentService.create(validated)
    return response.json({
      message: 'Your comment created successfully.',
    })
  }

  /**
   * Show individual record
   */
  async show({ response, params, bouncer }: HttpContext) {
    const commentId = params?.id
    const comment = await this.commentService.findOrFail(commentId)
    await bouncer.with('CommentPolicy').authorize('view', comment)
    return response.json({
      data: comment,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, bouncer }: HttpContext) {
    const commentId = params?.id
    const comment = await this.commentService.findOrFail(commentId, false)
    await bouncer.with('CommentPolicy').authorize('update', comment)
    const validated = await request.validateUsing(updateCommentValidator)
    await this.commentService.update(comment, validated)
    return response.json({
      message: 'Your comment updated successfully.',
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, bouncer, response }: HttpContext) {
    const commentId = params?.id
    const comment = await this.commentService.findOrFail(commentId, false)
    await bouncer.with('CommentPolicy').authorize('delete', comment)
    await this.commentService.delete(comment)
    return response.json({
      message: 'Your comment deleted successfully.',
    })
  }
}
