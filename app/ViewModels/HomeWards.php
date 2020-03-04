<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\Council;
use App\Ward;

class HomeWards extends Model
{
    //

    public $name;
    public $description;
    public $guid;
    public $msg;
    public $news;
    public $menu;

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
        $this->analytics = $clps[0]->analytics;

        $this->councils = Council::where('clp',$clpGuid)->orderBy('name','ASC')->get();
        foreach($this->councils as $council)
        {
            $council->wards = Ward::where('council',$council->guid)->orderBy('name','ASC')->get();
        }


        $this->menu = new Menu($clpGuid);



        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
