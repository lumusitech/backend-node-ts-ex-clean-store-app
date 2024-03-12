import type { Request, Response } from 'express'

export class AuthController {
  // DI
  constructor() {}

  loginUser = (req: Request, res: Response) => {
    res.json({ ok: true, message: 'LOGIN' })
  }

  registerUser = (req: Request, res: Response) => {
    res.json({ ok: true, message: 'REGISTER' })
  }

  validateEmail = (req: Request, res: Response) => {
    res.json({ ok: true, message: 'VALIDATE EMAIL' })
  }
}
