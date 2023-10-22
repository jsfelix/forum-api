import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionRepository = {
  create: async (_question: Question) => {
    'do nothing'
  },
}

test('create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)
  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'New question',
    content: 'Question Content',
  })
  expect(question.id).toBeTruthy()
})
