export class FileUploadService {
  // DI
  constructor() {}

  private checkFolder(folderPath: string) {
    throw new Error('not implemented')
  }

  uploadSingle(
    file: string,
    folder = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
  ) {}

  uploadMultiple(
    file: string[],
    folder = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
  ) {}
}
