import { Knex } from 'knex'
import knexfile from '../knexfile'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('institutions', (table) => {
    table.text('type')
    table.text('cnpj').unique().notNullable()
    table.text('description')
    table.text('cellphone')
    table.text('telephone')
    table.text('lat')
    table.text('lng')
    table.integer('account_id').references('accounts.id').notNullable().onDelete('CASCADE')
    table.timestamps(true, true)
  }).then(() => knex.raw(knexfile.onUpdateTrigger('institutions')))
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('institutions')
}
