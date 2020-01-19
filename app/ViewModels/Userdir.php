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
    public $image = "/images/defaultuser.png";


    protected $appends = ['clpGuid','name', 'image'];
    //protected $visible = ['clpGuid', 'name', 'image'];
 
    public function getclpGuidAttribute()
    {
        return $this->clpGuid;
    }

    public function getnameAttribute()
    {
        return $this->name;
    }

    public function getimageAttribute()
    {
        return $this->image;
    }

    function __construct($id)
    {
        $clpGuid = config('appsettings.clpGUID');
        $this->clpGuid = $clpGuid;

        $user = User::where('guid',$id)->first();

        $this->name = $user->name;

        $image = new ImageFile($user->guid);
        if($image->filename=="")
        {
            $this->image="/images/defaultuser.png";
        }
        else{
            $this->image = $image->filename;
        }


    }
}
