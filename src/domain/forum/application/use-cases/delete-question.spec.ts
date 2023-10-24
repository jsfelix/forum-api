import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'

import { Id } from '@/core/entities/id'
import { makeQuestion } from '@test/factories/make-question'

import { DeleteQuestionUseCase } from './delete-question'

let questionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('Delete Question Use Case', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionUseCase(questionRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new Id('author-1') },
      new Id('question-1'),
    )
    await questionRepository.create(newQuestion)
    await sut.execute({ authorId: 'author-1', questionId: 'question-1' })
    expect(questionRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question that does not exist', async () => {
    await expect(
      sut.execute({
        authorId: 'author-1',
        questionId: 'question-1',
      }),
    ).rejects.toThrow('Question not found.')
  })

  it('should not be able to delete a question if author is not the owner of question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new Id('author-1') },
      new Id('question-1'),
    )
    await questionRepository.create(newQuestion)
    await expect(
      sut.execute({ authorId: 'author-123', questionId: 'question-1' }),
    ).rejects.toThrow('Not allowed.')
  })
})
