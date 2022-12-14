import { User, UserModel } from '../models/UserModel'

export default class UserController {
  async findAll(): Promise<User[]> {
    const users = await UserModel.find()
    return users
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email })
    return user
  }
}
