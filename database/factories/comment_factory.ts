import factory from '@adonisjs/lucid/factories'
import Comment, { CommentStatuses } from '#models/comment'
import { generateRandomIndex } from '#helpers/array_helper'

const statuses = Object.values(CommentStatuses)

export const CommentFactory = factory
  .define(Comment, async ({ faker }) => {
    const randomStatus = statuses[generateRandomIndex(statuses)]
    return {
      body: faker.lorem.words(),
      status: randomStatus,
    }
  })
  .build()
