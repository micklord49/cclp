<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ClpRoleuser extends Model
{
    //
    protected $fillable = [
        'clp', 'clprole', 'user',
    ];

}
