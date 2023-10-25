import { AnswerRepository } from '../repositories/answer-repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<void> {
    const answer = await this.answerRepository.findById(answerId)
    if (!answer) throw new Error('Answer not found.')
    if (answer.authorId.toString() !== authorId) throw new Error('Not allowed.')
    await this.answerRepository.delete(answer)
  }
}
