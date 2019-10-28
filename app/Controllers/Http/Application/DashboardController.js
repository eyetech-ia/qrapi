'use strict';
const Vehicles = use('App/Models/Ambient/Vehicle');
const Visitants = use('App/Models/Ambient/Visitant');
const AccessControl = use('App/Models/Ambient/AccessControl');
const Cameras = use('App/Models/Ambient/Camera');
const DB = use('Database');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with dashboards
 */
class DashboardController {
  /**
   * Show a list of all dashboards.
   * GET dashboards
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let data = await DB.select('*').from('cameras', 'vehicles', 'visitants').where('client_id', '1234');
    if(!data){
      return response.status(401).json(data)
    }
  }
}

module.exports = DashboardController;
