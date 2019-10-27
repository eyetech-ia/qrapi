'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientsSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments();
      table.string('nomeFantasia').notNullable();
      table.string('razaoSocial').notNullable();
      table.string('cnpj').notNullable;
      table.string('cep').notNullable;
      table.string('rua').notNullable;
      table.string('bairro').notNullable;
      table.string('cidade').notNullable;
      table.string('uf').notNullable;
      table.string('numero').notNullable;
      table.string('telefone').notNullable;
      table.string('emailContato').notNullable;
      table.string('emailFinanceiro').notNullable;
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientsSchema
