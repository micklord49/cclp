<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Councilor extends Model
{
    //
    protected $fillable = [
        'clp', 'guid', 'ward', 'user'
    ];

    protected $attributes = [
        'dn' => '',
        'brandAsClp' => 1,
     ];


}
