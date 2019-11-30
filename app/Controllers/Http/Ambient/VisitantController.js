'use strict';
const Visitant = use('App/Models/Ambient/Visitant');
const Token = require('random-token');
const DB = use('Database');
const { validateAll } = use('Validator');
const SendMail = require('@sendgrid/mail');
const ENV = use('Env');
const code = require('qrcode');
const base64ToImage = require('base64-to-image');
const path = require('path');
const codePath = use('Helpers');
const Event = use('Event');
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
    //const apartments = await Apartment.query().where('client_id', 1);
    const visitant = await DB.table('visitants').where('client_id', 1);
    // const visitant = await Visitant.query().join('apartments', 'visitants.apartment_id', 'apartments.id').fetch();
    // const visitant = DB.select('*').from('visitants').join('apartments', 'visitants.apartment_id', 'apartments.id');
    if (!visitant) {
      return response.status(404).send({
        error: true,
        message: 'Sem dados Cadastrados para esse cliente!'
      });
    }
    return visitant;
  }

  /**
   * Create/save a new visitant.
   * POST visitants
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth, view }) {
    try {
      const messages = {
        'nome.required' : 'O Campo Nome é obirgatório',
        'telefone.required' :  'O Campo telefone é obrigatório',
        'apartment_id.required' :  'O Campo Apartamento é obrigatório',
        'visit_date.required' : 'O campo Data da Visita é obrigatório',
        'visit_expires.required' :  'O Campo Data Saída é Obrigatório'
      };

      const validation = await validateAll(request.all(), {
        nome : 'required',
        telefone : 'required',
        apartment_id : 'required',
        visit_date : 'required',
        visit_expires : 'required'
      }, messages);

      if(validation.fails()) {
        return response.status(401).send({
          message : validation.messages()
        });
      }

      const data = request.only([
        'nome',
        'telefone',
        'apartment_id',
        'client_id',
        'motorized',
        'visit_date',
        'visit_expires'
      ]);
      const user_token = Token(32);
      data.access_token = user_token;
      let qruser = await code.toDataURL(user_token);
      const optionalObj = { fileName : user_token, type : 'png'};
      base64ToImage(qruser, codePath.publicPath() + '/uploads/codes/', optionalObj);
      if(Visitant.create(data)) {
        await Visitant.create(data);

        Event.fire('new::visitant', data);
          // SendMail.setApiKey(ENV.get('SENDGRID_KEY'));
          // await SendMail.send({
          //   to : 'mesquitadev@gmail.com',
          //   from : 'noreply@eyetech.digital',
          //   subject : 'Confirmação da Visita',
          //   html : view.render('emails.welcome', {
          //     name : data.nome,
          //     token : user_token,
          //     date: data.visit_date,
          //     expires : data.visit_expires
          //   })
          // });
        return response.status(201).json({
          success : true, message: 'Visitante adicionado com Sucesso!'
        });

      }
    } catch (e) {
      return response.status(500).send({
        error: `Erro: ${e.message}`
      });
    }
  }
  async ValidateToken({ params, request, response }) {
    const visitantToken = await Visitant.findBy('access_token', params.token);
    if(visitantToken){
      visitantToken.active = true;
      await visitantToken.save();
      return 'Visita Confirmada!'
    } else {
      return response.status(401).json({
        error : true,
        message : "Dados Inválidos!"
      });
    }
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
