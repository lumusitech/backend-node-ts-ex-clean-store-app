import type { Request, Response } from 'express'
import { CustomError } from '../../domain'
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
    return res.json({ message: 'createCategory' })
  }

  getAll = (req: Request, res: Response) => {
    return res.json({ message: 'getAll categories' })
  }
}
