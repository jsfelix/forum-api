import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionRepository } from '@/test/repositories/in-memory-question-repository'

import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

let questionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug Use Case', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(questionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({ slug: Slug.create('example-question') })
    await questionRepository.create(newQuestion)
    const { question } = await sut.execute({
      slug: 'example-question',
    })
    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
