<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class LoginModel extends Model
{
    //

    public $name;
    public $guid;
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

        $this->guid = $clpGuid;
        $this->name = $clps[0]->name;
        $this->menu = new Menu($clpGuid);

        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
