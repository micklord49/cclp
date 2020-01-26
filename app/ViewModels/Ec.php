<?php

namespace App\ViewModels;

use App\Councillor;
use App\User;
use App\Ward;
use App\Council;
use App\Social;
use App\Clprole;
use App\ClpRoleuser;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\ViewModels\ImageFile;
use App\ViewModels\Blogs;

class Ec extends Model
{
    //

    public $name;
    public $description;
    public $guid;
    public $msg;
    public $menu;
    public $ec = array();
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

        $roles = Clprole::where('clp',$clpGuid)->orderBy('sortorder', 'ASC')->get();
        foreach($roles as $role)
        {
            $users = ClpRoleuser::where('clprole',$role->guid)->get();
            foreach($users as $user)
            {
                $usr = User::where('guid',$user->user)->first();
                $c = new class {};
                $c->name = $usr->name;
                $c->guid = $usr->guid;
                $c->subtitle = $role->description;
                $c->intro = $usr->intro;

                $social = Social::where('owner',$usr->guid)->first();
                if($social != null)
                {
                    $c->facebook = strtolower($social->facebook);                
                    if(substr($c->facebook,0,4) != "http")
                    {
                        $c->facebook = "https://".$c->facebook;
                    }
                }
    
                $i = new ImageFile($c->guid);
                if($i->filename == "")
                {
                    $c->image = "/images/defaultuser.png";
                }
                else
                {
                    $c->image = $i->filename;
                }

                array_push($this->ec,$c);
            }
        }

        $this->news = new Blogs($clpGuid,6,true,false);

        $this->menu = new Menu($clpGuid);

        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
