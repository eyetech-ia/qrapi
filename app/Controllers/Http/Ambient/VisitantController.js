'use strict';
const Visitant = use('App/Models/Ambient/Visitant');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with visitants
 */
class VisitantController {
  /**
   * Show a list of all visitants.
   * GET visitants
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    //Substituir por auth.client_id
    let visitant = await DB.table('visitants').where('dweller_id', '1');
    if(!visitant){
      return response.status(401).json({
        error : true,
        message : 'Sem Visitantes cadastrados!'
      });
    }
    return response.status(201).json(visitant);
  }

  /**
   * Create/save a new visitant.
   * POST visitants
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
      'client_id',
      'motorizado'
    ]);
    const visitant = new Visitant();
    visitant.nome = data.nome;
    visitant.telefone = data.telefone;
    visitant.apartment_id = data.apartment_id;
    visitant.client_id = data.client_id;
    visitant.motorizado = data.motorizado;
    await visitant.save();
    return response.status(201).json({success : true, message: 'Visitante adicionado com Sucesso!'});
  }

  /**
   * Display a single visitant.
   * GET visitants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
    const visitant = await Visitant.find(params.id);
    if(visitant){
      return response.json(visitant);
    } else {
      return response.status(401).json({
        error : true,
        message : "Visitante não cadastrado!"
      });
    }
  }

  /**
   * Update visitant details.
   * PUT or PATCH visitants/:id
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
      'client_id',
      'motorizado'
    ]);
    const visitant = await Visitant.find(params.id);
    if(visitant) {
      return response.status(401).json({
        message : 'Visitante não encontrado!'
      });
    }
    visitant.nome = data.nome;
    visitant.telefone = data.telefone;
    visitant.apartment_id = data.apartment_id;
    visitant.client_id = data.client_id;
    visitant.motorizado = data.motorizado;
    await visitant.save();
    return response.status(201).json({success : true, message: 'Visitante Atualizado com Sucesso!'});
  }

  /**
   * Delete a visitant with id.
   * DELETE visitants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const visitant = await Visitant.find(params.id);
    if(!visitant) {
      return response.status(401).json({
        message : "Erro! não encontrado!"
      });
    }
    await visitant.delete();
    return response.status(200).json({
      message : "Removido com sucesso!"
    });
  }
}

module.exports = VisitantController;
