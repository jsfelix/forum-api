import { Id } from '@/core/entities/id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'
import { faker } from '@faker-js/faker'

export function makeAnswer(override: Partial<AnswerProps> = {}, id?: Id) {
  return Answer.create(
    {
      authorId: new Id(),
      questionId: new Id(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
}
