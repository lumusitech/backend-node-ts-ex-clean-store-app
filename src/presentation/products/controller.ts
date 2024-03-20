import type { Request, Response } from 'express'
import { CustomError, PaginationDTO } from '../../domain'
import { CreateProductDTO } from '../../domain/dtos/product/create-product.dto'
import type { ProductService } from '../services/product.service'

export class ProductController {
  // DI
  constructor(public readonly productService: ProductService) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`) // Better with a Logger like winston

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createProduct = (req: Request, res: Response) => {
    const [error, createProductDTO] = CreateProductDTO.create({
      ...req.body,
      user: req.body.user.id,
    })
    if (error) res.status(400).json({ error })

    this.productService
      .createProduct(createProductDTO!)
      .then(product => res.status(201).json(product))
      .catch(error => this.handleError(res, error))
  }

  getAll = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query

    const [error, paginationDto] = PaginationDTO.create(+page, +limit)
    if (error) res.status(400).json({ error })

    this.productService
      .getAll(paginationDto!)
      .then(data => res.status(200).json(data))
      .catch(error => this.handleError(res, error))
  }
}
