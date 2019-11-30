'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ApartmentsSchema extends Schema {
  up () {
    this.create('apartments', (table) => {
      table.increments();
      table.integer('numero').notNullable();
      table.string('bloco').notNullable();
      table.string('telefone').notNullable();
      table.string('veiculos').notNullable();
      table.string('moradores').notNullable();
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    })
  }

  down () {
    this.drop('apartments')
  }
}

module.exports = ApartmentsSchema
