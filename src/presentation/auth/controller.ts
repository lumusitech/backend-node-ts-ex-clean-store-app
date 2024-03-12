import type { Request, Response } from 'express'
import { RegisterUserDTO } from '../../domain'
import type { AuthService } from '../services'

export class AuthController {
  // DI
  constructor(public readonly authService: AuthService) {}

  loginUser = (req: Request, res: Response) => {
    res.json({ ok: true, message: 'LOGIN' })
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDTO.create(req.body)

    if (error) return res.status(400).json({ error })

    this.authService.registerUser(registerUserDto!).then(user => res.json(user))
  }

  validateEmail = (req: Request, res: Response) => {
    res.json({ ok: true, message: 'VALIDATE EMAIL' })
  }
}
