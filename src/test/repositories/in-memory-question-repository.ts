import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    return (
      this.items.find(item => item.slug.value === Slug.create(slug).value) ??
      null
    )
  }
}
