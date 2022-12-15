import { defineConfig } from 'cypress'
import { Db, MongoClient } from 'mongodb'

const DB_NAME = 'users-management'
const MONGODB_URL = `mongodb://localhost:27017/${DB_NAME}`
let connection: MongoClient | null = null
let db: Db | null = null

const connectToDB = async () => {
  connection = await MongoClient.connect(MONGODB_URL)
  db = connection.db(DB_NAME)
}

connectToDB()

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        async clearUsers() {
          await db?.collection('users').deleteMany({})

          return null
        },

        async clearPosts() {
          await db?.collection('posts').deleteMany({})

          return null
        },

        async saveUsers(users) {
          await db?.collection('users').insertMany(users)

          return null
        },

        async savePosts(posts) {
          await db?.collection('posts').insertMany(posts)

          return null
        },
      })
    },
  },
  video: false,
})
