'use strict';
const env = use('Env');
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const Env = use('Env');
const Event = use('Event');

Route.get('/', ({ response }) => {
  return response.redirect('/api')
});
Route.group(()=>{
  Route.get('/', () => {
    return {
      success: `Server running on ${Env.get('HOST')} in port: ${Env.get('PORT')}`
    }
  });
  Route.resource('apartamentos', 'Ambient//ApartmentController');
  Route.resource('controle-de-acesso', 'Ambient//AccessControlController');
  Route.resource('cameras', 'Ambient//CameraController');
  Route.resource('moradores', 'Ambient//DwellerController');
  Route.resource('veiculos', 'Ambient//VehiclesController');
  Route.resource('visitantes', 'Ambient//VisitantController');
  //Namespace Application
  Route.resource('clientes', 'Application//ClientController');
  Route.resource('dashboard', 'Application//DashboardController');
}).prefix('api');
