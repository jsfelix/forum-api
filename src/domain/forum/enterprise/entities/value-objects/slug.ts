export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  /**
   * Receives a *string* and normalize it as a *slug*.
   *
   * @example
   * ```ts
   * const slug = Slug.createFromText('An example title')
   * console.log(slug.value) // an-example-title
   * ```
   *
   * @param text a text to be normalized to slug
   *
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/, '')
    return new Slug(slugText)
  }
}
