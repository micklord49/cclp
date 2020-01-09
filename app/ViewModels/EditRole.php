<?php

namespace App\ViewModels;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class EditView extends Model
{
    //
    public $clpGuid;

    public $roles;

    public function __construct($guid)
    {
        $clpGuid = config('appsettings.clpGUID');
        $this->clpGuid = $clpGuid;

        if(Auth::check())
        {
            $this->id = auth()->user()->id;
        }
        else {
            abort(404);
        }
    }

    public function roles(): Collection
    {

    }

}
