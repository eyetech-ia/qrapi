'use strict';

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

Route.on('/').render('welcome');


Route.group(()=>{
  Route.resource('task', 'TaskController');
  Route.resource('apartamentos', 'Ambient//ApartmentController');
  Route.resource('controle-de-acesso', 'Ambient//AccessControlController');
}).prefix('api');
