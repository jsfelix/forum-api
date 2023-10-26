import { Id } from '@/core/entities/id'
import { makeQuestion } from '@test/factories/make-question'
import { InMemoryQuestionRepository } from '@test/repositories/in-memory-question-repository'

import { EditQuestionUseCase } from './edit-question'

let questionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    questionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(questionRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new Id('author-1') },
      new Id('question-1'),
    )
    await questionRepository.create(newQuestion)
    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
      title: 'New title',
      content: 'New content',
    })
    expect(questionRepository.items[0]).toMatchObject({
      title: 'New title',
      content: 'New content',
    })
  })

  it('should not be able to delete a question that does not exist', async () => {
    await expect(
      sut.execute({
        authorId: 'author-1',
        questionId: 'question-1',
        title: 'New title',
        content: 'New content',
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
      sut.execute({
        authorId: 'author-123',
        questionId: 'question-1',
        title: 'New title',
        content: 'New content',
      }),
    ).rejects.toThrow('Not allowed.')
  })
})
