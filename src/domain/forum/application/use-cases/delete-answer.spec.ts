import { Id } from '@/core/entities/id'
import { makeAnswer } from '@test/factories/make-answer'
import { InMemoryAnswerRepository } from '@test/repositories/in-memory-answer-repository'

import { DeleteAnswerUseCase } from './delete-answer'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let answerRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer Use Case', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(answerRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new Id('author-1') },
      new Id('answer-1'),
    )
    await answerRepository.create(newAnswer)
    await sut.execute({ authorId: 'author-1', answerId: 'answer-1' })
    expect(answerRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer that does not exist', async () => {
    const result = await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to delete a answer if author is not the owner of answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new Id('author-1') },
      new Id('answer-1'),
    )
    await answerRepository.create(newAnswer)
    const result = await sut.execute({
      authorId: 'author-123',
      answerId: 'answer-1',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
