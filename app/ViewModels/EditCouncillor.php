<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\Councillor;

class EditCouncillor extends Model
{
    //

    public $guid;
    public $dn;
    public $brandAsCLP;
    public $active;
    public $campaign;
    public $menu;

    public function getguidAttribute()
    {
        return $this->guid;
    }
    public function getdnAttribute()
    {
        return $this->dn;
    }


    public function __construct($id)
    {
        $clpGuid = config('appsettings.clpGUID');
        $councillor = Councillor::where('owner',$id)->firstOrFail();

        $this->guid = $councillor->guid;
        $this->menu = new Menu($clpGuid);
    }



}
