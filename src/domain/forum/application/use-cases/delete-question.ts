import { QuestionRepository } from '../repositories/question-repository'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<void> {
    const question = await this.questionRepository.findById(questionId)
    if (!question) throw new Error('Question not found.')
    if (question.authorId.toString() !== authorId)
      throw new Error('Not allowed.')
    await this.questionRepository.delete(question)
  }
}
