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

    if (!files || Object.keys.length === 0) {
      return res.status(400).json({ error: 'No files were selected' })
    }

    const file = files.file as UploadedFile

    this.fileUploadService
      .uploadSingle(file)
      .then(() => res.json({ message: 'uploaded file' }))
      .catch(error => this.handleError(res, error))
  }

  uploadMultipleFiles = (req: Request, res: Response) => {
    res.json({ message: 'upload multiple files' })
  }
}
