import { UserModel } from '../../data'
import { CustomError, RegisterUserDTO } from '../../domain'

export class AuthService {
  // DI
  constructor() {}

  public async registerUser(registerUserDTO: RegisterUserDTO) {
    const existsUser = await UserModel.findOne({
      email: registerUserDTO.email,
    })

    if (existsUser) throw CustomError.badRequest('Email already exists')

    return 'all ok'
  }
}
