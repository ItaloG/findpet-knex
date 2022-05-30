import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('accounts', (table) => {
    table.increments('id')
    table.text('email').unique().notNullable()
    table.text('name').notNullable()
    table.text('password').notNullable()
    table.text('role').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('accounts')
}
