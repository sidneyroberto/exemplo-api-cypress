import { app } from './app'

const port = Number(process.env.port) || 3000
app.listen(port, () => console.log(`App listening to port ${port}`))
