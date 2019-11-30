'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class VisitantsSchema extends Schema {
  up () {
    this.create('visitants', (table) => {
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
      table
        .integer('vehicle_id')
        .unsigned()
        .references('id')
        .inTable('vehicles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.date('visit_date').nullable();
      table.date('visit_expires').nullable();
      table.boolean('motorized').notNullable();
      table.string('access_token').notNullable();
      table.boolean('active').default(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('visitants')
  }
}

module.exports = VisitantsSchema;
