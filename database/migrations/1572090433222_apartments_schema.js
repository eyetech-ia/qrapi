'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ApartmentsSchema extends Schema {
  up () {
    this.create('apartments', (table) => {
      table.increments();
      table.integer('numero').nullable();
      table.string('bloco').nullable();
      table.string('telefone').nullable();
      table.string('veiculos').nullable();
      table.string('moradores').nullable();
      table.string('client_id').nullable();
      table.string('condominium_id').nullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('apartments')
  }
}

module.exports = ApartmentsSchema
