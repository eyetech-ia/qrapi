'use strict';
const Apartments = use('App/Models/Ambient/Apartment');
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
  async index ({ response }) {
    //Substituir por auth.client_id
    let apartments = await Apartments.findBy('client_id', '123456');
    if(!apartments){
      return response.status(401).json({
        error : true,
        message : 'Sem dados Cadastrados para esse cliente!'
      });
    }
    return response.status(201).json(apartments);
  }


  /**
   * Create/save a new apartment.
   * POST apartments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only([
      'numero',
      'bloco',
      'telefone',
      'veiculos',
      'moradores',
      'client_id',
      'condominium_id'
    ]);

    const apartment = new Apartments();
      //Params
      apartment.numero = data.numero;
      apartment.bloco = data.bloco;
      apartment.telefone = data.telefone;
      apartment.veiculos = data.veiculos;
      apartment.client_id = data.client_id;
      apartment.condominimum_id = data.condominimum_id;

    await apartment.save();
    return response.status(201).json({success : true, message: 'Cadastrado com Sucesso!'});
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
  async show ({ params, request, response }) {
    try {
      let apartment = await Apartments.findBy('id', params.id);
      return response.status(201).json(apartment);
    } catch (e) {
      return response.status(401).json({
        error : true,
        message : 'Apartamento não cadastrado!'
      });
    }
  }

  /**
   * Render a form to update an existing apartment.
   * GET apartments/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update apartment details.
   * PUT or PATCH apartments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a apartment with id.
   * DELETE apartments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ApartmentController
