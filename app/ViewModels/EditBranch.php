<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\Branch;
use App\BranchAdministrator;

class EditBranch extends Model
{
    //

    public $guid;
    public $menu;

    public function getguidAttribute()
    {
        return $this->guid;
    }
    public function getdnAttribute()
    {
        return $this->dn;
    }


    public function __construct($branch,$user)
    {
        $clpGuid = config('appsettings.clpGUID');
        $br = Branch::where('guid',$branch)->firstOrFail();
        $admin = BranchAdministrator::where('user',$user)->where('branch',$branch)->firstOrFail();

        $this->guid = $br->guid;
        $this->menu = new Menu($clpGuid);
    }



}
