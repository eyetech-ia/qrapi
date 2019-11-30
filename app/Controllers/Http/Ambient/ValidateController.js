'use strict';
const DB = use('Database');
const Visitant = use('App/Models/Ambient/Visitant');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with validates
 */
class ValidateController {
  /**
   * Show a list of all validates.
   * GET validates
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, params }) {
    const token = params.token;
    return view.render('emails.welcome', {
      token : token
    });
  }

  /**
   * Render a form to be used for creating a new validate.
   * GET validates/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, params }) {

  }

  /**
   * Create/save a new validate.
   * POST validates
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, params }) {
      const tk = request.all();
      const visitantToken = await Visitant.findBy('access_token', tk.token);
      console.log(visitantToken);
      if(visitantToken){
        visitantToken.active = true;
        await visitantToken.save();
        return 'Visita Confirmada!'
      } else {
        return response.status(401).json({
          error : true,
          message : "Opa, Visita não encontrada!"
        });
    }
  }

  /**
   * Display a single validate.
   * GET validates/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing validate.
   * GET validates/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update validate details.
   * PUT or PATCH validates/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a validate with id.
   * DELETE validates/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ValidateController
