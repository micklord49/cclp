<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ward extends Model
{
    //
    protected $fillable = [
        'clp', 'council', 'guid', 'name', 'about'
    ];

}
