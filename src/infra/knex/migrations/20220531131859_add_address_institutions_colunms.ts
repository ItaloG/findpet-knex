import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.alterTable('institutions', table => {
    table.text('cep').notNullable()
    table.text('city').notNullable()
    table.text('state').notNullable()
    table.text('number').notNullable()
    table.text('street').notNullable()
    table.text('complement')
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.alterTable('institutions', table => {
    table.dropColumn('cep')
    table.dropColumn('city')
    table.dropColumn('state')
    table.dropColumn('number')
    table.dropColumn('street')
    table.dropColumn('complement')
  })
}
