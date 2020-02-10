<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BranchAdministrator extends Model
{
    //
    protected $fillable = [
        'guid', 'branch', 'user'
    ];

}
