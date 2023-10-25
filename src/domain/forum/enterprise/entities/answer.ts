import { Entity } from '@/core/entities/entity'
import { Id } from '@/core/entities/id'
import { Optional } from '@/core/types/optional'

export interface AnswerProps {
  content: string
  authorId: Id
  questionId: Id
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.content = content
    this.touch()
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: Id) {
    const question = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return question
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
