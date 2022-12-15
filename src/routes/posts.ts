import { Request, Response, Router } from 'express'
import EmailValidator from 'email-validator'

import { validatePostInputs, PostModel } from './../models/PostModel'

import PostController from '../controllers/PostController'
import UserController from '../controllers/UserController'

export const postRouter = Router()
const postCtrl = new PostController()
const userCtrl = new UserController()

postRouter.post('/', async (req: Request, res: Response) => {
  const errorMessages = validatePostInputs(req.body)

  if (errorMessages.length == 0) {
    const { title, content, user } = req.body
    const userFound = await userCtrl.findByEmail(user)
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
})

postRouter.get('/:userEmail', async (req: Request, res: Response) => {
  const { userEmail } = req.params

  if (EmailValidator.validate(userEmail)) {
    const userFound = await userCtrl.findByEmail(userEmail)
    if (userFound) {
      const posts = await postCtrl.findByUserId(userFound._id)
      return res.json({ posts })
    }

    return res.status(404).json({ message: 'User not found' })
  }

  return res.status(400).json({ message: 'Invalid e-mail' })
})
