import { Entity } from '@/core/entities/entity'
import { Id } from '@/core/entities/id'

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {
  get name() {
    return this.props.name
  }

  static create(props: StudentProps, id?: Id) {
    const question = new Student(props, id)
    return question
  }
}
