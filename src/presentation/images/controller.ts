import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export class ImagesController {
  getImage = (req: Request, res: Response) => {
    const { type = '', img = '' } = req.params

    const pathImg = path.resolve(__dirname, `../../../uploads/${type}/${img}`)

    console.log(pathImg);


    if (!fs.existsSync(pathImg)) {
      return res.status(404).json({ msg: 'image not found' })
    }

    return res.sendFile(pathImg)
  }
}