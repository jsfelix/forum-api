import { Id } from '@/core/entities/id'
import { makeAnswer } from '@test/factories/make-answer'
import { InMemoryAnswerRepository } from '@test/repositories/in-memory-answer-repository'

import { EditAnswerUseCase } from './edit-answer'

let answerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('Edit Answer Use Case', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(answerRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new Id('author-1') },
      new Id('answer-1'),
    )
    await answerRepository.create(newAnswer)
    await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
      content: 'New content',
    })
    expect(answerRepository.items[0]).toMatchObject({
      content: 'New content',
    })
  })

  it('should not be able to delete a answer that does not exist', async () => {
    await expect(
      sut.execute({
        authorId: 'author-1',
        answerId: 'answer-1',
        content: 'New content',
      }),
    ).rejects.toThrow('Answer not found.')
  })

  it('should not be able to delete a answer if author is not the owner of answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new Id('author-1') },
      new Id('answer-1'),
    )
    await answerRepository.create(newAnswer)
    await expect(
      sut.execute({
        authorId: 'author-123',
        answerId: 'answer-1',
        content: 'New content',
      }),
    ).rejects.toThrow('Not allowed.')
  })
})
