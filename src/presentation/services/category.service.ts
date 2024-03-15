import { CategoryModel } from '../../data'
import { CreateCategoryDTO, CustomError, UserEntity } from '../../domain'

export class CategoryService {
  // DI
  constructor() {}

  public async createCategory(createCategoryDto: CreateCategoryDTO, user: UserEntity) {
    const category = await CategoryModel.findOne({ name: createCategoryDto.name })

    if (category) throw CustomError.badRequest('Category already exists')

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      })

      await category.save()

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  public async getAll() {}
}
