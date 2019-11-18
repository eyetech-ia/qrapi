'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with registerentrances
 */
class RegisterEntranceController {
  /**
   * Show a list of all registerentrances.
   * GET registerentrances
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new registerentrance.
   * GET registerentrances/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
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
   * Create/save a new registerentrance.
   * POST registerentrances
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single registerentrance.
   * GET registerentrances/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing registerentrance.
   * GET registerentrances/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update registerentrance details.
   * PUT or PATCH registerentrances/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a registerentrance with id.
   * DELETE registerentrances/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = RegisterEntranceController
