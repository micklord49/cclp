<?php

namespace App\ViewModels;

use App\Councillor;
use App\User;
use App\Ward;
use App\Council;
use App\Social;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\ViewModels\ImageFile;
use App\ViewModels\Blogs;
use App\ViewModels\Managers\SocialManager;

class HomeCouncillors extends Model
{
    //

    public $name;
    public $description;
    public $guid;
    public $msg;
    public $menu;
    public $councillors = array();
    public $news;

    public function __construct()
    {
        $clpGuid = config('appsettings.clpGUID');
        $clps = DB::select('select * from cclps where guid=?',[$clpGuid]);
        if(count($clps) == 0)
        {
            $this->name = "Unknown CLP";
            $this->description = "Please complete the setup";
            return;
        }

        $this->clpguid = $clpGuid;
        $this->clpname = $clps[0]->name;
        $this->clpdescription = $clps[0]->description;
        $this->analytics = $clps[0]->analytics;

        $councillors = Councillor::where('clp',$clpGuid)->where('active',1)->get();
        foreach($councillors as $councillor)
        {
            $c = new class {};
            $usr = User::where('guid',$councillor->owner)->first();
            $c->name = $usr->name;
            $c->guid = $councillor->guid;
            $c->intro = $councillor->intro;

            SocialManager::owner($councillor->guid)->addlinks($c);

            $i = new ImageFile($c->guid);
            $c->image = $i->filename;

            $ward = Ward::where('guid',$councillor->ward)->first();
            $c->ward = $ward->name;

            $council = Council::where('guid',$ward->council)->first();
            $c->council = $council->name;

            array_push($this->councillors,$c);
        }

        $this->news = new Blogs($clpGuid,6,false,true,"CNR");

        $this->menu = new Menu($clpGuid);

        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
