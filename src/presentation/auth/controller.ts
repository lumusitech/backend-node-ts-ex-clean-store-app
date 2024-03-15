import type { Request, Response } from 'express'
import { CustomError, LoginUserDTO, RegisterUserDTO } from '../../domain'
import type { AuthService } from '../services'

export class AuthController {
  // DI
  constructor(public readonly authService: AuthService) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`) // Better with a Logger like winston

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDTO.create(req.body)

    if (error) return res.status(400).json({ error })

    this.authService
      .loginUser(loginUserDto!)
      .then(user => res.json(user))
      .catch(error => this.handleError(res, error))
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDTO.create(req.body)

    if (error) return res.status(400).json({ error })

    this.authService
      .registerUser(registerUserDto!)
      .then(user => res.json(user))
      .catch(error => this.handleError(res, error))
  }

  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params

    this.authService
      .validateEmail(token)
      .then(() =>
        res.json({ msg: 'email was successfully validated, please close this tab and login' }),
      )
      .catch(error => this.handleError(res, error))
  }
}
