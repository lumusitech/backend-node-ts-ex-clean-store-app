import { Router } from 'express'
import { FileUploadMiddleware, TypeMiddleware } from '../middlewares'
import { FileUploadService } from '../services'
import { FileUploadController } from './controller'

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router()

    const controller = new FileUploadController(new FileUploadService())

    // Middleware that will apply to all routes
    router.use(FileUploadMiddleware.containsFiles)
    router.use(TypeMiddleware.validTypes(['users', 'products', 'categories']))

    // Definir las rutas
    router.post('/single/:type', controller.uploadFile)
    router.post('/multiple/:type', controller.uploadMultipleFiles)

    return router
  }
}
