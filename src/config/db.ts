import { connect } from 'mongoose'

export const connectToMongoDB = async () => {
  await connect('mongodb://localhost/users-management')
  console.log('App connected to MongoDB')
}
