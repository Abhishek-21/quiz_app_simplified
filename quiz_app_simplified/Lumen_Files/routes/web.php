<?php


use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
// $router->get('/', function () use ($router) {
//     return $router->app->version();
// });


// Admin should use this path to maintain quiz elements

$router->post('/login', 'AdminLoginController@post');

// Admin get all privileges to manipulate categories from this path 

$router->get('/categories','QuizCategoriesController@get');

$router->post('/categories','QuizCategoriesController@post');

$router->put('/categories','QuizCategoriesController@update');

$router->delete('/categories','QuizCategoriesController@delete');

// Admin get all privileges to manipulate Topics from this path 


$router->get('/topic','QuizTopicsController@get');

$router->post('/topic','QuizTopicsController@post');

$router->put('/topic','QuizTopicsController@update');

$router->delete('/topic','QuizTopicsController@delete');

// Admin get all privileges to manipulate Questions from this path 


$router->get('/questions','QuizQuestionsController@get');

$router->post('/questions','QuizQuestionsController@post');

$router->put('/questions','QuizQuestionsController@update');

$router->delete('/questions','QuizQuestionsController@delete');

$router->get('/answers','QuizAnswerController@get');

$router->post('/answers','QuizAnswerController@post');

$router->put('/answers','QuizAnswerController@update');

$router->delete('/answers','QuizAnswerController@delete');

$router->get('/quiz','QuizController@get');


