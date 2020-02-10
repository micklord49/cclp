<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    protected $fillable = [
        'clp', 'guid', 'name'
    ];

    //
    protected $attributes = [
        'ecofficer' => '',
        'email' => '',
     ];

}
