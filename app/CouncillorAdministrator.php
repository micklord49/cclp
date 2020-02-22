<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CouncillorAdministrator extends Model
{
    //
    protected $fillable = [
        'councillor', 'guid', 'user',
    ];

}
