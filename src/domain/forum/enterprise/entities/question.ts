import { differenceInDays } from 'date-fns'

import { Entity } from '@/core/entities/entity'
import { Id } from '@/core/entities/id'
import { Optional } from '@/core/types/optional'

import { Slug } from './value-objects/slug'

export interface QuestionProps {
  title: string
  content: string
  slug: Slug
  authorId: Id
  bestAnswerId?: Id
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  get slug() {
    return this.props.slug
  }

  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  set bestAnswerId(bestAnswerId: Id | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew() {
    return differenceInDays(new Date(), this.createdAt) <= 3
  }

  static create(props: Optional<QuestionProps, 'createdAt' | 'slug'>, id?: Id) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
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
