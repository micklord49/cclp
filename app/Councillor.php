<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Councillor extends Model
{
    //
    protected $fillable = [
        'clp', 'guid', 'ward', 'owner'
    ];

    protected $attributes = [
        'dn' => '',
        'brandAsClp' => 1,
        'active' => false,
        'campaign' => false,
     ];


}
