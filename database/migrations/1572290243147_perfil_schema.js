'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PerfilSchema extends Schema {
  up () {
    this.create('perfil', (table) => {
      table.increments();
      table.string('nome').notNullable();
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('level_id')
        .unsigned()
        .references('id')
        .inTable('levels')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('menu_id')
        .unsigned()
        .references('id')
        .inTable('menus')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.boolean('status').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('perfil')
  }
}

module.exports = PerfilSchema;
