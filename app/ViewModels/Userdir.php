<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

use App\User;
use App\Clprole;
use App\ClpRoleuser;

class Userdir extends Model
{
    //

    public $clpGuid = "UNDEFINED";
    public $name = 'Undefined';

    protected $appends = ['clpGuid','name'];
    //protected $visible = ['clpGuid', 'name'];
 
    public function getclpGuidAttribute()
    {
        return $this->clpGuid;
    }

    public function getnameAttribute()
    {
        return $this->name;
    }


    function __construct($id)
    {
        $clpGuid = config('appsettings.clpGUID');
        $this->clpGuid = $clpGuid;

        $user = User::where('guid',$id)->first();

        $this->name = $user->name;

    }
}
