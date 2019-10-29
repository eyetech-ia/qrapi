'use strict';
const Apartments = use('App/Models/Ambient/Apartment');
const DB = use('Database');
const Validator = use('Validator');
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
  async index ({ response, auth }) {
    //Substituir por auth.client_id
    const apartments = await DB.table('apartments').where('client_id', 1);
    if(!apartments){
      return response.status(404).send({
        error : true,
        message : 'Sem dados Cadastrados para esse cliente!'
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
  async store ({ request, response, auth }) {
    try{
      let data  = request.only([
        'numero',
        'bloco',
        'telefone',
        'veiculos',
        'moradores',
        'client_id'
      ]);
      const apartment = new Apartments();
      apartment.numero = data.numero;
      apartment.bloco = data.bloco;
      apartment.telefone = data.telefone;
      apartment.moradores = data.moradores;
      apartment.veiculos = data.veiculos;
      apartment.client_id = data.client_id;
      await apartment.save();
      return response.status(201).send({success : true, message: 'Cadastrado com Sucesso!'});
    }catch (e) {
      return response.status(500).send({
        error : `Erro: ${e.message}`
      })
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
  async show ({ params, response }) {
    const apartment = await Apartments.find(params.id);
    if(!apartment){
      return response.status(404).send({
        message : 'Nenhum registro localizado!'
      })
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
  async update ({ params, request, response }) {
    const data = request.only([
      'numero',
      'bloco',
      'telefone',
      'veiculos',
      'moradores',
      'client_id',
      'condominium_id'
    ]);

    const apartment = await Apartments.find(params.id);
      if(!apartment) {
        return response.status(401).json({
          message : 'Apartamento não encontrado!'
        });
      }
      apartment.numero = data.numero;
      apartment.bloco = data.bloco;
      apartment.telefone = data.telefone;
      apartment.moradores = data.moradores;
      apartment.veiculos = data.veiculos;
      apartment.client_id = data.client_id;
      apartment.condominium_id = data.condominium_id;
    await apartment.save();
    return response.status(200).json({
      message : "Alterado com sucesso!"
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
  async destroy ({ params, request, response }) {
    const apartment = await Apartments.find(params.id);
    if(!apartment) {
      return response.status(401).send({
        message : "Erro! não encontrado!"
      });
    }
    await apartment.delete();
    return response.status(200).send({
      message : "Removido com sucesso!"
    });
  }
}

module.exports = ApartmentController;
