import { CategoryModel } from '../../data'
import { CreateCategoryDTO, CustomError, UserEntity, type PaginationDTO } from '../../domain'

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

  public async getAll(paginationDto: PaginationDTO) {
    const { page, limit } = paginationDto

    try {
      // const total = await CategoryModel.countDocuments()
      // const categories = await CategoryModel.find()
      //   .skip((page - 1) * limit)
      //   .limit(limit)

      const [total, categories] = await Promise.all([
        await CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ])

      return {
        page,
        limit,
        total,
        next: `/api/categories?page=${page + 1}&limit=${limit}`,
        prev: page - 1 > 0 ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
        categories: categories.map(({ name, available, id }) => ({
          name,
          available,
          id,
        })),
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
}
