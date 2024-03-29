<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\Clprole;

class EditClp extends Model
{
    //

    public $name;
    public $description;
    public $guid;
    public $msg;
    public $menu;

    public $roles;

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
        $this->description = $clps[0]->description;

        $this->menu = new Menu($clpGuid);

        $this->roles = DB::select('select * from clproles where clp=?',[$clpGuid]);

        //$this->indexUrl = action([PostsController::class, 'index']); 
    }



}
