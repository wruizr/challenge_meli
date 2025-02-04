import express, { Express } from 'express'
import cors from 'cors'
import router from './routes'
const app: Express = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${3000}`)
})
