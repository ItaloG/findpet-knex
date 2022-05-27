// Update with your config settings.
import dotenv from 'dotenv'
import { resolve } from 'path'

const dotenvFilePath = resolve(__dirname, '..', '..', '..', '.env-development')
dotenv.config({ path: dotenvFilePath })
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    }
  }
}
