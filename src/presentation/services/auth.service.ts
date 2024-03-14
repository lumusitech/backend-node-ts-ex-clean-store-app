import { JWTAdapter, bcryptAdapter, envs } from '../../config'
import { UserModel } from '../../data'
import { CustomError, RegisterUserDTO, UserEntity, type LoginUserDTO } from '../../domain'
import type { EmailService, SendMailOptions } from './email.service'

export class AuthService {
  // DI
  constructor(private readonly emailService: EmailService) {}

  public async registerUser(registerUserDTO: RegisterUserDTO) {
    const existsUser = await UserModel.findOne({
      email: registerUserDTO.email,
    })

    if (existsUser) throw CustomError.badRequest('Email already exists')

    try {
      const user = new UserModel(registerUserDTO)

      user.password = bcryptAdapter.hash(registerUserDTO.password)

      await user.save()

      // Email confirmation
      await this.SendEmailValidationLink(user.email)

      const { password, ...rest } = UserEntity.fromObject(user)

      // TODO: JWT token -> to keep user session
      const token = await JWTAdapter.generateToken({ id: user.id })
      if (!token) throw CustomError.internalServer('Failed to generate token')

      // TODO: send confirmation email

      return { user: { ...rest }, token }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  public async loginUser(loginUserDto: LoginUserDTO) {
    try {
      const user = await UserModel.findOne({ email: loginUserDto.email })

      if (!user) throw CustomError.badRequest('Email not exists')

      const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password)

      if (!isMatching) throw CustomError.badRequest('Invalid credentials')

      // TODO: JWT token -> to keep user session
      const token = await JWTAdapter.generateToken({ id: user.id })
      if (!token) throw CustomError.internalServer('Failed to generate token')

      const { password, ...rest } = UserEntity.fromObject(user)

      return { user: { ...rest }, token }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  private SendEmailValidationLink = async (email: string) => {
    const token = await JWTAdapter.generateToken({ email })
    if (!token) throw CustomError.internalServer('Failed to generate token')

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`
    const html = `
    h1>Validate your email</h1>
    <p>Click on the following link to validate your email:</p>
    <a href="${link}">Validate your email: ${email}</a>
    `

    const options: SendMailOptions = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html,
    }

    const isSent = await this.emailService.sendEmail(options)
    if (!isSent) throw CustomError.internalServer('Failed to send email')

    return true
  }
}
