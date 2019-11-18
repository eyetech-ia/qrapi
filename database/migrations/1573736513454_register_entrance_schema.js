'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RegisterEntranceSchema extends Schema {
  up () {
    this.create('register_entrances', (table) => {
      table.increments();
      table.timestamps()
    })
  }

  down () {
    this.drop('register_entrances')
  }
}

module.exports = RegisterEntranceSchema
