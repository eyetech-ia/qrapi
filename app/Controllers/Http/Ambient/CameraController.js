'use strict';

const DB  = use('Database');
const Cameras = use('App/Models/Ambient/Camera');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cameras
 */
class CameraController {
  /**
   * Show a list of all cameras.
   * GET cameras
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    //Substituir por auth.client_id
    let cameras = await DB.table('cameras').where('client_id', '1');
    if(!cameras){
      return response.status(401).json({
        error : true,
        message : 'Sem Câmeras cadastradas!'
      });
    }
    return response.status(201).json(cameras);
  }

  /**
   * Create/save a new camera.
   * POST cameras
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only([
      'nome',
      'endereco',
      'qualidade',
      'porta',
      'status',
      'client_id'
    ]);
    const camera = new Cameras();
    camera.nome = data.nome;
    camera.endereco = data.endereco;
    camera.qualidade = data.qualidade;
    camera.porta = data.porta;
    camera.status = data.status;
    camera.client_id = data.client_id;
    await camera.save();
    return response.status(201).json({success : true, message: 'Câmera adicionada com Sucesso!'});
  }

  /**
   * Display a single camera.
   * GET cameras/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const camera = await Cameras.find(params.id);
    if(camera){
      return response.json(camera);
    } else {
      return response.status(401).json({
        error : true,
        message : "Câmera não encontrada!"
      });
    }
  }

  /**
   * Update camera details.
   * PUT or PATCH cameras/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only([
      'nome',
      'endereco',
      'qualidade',
      'porta',
      'status',
      'client_id'
    ]);
    const camera = await Cameras.find(params.id);
    if(!camera) {
      return response.status(401).json({
        message : 'Câmera não encontrada!'
      });
    }
    camera.nome = data.nome;
    camera.endereco = data.endereco;
    camera.qualidade = data.qualidade;
    camera.porta = data.porta;
    camera.status = data.status;
    camera.client_id = data.client_id;
    await camera.save();
    return response.status(201).json({success : true, message: 'Câmera alterada com Sucesso!'});
  }

  /**
   * Delete a camera with id.
   * DELETE cameras/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const camera = await Cameras.find(params.id);
    if(!camera) {
      return response.status(401).json({
        message : "Erro! não encontrada!"
      });
    }
    await camera.delete();
    return response.status(200).json({
      message : "Removido com sucesso!"
    });
  }
}

module.exports = CameraController
