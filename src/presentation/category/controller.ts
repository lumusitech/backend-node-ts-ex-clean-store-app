import type { Request, Response } from 'express'
import { CreateCategoryDTO, CustomError, PaginationDTO } from '../../domain'
import type { CategoryService } from '../services/category.service'

export class CategoryController {
  // DI
  constructor(public readonly categoryService: CategoryService) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`) // Better with a Logger like winston

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDTO] = CreateCategoryDTO.create(req.body)

    if (error) res.status(400).json({ error })

    const { user } = req.body

    this.categoryService
      .createCategory(createCategoryDTO!, user)
      .then(category => res.status(201).json({ category }))
      .catch(error => this.handleError(res, error))
  }

  getAll = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query

    const [error, paginationDto] = PaginationDTO.create(+page, +limit)

    if (error) res.status(400).json({ error })

    this.categoryService
      .getAll(paginationDto!)
      .then(categories => res.json(categories))
      .catch(error => this.handleError(res, error))
  }
}
