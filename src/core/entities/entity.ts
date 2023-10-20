import { Id } from './id'

export abstract class Entity<Props> {
  private _id: Id

  protected props: Props

  protected constructor(props: Props, id?: Id) {
    this._id = id ?? new Id()
    this.props = props
  }

  get id() {
    return this._id
  }
}
