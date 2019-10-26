'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TasksSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments();
      table.string('task_name').nullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TasksSchema
