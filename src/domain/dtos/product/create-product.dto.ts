import { Validators } from '../../../config'

export class CreateProductDTO {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly user: string, // ID
    public readonly category: string, // ID
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDTO?] {
    const { name, available = false, price, user, category } = object

    if (!name) return ['Missing name']
    if (!price) return ['Missing price']
    if (!user) return ['Missing user']
    if (!Validators.isMongoId(user)) return ['Invalid user ID']
    if (!category) return ['Missing category']
    if (!Validators.isMongoId(category)) return ['Invalid category ID']

    return [undefined, new CreateProductDTO(name, !!available, price, user, category)]
  }
}
