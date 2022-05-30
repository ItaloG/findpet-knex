import dotenv from 'dotenv'
import { resolve } from 'path'
import app from './config/app'
const dotenvFilePath = resolve(__dirname, '..', '..', '.env-development')
dotenv.config({ path: dotenvFilePath })

const port = process.env.PORT ?? '3000'
app.listen(port, () => {
  console.log(`Server listening -> http://127.0.0.1:${port}`)
})
