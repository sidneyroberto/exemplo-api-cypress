import { Request, Response, Router } from 'express'

import { validateUserInputs } from './../models/UserModel'

import UserController from '../controllers/UserController'
import { UserModel } from '../models/UserModel'

export const userRouter = Router()
const userCtrl = new UserController()

userRouter.post('/', async (req: Request, res: Response) => {
  const errorMessages = validateUserInputs(req.body)

  if (errorMessages.length == 0) {
    const { name, email, birthday } = req.body

    const user = new UserModel({
      name,
      email,
      birthday: new Date(birthday),
    })

    await user.save()
    return res.status(201).json({ user })
  }

  // STATUS 400 -> BAD REQUEST
  return res.status(400).json({ errorMessages })
})

userRouter.get('/', async (req: Request, res: Response) => {
  const users = await userCtrl.findAll()
  return res.json({ users })
})
