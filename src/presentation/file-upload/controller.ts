import type { Request, Response } from 'express'
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
    res.json({ message: 'upload file' })
  }

  uploadMultipleFiles = (req: Request, res: Response) => {
    res.json({ message: 'upload multiple files' })
  }
}
