import { QuestionRepository } from '../repositories/question-repository'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<void> {
    const question = await this.questionRepository.findById(questionId)
    if (!question) throw new Error('Question not found.')
    if (question.authorId.toString() !== authorId)
      throw new Error('Not allowed.')
    question.title = title
    question.content = content
    await this.questionRepository.save(question)
  }
}