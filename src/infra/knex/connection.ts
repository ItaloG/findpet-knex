import knex from 'knex'
import knexConnection from './knexfile'

const env = 'development'
export const db = knex(knexConnection[env])
