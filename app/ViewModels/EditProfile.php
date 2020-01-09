<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class EditProfile extends Model
{
    //

    public $id;
    public $guid;
    public $msg;
    public $menu;

    public $roles;

    public function __construct()
    {
        $clpGuid = config('appsettings.clpGUID');
        $this->guid = $clpGuid;
        $this->menu = new Menu($clpGuid);



    }
}
