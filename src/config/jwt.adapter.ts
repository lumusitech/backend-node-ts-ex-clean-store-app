import jwt from 'jsonwebtoken'
import { envs } from './envs'

const JWT_SEED = envs.JWT_SEED // hide dependency not recommended

export class JWTAdapter {
  // DI? if not needed, we not use constructor, we use static methods
  // In this case, we have a dependency on envs, so better do a constructor injection
  // and use methods that are not static

  static generateToken(payload: any, duration: string = '2h') {
    return new Promise(resolve => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null)

        resolve(token)
      })
    })
  }

  static validateToken(token: string) {
    throw new Error('not implemented')
  }
}
