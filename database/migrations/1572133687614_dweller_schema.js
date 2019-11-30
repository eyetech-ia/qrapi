'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DwellerSchema extends Schema {
  up () {
    this.create('dwellers', (table) => {
      table.increments();
      table.string('nome').notNullable();
      table.string('telefone').notNullable();
      table
        .integer('apartment_id')
        .unsigned()
        .references('id')
        .inTable('apartments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.boolean('status').default(true).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('dwellers')
  }
}

module.exports = DwellerSchema
