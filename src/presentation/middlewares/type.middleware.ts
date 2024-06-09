import type { NextFunction, Request, Response } from 'express'

export class TypeMiddleware {
  static async validTypes(validTypes: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {}
  }
}
