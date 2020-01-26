<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Councillor extends Model
{
    //
    protected $fillable = [
        'clp', 'guid', 'ward', 'owner', 'intro'
    ];

    protected $attributes = [
        'dn' => '',
        'intro' => '',
        'brandAsClp' => 1,
        'active' => false,
        'campaign' => false,
     ];


}
