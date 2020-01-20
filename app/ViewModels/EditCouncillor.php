<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\Councilor;

class EditCouncillor extends Model
{
    //

    public $guid;
    public $dn;
    public $brandAsCLP;
    public $active;
    public $campaign;
    public $menu;


    public function __construct($id)
    {
        $clpGuid = config('appsettings.clpGUID');
        $councillor = Councilor::where('owner',$id)->first();

        if($councillor == null)
        {
            $this->guid = "";
            return;
        }
        $this->guid = $councillor->guid;
        $this->menu = new Menu($clpGuid);
    }



}
