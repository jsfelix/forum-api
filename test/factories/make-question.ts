import { Id } from '@/core/entities/id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { faker } from '@faker-js/faker'

export function makeQuestion(override: Partial<QuestionProps> = {}, id?: Id) {
  const title = faker.lorem.sentence()
  return Question.create(
    {
      authorId: new Id(),
      title,
      slug: Slug.createFromText(title),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
}
