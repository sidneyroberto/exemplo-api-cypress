import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import { connectToMongoDB } from './config/db'

const doDbConnection = async () => {
  await connectToMongoDB()
}

doDbConnection()

export const app = express()
app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.use('/', (req, res) => res.send('Exemplo de testes de API com Cypress'))
