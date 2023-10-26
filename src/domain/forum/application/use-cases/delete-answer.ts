import { Either, left, right } from '@/core/errors/either'

import { AnswerRepository } from '../repositories/answer-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)
    if (!answer) return left(new ResourceNotFoundError())
    if (answer.authorId.toString() !== authorId)
      return left(new NotAllowedError())
    await this.answerRepository.delete(answer)
    return right({})
  }
}
