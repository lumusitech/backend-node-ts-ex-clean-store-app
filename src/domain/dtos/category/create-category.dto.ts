export class CreateCategoryDTO {
  private constructor(public readonly name: string, public readonly available: boolean = false) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDTO?] {
    const { name, available = false } = object

    let availableBoolean = available

    if (!name) return ['Missing name']

    if (typeof available !== 'boolean') {
      availableBoolean = available === 'true'
    }

    return [undefined, new CreateCategoryDTO(name, availableBoolean)]
  }
}
