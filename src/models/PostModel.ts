import { Document, Schema, model } from 'mongoose'

import { User } from './UserModel'

export interface Post extends Document {
  title: string
  content: string
  user: User | number
}

const schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'UserModel' },
})

export const validatePostInputs = (postObj: any) => {
  const { title, content, user } = postObj
  const errorMessages: string[] = []

  if (!title) {
    errorMessages.push('Invalid title')
  }

  if (!content) {
    errorMessages.push('Invalid content')
  }

  if (!user) {
    errorMessages.push('No user associated to the post')
  }

  return errorMessages
}

export const PostModel = model('Post', schema)
