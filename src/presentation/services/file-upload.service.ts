import { UploadedFile } from 'express-fileupload' // TODO: add adapters
import fs from 'fs'
import path from 'path'
import { UUIDAdapter } from '../../config'
import { CustomError } from '../../domain'

export class FileUploadService {
  // DI
  constructor(private readonly uuid = UUIDAdapter.v4) {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }
  }

  async uploadSingle(
    file: UploadedFile,
    folder = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
  ) {
    try {
      const fileExtension = file.mimetype.split('/').at(1) ?? ''
      if (!validExtensions.includes(fileExtension))
        throw CustomError.badRequest(
          `Invalid file extension: ${fileExtension}, valid ones: ${validExtensions}`,
        )

      const destination = path.resolve(__dirname, '../../../', folder)
      this.checkFolder(destination)

      const uniqueFileName = `${this.uuid()}.${fileExtension}`

      file.mv(`${destination}/${uniqueFileName}`)

      return { fileName: uniqueFileName }
    } catch (error) {
      console.log({ error }) // Better with a logger like winston
      throw error
    }
  }

  async uploadMultiple(
    files: UploadedFile[],
    folder = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
  ) {
    const filesName = await Promise.all(
      files.map(file => this.uploadSingle(file, folder, validExtensions)),
    )
    console.log(filesName)

    return filesName
  }
}
