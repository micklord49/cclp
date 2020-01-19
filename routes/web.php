<?php

use App\ViewModels\Home;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $home = new Home();
    return view('welcome',['Data' => $home]);
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/helptext/{id}', 'HelptextController');
Route::resource('clp', 'ClpController');
Route::resource('profile', 'ProfileController');
Route::resource('ec', 'ECController');
Route::resource('people', 'PeopleController');
Route::resource('userdir', 'UserdirController');
Route::resource('councils', 'CouncilsController');
Route::resource('wards', 'WardsController');
Route::resource('image', 'ImageController');

Route::get('userdir/{perpage}/{page}/search', 'UserdirController@search');

Route::get('ec/{role}/{user}/adduser', 'ECController@addroleuser');
Route::get('ec/{role}/{user}/removeuser', 'ECController@removeroleuser');

Route::get('councils/dir/all', 'CouncilsController@dir');
Route::get('councils/{council}/wards', 'CouncilsController@wards');
Route::get('councils/{council}/wards', 'CouncilsController@wards');

Route::get('councillors/dir/all', 'CouncillorController@dir');
Route::get('councillors/{user}/adduser', 'CouncillorController@adduser');
Route::get('councillors/{user}/removeuser', 'CouncillorController@removeuser');

Route::get('profile/{user}/imagefile', 'ProfileController@imagefile');
Route::post('profile/{user}/changeimage', 'ProfileController@changeimage');


Route::get('logout', 'Auth\LoginController@logout');
