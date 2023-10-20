import { Id } from '@/core/entities/id'

import { Answer } from '../entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      questionId: new Id(questionId),
      authorId: new Id(instructorId),
    })
    return answer
  }
}
