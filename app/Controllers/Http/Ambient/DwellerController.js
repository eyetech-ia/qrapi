'use strict';
const Dweller = use('App/Models/Ambient/Dweller');
const DB = use('Database');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with dwellers
 */
class DwellerController {
  /**
   * Show a list of all dwellers.
   * GET dwellers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    //Substituir por auth.client_id
    let dweller = await DB.table('apartments').where('client_id', '123456');
    if(!dweller){
      return response.status(401).json({
        error : true,
        message : 'Sem Moradores cadastrados!'
      });
    }
    return response.status(201).json(dweller);
  }

  /**
   * Create/save a new dweller.
   * POST dwellers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only([
      'nome',
      'telefone',
      'apartment_id',
      'status'
    ]);
    const dweller = new Dweller();
    dweller.nome = data.nome;
    dweller.telefone = data.telefone;
    dweller.apartment_id = data.apartment_id;
    dweller.status = data.status;
    await dweller.save();
    return response.status(201).json({success : true, message: 'Morador adicionado com Sucesso!'});
  }

  /**
   * Display a single dweller.
   * GET dwellers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const dweller = await Dweller.find(params.id);
    if(dweller){
      return response.json(dweller);
    } else {
      return response.status(401).json({
        error : true,
        message : "Morador não cadastrado!"
      });
    }
  }

  /**
   * Update dweller details.
   * PUT or PATCH dwellers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only([
      'nome',
      'telefone',
      'apartment_id',
      'status'
    ]);
    const dweller = await Dweller.find(params.id);
    if(!dweller) {
      return response.status(401).json({
        message : 'Morador não encontrado!'
      });
    }
    dweller.nome = data.nome;
    dweller.telefone = data.telefone;
    dweller.apartment_id = data.apartment_id;
    dweller.status = data.status;
    await dweller.save();
    return response.status(201).json({success : true, message: 'Morador Atualizado com Sucesso!'});
  }

  /**
   * Delete a dweller with id.
   * DELETE dwellers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const dweller = await Dweller.find(params.id);
    if(!dweller) {
      return response.status(401).json({
        message : "Erro! não encontrado!"
      });
    }
    await dweller.delete();
    return response.status(200).json({
      message : "Removido com sucesso!"
    });
  }
}

module.exports = DwellerController
