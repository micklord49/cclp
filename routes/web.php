<?php

use App\ViewModels\Home;
use App\ViewModels\Councillors;
use App\ViewModels\Ec;



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
Route::get('/councillors', function () {
    $home = new Councillors();
    return view('councillors',['Data' => $home]);
});
Route::get('/committee', function () {
    $home = new Ec();
    return view('committee',['Data' => $home]);
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/helptext/{id}', 'HelptextController');
Route::resource('clp', 'ClpController');
Route::resource('profile', 'ProfileController');
Route::resource('ec', 'ECController');
Route::resource('people', 'PeopleController');
Route::resource('userdir', 'UserdirController');
Route::resource('branch', 'BranchController');
Route::resource('councils', 'CouncilsController');
Route::resource('councillor', 'CouncillorController');
Route::resource('wards', 'WardsController');
Route::resource('campaign', 'CampaignController');
Route::resource('blog', 'BlogController');
Route::resource('image', 'ImageController');

Route::get('clpapi/wards', 'ClpController@warddir');

Route::get('user/{id}', 'ProfileController@view');

Route::get('userdir/{perpage}/{page}/search', 'UserdirController@search');

Route::get('blog/{perpage}/{page}/{owner}/ownersearch', 'BlogController@ownersearch');
Route::patch('blog/', 'BlogController@store');

Route::get('ec/{role}/{user}/adduser', 'ECController@addroleuser');
Route::get('ec/{role}/{user}/removeuser', 'ECController@removeroleuser');

Route::get('campaign/{campaign}/dir', 'CampaignController@dir');

Route::get('councils/dir/all', 'CouncilsController@dir');
Route::get('councils/{council}/wards', 'CouncilsController@wards');


Route::get('councillors/dir/all', 'CouncillorController@dir');
Route::get('councillors/{user}/adduser', 'CouncillorController@adduser');
Route::get('councillors/{user}/removeuser', 'CouncillorController@removeuser');

Route::get('cpl/branch/{branch}', 'BranchController@showcplbranch');
Route::get('branch/dir/all', 'BranchController@dir');
Route::get('branch/{branch}/{user}/adduser', 'BranchController@adduser');
Route::get('branch/{branch}/{user}/removeuser', 'BranchController@removeuser');

Route::post('image/{user}/changeimage', 'ImageController@changeimage');
Route::get('image/{user}/imagefile', 'ImageController@imagefile');
Route::get('image/{user}/image', 'ImageController@image');

Route::get('social/load/{owner}', 'SocialController@load');
Route::post('social/save', 'SocialController@save');


Route::get('logout', 'Auth\LoginController@logout');
