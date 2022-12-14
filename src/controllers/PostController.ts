import { PostModel, validatePostInputs } from './../models/PostModel'

import { Post } from '../models/PostModel'
import { Request, Response } from 'express'
import UserController from './UserController'

export default class PostController {
  private _userCtrl: UserController

  constructor() {
    this._userCtrl = new UserController()
  }

  async save(req: Request, res: Response) {
    const errorMessages = validatePostInputs(req.body)

    if (errorMessages.length == 0) {
      const { title, content, user } = req.body
      const userFound = await this._userCtrl.findByEmail(user)
      if (userFound) {
        const post = new PostModel({
          title,
          content,
          user: userFound._id,
        })

        await post.save()
        return res.status(201).json({ post })
      }

      return res.status(403).json({ message: 'User not found' })
    }
    return res.status(400).json({ errorMessages })
  }

  async findByUserId(userId: number): Promise<Post[]> {
    const posts: Post[] = await PostModel.find({ user: userId })
    return posts
  }
}
