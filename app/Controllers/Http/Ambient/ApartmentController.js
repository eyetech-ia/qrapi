'use strict';

const Apartment = use('App/Models/Ambient/Apartment');
const DB = use('Database');
const { validateAll } = use('Validator');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with apartments
 */
class ApartmentController {
  /**
   * Show a list of all apartments.
   * GET apartments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({response, auth}) {
    //Substituir por auth.client_id
    //const apartments = await Apartment.query().where('client_id', 1);
    //const apartments = await DB.table('apartments').where('client_id', 1);
    const apartments = DB.select('numero', 'bloco', 'telefone', 'veiculos', 'moradores').from('apartments').where('client_id', 1);
    if (!apartments) {
      return response.status(404).send({
        error: true,
        message: 'Sem dados Cadastrados para esse cliente!'
      });
    }
    return apartments;
  }

  /**
   * Create/save a new apartment.
   * POST apartments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response, auth}) {
    try {
      //Validation Messages
      const messages = {
        'numero.required' : 'O Campo Número é obrigatório!',
        'bloco.required' : 'O Campo Bloco é obrigatório!',
        'telefone.required' : 'O Campo Telefone é obrigatório!',
        'moradores.required' : 'O Campo Moradores é obrigatório!',
      };
      //Validation Rules
      const validation = await validateAll(request.all(), {
        numero : 'required',
        bloco : 'required',
        telefone : 'required',
        moradores : 'required'
      }, messages);

      if(validation.fails()) {
        return response.status(401).send({
          message : validation.messages()
        });
      }

      //Request Objects
      let data = request.only([
        'numero',
        'bloco',
        'telefone',
        'veiculos',
        'moradores',
        'client_id'
      ]);

      if(Apartment.create(data)){
        await Apartment.create(data);
        return response.status(201).send({
          success: true,
          message: 'Cadastrado com Sucesso!'
        });
      }

    } catch (e) {
      return response.status(500).send({
        error: `Erro: ${e.message}`
      });
    }
  }

  /**
   * Display a single apartment.
   * GET apartments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({params, response, auth}) {
    //Change to auth.user.client_id on client_id where clause
    const apartment = await Apartment.query()
      .where('id', params.id)
      .where('client_id', 1)
      .first();
    //const apartment = await Apartments.find(params.id);
    if (!apartment) {
      return response.status(404).send({
        message: 'Registro não localizado!'
      });
    }
    return apartment;
  }

  /**
   * Update apartment details.
   * PUT or PATCH apartments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({params, request, response}) {
    const {numero, bloco, telefone, veiculos, moradores, client_id} = request.all();
    //Change to auth.user.client_id on client_id where clause
    const apartment = await Apartment.query()
      .where('id', params.id)
      .where('client_id', 1)
      .first();

    if (!apartment) {
      return response.status(401).json({
        message: 'Registro não encontrado!'
      });
    }
    apartment.numero = numero;
    apartment.bloco = bloco;
    apartment.telefone = telefone;
    apartment.moradores = moradores;
    apartment.veiculos = veiculos;
    apartment.client_id = client_id;
    await apartment.save();
    return response.status(200).json({
      message: "Alterado com sucesso!"
    });
  }

  /**
   * Delete a apartment with id.
   * DELETE apartments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({params, request, response}) {
    const apartment = await Apartment.query()
      .where('id', params.id)
      .where('client_id', 1)
      .first();
    if (!apartment) {
      return response.status(401).send({
        message: "Nenhum registro encontrado!"
      });
    }

    await apartment.delete();
    return response.status(200).send({
      message: "Removido com sucesso!"
    });
  }
}
module.exports = ApartmentController;
