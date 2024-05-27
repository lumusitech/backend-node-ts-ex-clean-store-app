import type { Request, Response } from 'express'
import type { UploadedFile } from 'express-fileupload' // TODO: add adapters into config
import { CustomError } from '../../domain'
import type { FileUploadService } from '../services/file-upload.service'

export class FileUploadController {
  // DI
  constructor(public readonly fileUploadService: FileUploadService) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`) // Better with a Logger like winston

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  uploadFile = (req: Request, res: Response) => {
    const files = req.files
    const type = req.params.type
    // We can set this validTypes into env vars
    const validTypes = ['users', 'products', 'categories']
    if (!validTypes.includes(type))
      return res.status(400).json({ error: `Invalid type: ${type}, valid ones: ${validTypes}` })

    // Pass to a middleware
    // if (!files || Object.keys(files).length === 0) {
    //   return res.status(400).json({ error: 'No files were selected' })
    // }

    const file = req.body.files.at(0) as UploadedFile

    this.fileUploadService
      .uploadSingle(file, `uploads/${type}`)
      .then(uploaded => res.json(uploaded))
      .catch(error => this.handleError(res, error))
  }

  uploadMultipleFiles = (req: Request, res: Response) => {
    const type = req.params.type
    // We can set this validTypes into env vars
    const validTypes = ['users', 'products', 'categories']
    if (!validTypes.includes(type))
      return res.status(400).json({ error: `Invalid type: ${type}, valid ones: ${validTypes}` })

    // Pass to a middleware
    // if (!files || Object.keys(files).length === 0) {
    //   return res.status(400).json({ error: 'No files were selected' })
    // }

    const files = req.body.files as UploadedFile[]

    this.fileUploadService
      .uploadMultiple(files, `uploads/${type}`)
      .then(uploaded => res.json(uploaded))
      .catch(error => this.handleError(res, error))
  }
}
