import { Document, Schema, model } from 'mongoose'
import EmailValidator from 'email-validator'

export interface User extends Document {
  name: string
  email: string
  birthday: Date
}

const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  birthday: { type: Date, required: true },
})

export const validateUserInputs = (userObj: any) => {
  const { name, email, birthday } = userObj
  const errorMessages: string[] = []
  if (!name) {
    errorMessages.push('Invalid name')
  }

  if (!EmailValidator.validate(email)) {
    errorMessages.push('Invalid e-mail')
  }

  if (birthday.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const birthdayObj = new Date(birthday)
    if (birthdayObj >= new Date()) {
      errorMessages.push('Invalid birthday')
    }
  } else {
    errorMessages.push('Invalid birthday')
  }

  return errorMessages
}

export const UserModel = model<User>('User', schema)
