'use strict';
const Client = use('App/Models/Application/Client');
const DB = use('Database');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clients
 */
class ClientController {
  /**
   * Show a list of all clients.
   * GET clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response, auth }) {
    //Substituir por auth.client_id
    let client = await DB.table('clients').where('id', '123456');
    if(!client){
      return response.status(401).json({
        error : true,
        message : 'Sem Clientes cadastrados!'
      });
    }
    return response.status(201).json(client);
  }

  /**
   * Create/save a new client.
   * POST clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only([
      'nomeFantasia',
      'razaoSocial',
      'cnpj',
      'cep',
      'rua',
      'bairro',
      'cidade',
      'uf',
      'numero',
      'telefone',
      'emailContato',
      'emailFinanceiro'
    ]);
    const client = new Client();
    client.nomeFantasia = data.nomeFantasia;
    client.razaoSocial = data.razaoSocial;
    client.cnpj = data.cnpj;
    client.cep = data.cep;
    client.rua = data.rua;
    client.bairro = data.bairro;
    client.cidade = data.cidade;
    client.uf = data.uf;
    client.numero = data.numero;
    client.telefone = data.telefone;
    client.emailContato = data.emailContato;
    client.emailFinanceiro = data.emailFinanceiro;
    await client.save();
    return response.status(201).json({success : true, message: 'Cliente adicionado com Sucesso!'});
  }

  /**
   * Display a single client.
   * GET clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
    const client = await Client.find(params.id);
    if(client){
      return response.json(client);
    } else {
      return response.status(401).json({
        error : true,
        message : "Cliente não cadastrado!"
      });
    }
  }


  /**
   * Update client details.
   * PUT or PATCH clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only([
      'nomeFantasia',
      'razaoSocial',
      'cnpj',
      'cep',
      'rua',
      'bairro',
      'cidade',
      'uf',
      'numero',
      'telefone',
      'emailContato',
      'emailFinanceiro'
    ]);

    const client = await Client.find(params.id);
    if(!client) {
      return response.status(401).json({
        message : 'Cliente não encontrado!'
      });
    }
    client.nomeFantasia = data.nomeFantasia;
    client.razaoSocial = data.razaoSocial;
    client.cnpj = data.cnpj;
    client.cep = data.cep;
    client.rua = data.rua;
    client.bairro = data.bairro;
    client.cidade = data.cidade;
    client.uf = data.uf;
    client.numero = data.numero;
    client.telefone = data.telefone;
    client.emailContato = data.emailContato;
    client.emailFinanceiro = data.emailFinanceiro;
    return response.status(201).json({success : true, message: 'Cliente Atualizado com Sucesso!'});
  }

  /**
   * Delete a client with id.
   * DELETE clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const client = await Client.find(params.id);
    if(!client) {
      return response.status(401).json({
        message : "Erro! não encontrado!"
      });
    }
    await client.delete();
    return response.status(200).json({
      message : "Removido com sucesso!"
    });
  }
}

module.exports = ClientController;
