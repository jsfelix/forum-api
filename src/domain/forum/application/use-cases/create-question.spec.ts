import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'

import { CreateQuestionUseCase } from './create-question'

let questionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create Question Use Case', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(questionRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'New question',
      content: 'Question Content',
    })
    expect(question.id).toBeTruthy()
    expect(questionRepository.items[0].id).toEqual(question.id)
  })
})
