import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswerRepository: AnswerRepository = {
  create: async (_answer: Answer) => {
    'do nothing'
  },
}

it('should create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)
  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  })
  expect(answer.content).toEqual('Nova resposta')
})
