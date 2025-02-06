import app from './app'
import { CONFIG } from './config'

const { PORT } = CONFIG

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
})