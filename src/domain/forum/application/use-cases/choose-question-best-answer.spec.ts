import { makeAnswer } from '@test/factories/make-answer'
import { makeQuestion } from '@test/factories/make-question'
import { InMemoryAnswerRepository } from '@test/repositories/in-memory-answer-repository'
import { InMemoryQuestionRepository } from '@test/repositories/in-memory-question-repository'

import { Answer } from '../../enterprise/entities/answer'
import { Question } from '../../enterprise/entities/question'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'

let questionRepository: InMemoryQuestionRepository
let answerRepository: InMemoryAnswerRepository
let sut: ChooseQuestionBestAnswerUseCase
let question: Question
let answer: Answer

describe('Choose Question Best Answer Use Case', () => {
  beforeEach(async () => {
    questionRepository = new InMemoryQuestionRepository()
    answerRepository = new InMemoryAnswerRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      questionRepository,
      answerRepository,
    )
    question = makeQuestion()
    answer = makeAnswer({ questionId: question.id })
    await questionRepository.create(question)
    await answerRepository.create(answer)
  })

  it('should be able to choose the question best answer', async () => {
    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })
    expect(questionRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose another user question best answer', async () => {
    await expect(
      sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author-2',
      }),
    ).rejects.toThrow('Not allowed.')
  })
})
