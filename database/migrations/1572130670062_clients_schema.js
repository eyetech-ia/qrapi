'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientsSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments();
      table.string('nomeFantasia').nullable();
      table.string('razaoSocial').nullable();
      table.string('cnpj');
      table.string('cep');
      table.string('rua');
      table.string('bairro');
      table.string('cidade');
      table.string('uf');
      table.string('numero');
      table.string('telefone');
      table.string('emailContato');
      table.string('emailFinanceiro');
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientsSchema
