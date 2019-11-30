'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientsSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments();
      table.string('nomeFantasia').nullable();
      table.string('razaoSocial').nullable();
      table.string('cnpj').nullable();
      table.string('cep').nullable();
      table.string('rua').nullable();
      table.string('bairro').nullable();
      table.string('cidade').nullable();
      table.string('uf').nullable();
      table.string('numero').nullable();
      table.string('telefone').nullable();
      table.string('emailContato').nullable();
      table.string('emailFinanceiro').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientsSchema;
