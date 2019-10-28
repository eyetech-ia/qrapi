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

Route.get('/', () => {
  return {
    message: 'Welcome to EyeTech IA Api, access the application in host:' + env.get('APP_URL')
  }
});


Route.group(()=>{
  Route.resource('apartamentos', 'Ambient//ApartmentController');
  Route.resource('controle-de-acesso', 'Ambient//AccessControlController');
  Route.resource('cameras', 'Ambient//CameraController');
  Route.resource('moradores', 'Ambient//DwellerController');
  Route.resource('veiculos', 'Ambient//VehiclesController');
  Route.resource('visitantes', 'Ambient//VisitantsController');
  //Namespace Application
  Route.resource('clientes', 'Application//ClientController');
  Route.resource('dashboard', 'Application//DashboardController');
}).prefix('api');
