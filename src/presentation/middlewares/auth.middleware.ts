import type { NextFunction, Request, Response } from 'express'
import { JWTAdapter } from '../../config'
import { UserModel } from '../../data'
import { UserEntity } from '../../domain'

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization')

    if (!authorization) return res.status(401).json({ error: 'not token provided' })

    if (!authorization.startsWith('Bearer '))
      return res.status(401).json({ error: 'invalid Bearer token' })

    const token = authorization.split(' ').at(1) || ''

    try {
      const payload = await JWTAdapter.validateToken<{ id: string }>(token)
      if (!payload) return res.status(401).json({ error: 'invalid token' })

      const user = await UserModel.findById(payload.id)

      if (!user) return res.status(401).json({ error: 'invalid token - user' })

      // TODO: verify if the user is active
      // if(!user.isActive) res.status(401).json({error: 'user is not active'})

      req.body.user = UserEntity.fromObject(user)

      next()
    } catch (error) {
      console.log(error) // Better with a Logger like winston
      console.log(error) // Better with a Logger like winston
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
