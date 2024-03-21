import { Router } from 'express'
import { FileUploadService } from '../services/file-upload.service'
import { FileUploadController } from './controller'

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router()

    const uploadFilesService = new FileUploadService()

    const controller = new FileUploadController(uploadFilesService)

    // Definir las rutas
    router.post('/single/:type', controller.uploadFile)
    router.post('/multiple/:type', controller.uploadMultipleFiles)

    return router
  }
}
