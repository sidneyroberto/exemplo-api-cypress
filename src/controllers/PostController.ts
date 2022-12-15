import { PostModel } from './../models/PostModel'

import { Post } from '../models/PostModel'

export default class PostController {
  async findByUserId(userId: number): Promise<Post[]> {
    const posts: Post[] = await PostModel.find({ user: userId })
    return posts
  }
}
