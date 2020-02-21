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
Route::resource('event', 'EventController');
Route::resource('image', 'ImageController');
Route::resource('message', 'MessageController');
Route::resource('tag', 'TagController');

Route::get('clpapi/wards', 'ClpController@warddir');

Route::get('clp/{user}/adduser', 'ClpController@adduser');
Route::get('clp/{user}/removeuser', 'ClpController@removeuser');
Route::patch('clp/{user}/addtag', 'ClpController@addtag');
Route::get('clp/{user}/removetag', 'ClpController@removetag');
Route::get('clp/{user}/tags', 'ClpController@tags');

Route::get('user/{id}', 'ProfileController@view');

Route::get('userdir/{perpage}/{page}/search', 'UserdirController@search');

Route::get('message/{owner}/{perpage}/{page}/search', 'MessageController@search');
Route::post('message/new/{owner}', 'MessageController@newmessage');

Route::get('blog/{perpage}/{page}/{owner}/ownersearch', 'BlogController@ownersearch');
Route::patch('blog/', 'BlogController@store');

Route::get('ec/{role}/{user}/adduser', 'ECController@addroleuser');
Route::get('ec/{role}/{user}/removeuser', 'ECController@removeroleuser');

Route::get('campaign/{owner}/dir', 'CampaignController@dir');
Route::get('campaign/{campaign}/{user}/adduser', 'CampaignController@adduser');
Route::get('campaign/{campaign}/{user}/removeuser', 'CampaignController@removeuser');
Route::get('campaign/{campaign}/{tag}/addtag', 'CampaignController@addtag');
Route::get('campaign/{campaign}/{tag}/removetag', 'CampaignController@removetag');

Route::get('event/{owner}/dir', 'EventController@dir');

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
