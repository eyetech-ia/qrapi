'use strict';
const Vehicle = use('App/Models/Ambient/Vehicle');
const DB = use('Database');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with vehicles
 */
class VehicleController {
  /**
   * Show a list of all vehicles.
   * GET vehicles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    //Substituir por auth.client_id
    let vehicle = await DB.table('vehicles').where('dweller_id', '1');
    if(!vehicle){
      return response.status(401).json({
        error : true,
        message : 'Sem Veiculos cadastrados!'
      });
    }
    return response.status(201).json(vehicle);
  }

  /**
   * Create/save a new vehicle.
   * POST vehicles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only([
      'placa',
      'apartment_id',
      'cor',
      'modelo',
      'status'
    ]);
    const vehicle = new Vehicle();
    vehicle.placa = data.placa;
    vehicle.apartament_id = data.apartment_id;
    vehicle.cor = data.cor;
    vehicle.modelo = data.modelo;
    vehicle.status = data.status;
    await vehicle.save();
    return response.status(201).json({success : true, message: 'Veículo adicionado com Sucesso!'});
  }

  /**
   * Display a single vehicle.
   * GET vehicles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const vehicle = await Vehicle.find(params.id);
    if(vehicle){
      return response.json(vehicle);
    } else {
      return response.status(401).json({
        error : true,
        message : "Veículo não cadastrado!"
      });
    }
  }


  /**
   * Update vehicle details.
   * PUT or PATCH vehicles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only([
      'placa',
      'apartment_id',
      'cor',
      'modelo',
      'status'
    ]);
    const vehicle = await Vehicle.find(params.id);
    if(vehicle) {
      return response.status(401).json({
        message : 'Morador não encontrado!'
      });
    }
    vehicle.placa = data.placa;
    vehicle.apartament_id = data.apartment_id;
    vehicle.cor = data.cor;
    vehicle.modelo = data.modelo;
    vehicle.status = data.status;
    await vehicle.save();
    return response.status(201).json({success : true, message: 'Veículo Atualizado com Sucesso!'});
  }

  /**
   * Delete a vehicle with id.
   * DELETE vehicles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const vehicle = await Vehicle.find(params.id);
    if(!vehicle) {
      return response.status(401).json({
        message : "Erro! não encontrado!"
      });
    }
    await vehicle.delete();
    return response.status(200).json({
      message : "Removido com sucesso!"
    });
  }
}

module.exports = VehicleController;
