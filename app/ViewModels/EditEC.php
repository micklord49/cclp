<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

use App\User;
use App\Clprole;
use App\ClpRoleuser;

class EditEC extends Model
{
    //

    public $clpGuid = "UNDEFINED";
    public $roles = array();

    protected $appends = ['clpGuid','roles'];
    protected $visible = ['clpGuid', 'roles'];
 
    public function getclpGuidAttribute()
    {
        return $this->clpGuid;
    }

    public function getrolesAttribute()
    {
        return $this->roles;
    }


    function __construct()
    {
        $clpGuid = config('appsettings.clpGUID');
        $this->clpGuid = $clpGuid;

        Log::info('Retrieving roles for CLP '.$clpGuid);
        $roles = Clprole::where('clp',$clpGuid)->get();

        foreach($roles as $role)
        {
            $roleview = new \stdClass();
            $roleview->guid = $role->guid;
            $roleview->description = $role->description;
            $roleview->help = $role->help;
            $roleview->mandatory = $role->mandatory;
            $roleview->users = array();
            $users = ClpRoleuser::where('clprole',$role->guid)->get();
            foreach($users as $user)
            {
                $uview = new \stdClass();

                $u = User::where('guid',$user->user)->first();
                $uview->name = $u->name;
                $uview->guid = $u->guid;

                array_push($roleview->users,$uview);
            }
            $roleview->usercount = count($roleview->users);
            array_push($this->roles,$roleview);
        }
        Log::info('Retrieved '.count($this->roles).' roles for CLP '.$clpGuid);
    }
}
