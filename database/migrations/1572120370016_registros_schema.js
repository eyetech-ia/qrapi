'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RegistrosSchema extends Schema {
  up () {
    this.create('registros', (table) => {
      table.increments();
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('registros')
  }
}

module.exports = RegistrosSchema;
