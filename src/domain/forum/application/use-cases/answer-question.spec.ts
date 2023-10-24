import { InMemoryAnswerRepository } from '@test/repositories/in-memory-answer-repository'

import { AnswerQuestionUseCase } from './answer-question'

let answerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create Question Use Case', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(answerRepository)
  })

  it('should be able to answer a question', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '2',
      content: 'Answer Content',
    })
    expect(answer.id).toBeTruthy()
    expect(answerRepository.items[0].id).toEqual(answer.id)
  })
})
