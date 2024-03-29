<?php

use App\ViewModels\Home;
use App\ViewModels\HomeCouncillors;
use App\ViewModels\HomeCandidate;
use App\ViewModels\Ec;
use App\ViewModels\HomeCampaigns;

use App\ViewModels\Managers\VisitManager;

use Spatie\Honeypot\ProtectAgainstSpam;


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
    VisitManager::visit($home->clpguid,"Index");
    return view('welcome',['Data' => $home]);
});

Route::get('/contactprivacy', function () {
    $home = new Home();
    VisitManager::visit($home->clpguid,"ContactPrivacy");
    return view('contactterms',['Data' => $home]);
});
Route::get('/contactservice', function () {
    $home = new Home();
    VisitManager::visit($home->clpguid,"ContactPrivacy");
    return view('contactserviceterms',['Data' => $home]);
});

Route::get('/councillors', function () {
    $home = new HomeCouncillors();
    VisitManager::visit($home->clpguid,"Councillors");
    return view('councillors',['Data' => $home]);
});

Route::get('/ourcandidate', function () {
    $home = new HomeCandidate();
    VisitManager::visit($home->clpguid,"Candidate");
    return view('candidate',['Data' => $home]);
});


Route::get('/committee', function () {
    $home = new Ec();
    VisitManager::visit($home->clpguid,"Committee");
    return view('committee',['Data' => $home]);
});
Route::get('/campaigns', function () {
    $home = new HomeCampaigns();
    VisitManager::visit($home->clpguid,"Campaigns");
    return view('campaigns',['Data' => $home]);
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
Route::resource('council', 'CouncilsController');
Route::resource('councillor', 'CouncillorController');
Route::resource('candidate', 'CandidateController');
Route::resource('wards', 'WardsController');
Route::resource('campaign', 'CampaignController');
Route::resource('blog', 'BlogController');
Route::resource('list', 'ListController');
Route::resource('event', 'EventController');
Route::resource('image', 'ImageController');
Route::resource('message', 'MessageController');
Route::resource('tag', 'TagController');
Route::resource('contacts', 'ContactsController');
Route::resource('survey', 'SurveyController');

Route::get('clpapi/wards', 'ClpController@warddir');
Route::get('clpapi/branches', 'ClpController@branchdir');
Route::get('clpapi/tags', 'ClpController@tags');

Route::get('clp/{user}/adduser', 'ClpController@adduser');
Route::get('clp/{user}/removeuser', 'ClpController@removeuser');
Route::patch('clp/{user}/addtag', 'ClpController@addtag');
Route::get('clp/{user}/removetag', 'ClpController@removetag');
Route::get('clp/{user}/tags', 'ClpController@tags');

Route::get('contacts/{perpage}/{page}/search', 'ContactsController@search');
Route::get('contacts/{owner}/{perpage}/{page}/listsearch', 'ContactsController@listsearch');
Route::get('contacts/{contact}/verify', 'ContactsController@verify');
Route::get('contacts/{contact}/{tag}/addtag', 'ContactsController@addtag');
Route::get('contacts/{contact}/{tag}/removetag', 'ContactsController@removetag');

Route::get('user/{id}', 'ProfileController@view');

Route::get('userdir/{perpage}/{page}/search', 'UserdirController@search');

Route::get('message/{owner}/{perpage}/{page}/search', 'MessageController@search');
Route::post('message/new/{owner}', 'MessageController@newmessage')->middleware(ProtectAgainstSpam::class);

Route::get('blog/{perpage}/{page}/{owner}/ownersearch', 'BlogController@ownersearch');
Route::patch('blog/', 'BlogController@store');

Route::get('survey/{perpage}/{page}/{owner}/ownersearch', 'SurveyController@ownersearch');
Route::get('survey/{perpage}/{page}/{owner}/resultsearch', 'SurveyController@resultsearch');
Route::get('survey/{owner}/ownerdir', 'SurveyController@ownerdir');
Route::get('survey/{owner}/items', 'SurveyController@items');
Route::get('survey/form/{survey}', 'SurveyController@showform');
Route::patch('survey/', 'SurveyController@store');
Route::patch('surveyitem/', 'SurveyController@newitem');
Route::patch('surveyitem/{guid}', 'SurveyController@saveitem');
Route::get('surveyitem/{guid}', 'SurveyController@getitem');
Route::post('survey/submit/{guid}', 'SurveyController@submit')->middleware(ProtectAgainstSpam::class);

Route::get('list/{perpage}/{page}/{owner}/ownersearch', 'ListController@ownersearch');
Route::post('list/{list}/sign', 'ListController@sign')->middleware(ProtectAgainstSpam::class);
Route::patch('list/', 'ListController@store');

Route::get('ec/{role}/{user}/adduser', 'ECController@addroleuser');
Route::get('ec/{role}/{user}/removeuser', 'ECController@removeroleuser');

Route::get('campaign/{owner}/dir', 'CampaignController@dir');
Route::get('campaign/{campaign}/editor', 'CampaignController@editor');
Route::get('campaign/{campaign}/{user}/adduser', 'CampaignController@adduser');
Route::get('campaign/{campaign}/{user}/removeuser', 'CampaignController@removeuser');
Route::get('campaign/{campaign}/{tag}/addtag', 'CampaignController@addtag');
Route::get('campaign/{campaign}/{tag}/removetag', 'CampaignController@removetag');

Route::get('event/{owner}/dir', 'EventController@dir');

Route::get('councils/dir/all', 'CouncilsController@dir');
Route::get('council/{council}/wards', 'CouncilsController@wards');
Route::get('council/{council}/infoedit', 'CouncilsController@infoedit');


Route::get('councillors/dir/all', 'CouncillorController@dir');
Route::get('councillors/{user}/adduser', 'CouncillorController@adduser');
Route::get('councillors/{user}/removeuser', 'CouncillorController@removeuser');
Route::get('councillors/{councillor}/{user}/addadminuser', 'CouncillorController@addadminuser');
Route::get('councillors/{councillor}/{user}/removeadminuser', 'CouncillorController@removeadminuser');
Route::get('councillors/{councillor}/infoedit', 'CouncillorController@infoedit');

Route::get('candidate/dir/all', 'CandidateController@dir');
Route::get('candidate/{user}/adduser', 'CandidateController@adduser');
Route::get('candidate/{user}/removeuser', 'CandidateController@removeuser');
Route::get('candidate/{candidate}/{user}/addadminuser', 'CandidateController@addadminuser');
Route::get('candidate/{candidate}/{user}/removeadminuser', 'CandidateController@removeadminuser');
Route::get('candidate/{candidate}/infoedit', 'CandidateController@infoedit');

Route::get('cpl/branch/{branch}', 'BranchController@showcplbranch');
Route::get('branch/dir/all', 'BranchController@dir');
Route::get('branch/{branch}/{user}/adduser', 'BranchController@adduser');
Route::get('branch/{branch}/{user}/addchair', 'BranchController@addchair');
Route::get('branch/{branch}/{user}/addsecretary', 'BranchController@addsecretary');
Route::get('branch/{branch}/{user}/addrep', 'BranchController@addrep');
Route::get('branch/{branch}/{user}/removeuser', 'BranchController@removeuser');

Route::post('image/{id}/changeimage', 'ImageController@changeimage');
Route::get('image/{id}/imagefile', 'ImageController@imagefile');
Route::get('image/{id}/image', 'ImageController@image');
Route::get('image/{id}/blur', 'ImageController@blur');
Route::get('image/{id}/aclock', 'ImageController@aclock');
Route::get('image/{id}/rclock', 'ImageController@rclock');
Route::get('image/{id}/delete', 'ImageController@delete');
Route::get('image/{id}/{x}/{y}/{w}/{h}/crop', 'ImageController@crop');

Route::get('social/load/{owner}', 'SocialController@load');
Route::post('social/save', 'SocialController@save');


Route::get('logout', 'Auth\LoginController@logout');
