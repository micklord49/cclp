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

class Councillors extends Model
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

        $this->guid = $clpGuid;
        $this->clpname = $clps[0]->name;
        $this->clpdescription = $clps[0]->description;

        $councillors = Councillor::where('clp',$clpGuid)->where('active',1)->get();
        foreach($councillors as $councillor)
        {
            $c = new class {};
            $usr = User::where('guid',$councillor->owner)->first();
            $c->name = $usr->name;
            $c->guid = $councillor->guid;
            $c->intro = $councillor->intro;

            $social = Social::where('owner',$councillor->guid)->first();
            if($social != null)
            {
                $c->facebook = strtolower($social->facebook);                
                if(substr($c->facebook,0,4) != "http")
                {
                    $c->facebook = "https://".$c->facebook;
                }
            }

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
