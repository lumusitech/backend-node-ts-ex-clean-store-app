import { ProductModel } from '../../data'
import { CreateProductDTO, CustomError, PaginationDTO } from '../../domain'

export class ProductService {
  // DI
  constructor() {}

  public async createProduct(createProductDto: CreateProductDTO) {
    const productExists = await ProductModel.findOne({ name: createProductDto.name })

    if (productExists) throw CustomError.badRequest('Product already exists')

    try {
      const product = new ProductModel(createProductDto)
      await product.save()

      return product
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  public async getAll(paginationDto: PaginationDTO) {
    const { page, limit } = paginationDto

    try {
      const [total, products] = await Promise.all([
        await ProductModel.countDocuments(),
        await ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('user')
          .populate('category'),
      ])

      return {
        total,
        page,
        next: `/api/products?page=${page + 1}`,
        prev: page - 1 >= 1 ? `/api/products?page=${page - 1}` : null,
        products,
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
}
