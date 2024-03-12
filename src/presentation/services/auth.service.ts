import { JWTAdapter, bcryptAdapter } from '../../config'
import { UserModel } from '../../data'
import { CustomError, RegisterUserDTO, UserEntity, type LoginUserDTO } from '../../domain'

export class AuthService {
  // DI
  constructor() {}

  public async registerUser(registerUserDTO: RegisterUserDTO) {
    const existsUser = await UserModel.findOne({
      email: registerUserDTO.email,
    })

    if (existsUser) throw CustomError.badRequest('Email already exists')

    try {
      const user = new UserModel(registerUserDTO)

      user.password = bcryptAdapter.hash(registerUserDTO.password)

      await user.save()
      // TODO: JWT token -> to keep user session

      // TODO: send confirmation email

      const { password, ...rest } = UserEntity.fromObject(user)

      return { user: { ...rest }, token: 'ABC123' }
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
}
