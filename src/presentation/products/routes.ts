import { Router } from 'express'
import { AuthMiddleware } from '../middlewares'
import { ProductService } from '../services'
import { ProductController } from './controller'

export class ProductRoutes {
  static get routes(): Router {
    const router = Router()

    const productService = new ProductService()

    const controller = new ProductController(productService)

    // Definir las rutas
    router.post('/', [AuthMiddleware.validateJWT], controller.createProduct)
    router.get('/', controller.getAll)

    return router
  }
}
