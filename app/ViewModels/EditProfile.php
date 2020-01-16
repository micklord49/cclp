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

    public function __construct($guid=null)
    {
        if($guid==null)
        {
            $clpGuid = config('appsettings.clpGUID');
            $this->guid = $clpGuid;
        }
        else
        {
            $this->guid = $guid;
        }
        $this->menu = new Menu($this->guid);
    }
}
