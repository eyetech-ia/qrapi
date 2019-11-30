'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CameraSchema extends Schema {
  up () {
    this.create('cameras', (table) => {
      table.increments();
      table.string('nome').NotNullable;
      table.string('endereco').NotNullable;
      table.string('qualidade').NotNullable;
      table.string('porta').NotNullable;
      table.boolean('status').NotNullable;
      //Foreign Key
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
    this.drop('cameras')
  }
}

module.exports = CameraSchema;
