'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VehiclesSchema extends Schema {
  up () {
    this.create('vehicles', (table) => {
      table.increments();
      table.string('placa').notNullable();
      table.string('cor').notNullable();
      table.string('modelo').notNullable();
      table.string('status').default(true).notNullable();
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
      table.timestamps()
    })
  }

  down () {
    this.drop('vehicles')
  }
}

module.exports = VehiclesSchema
