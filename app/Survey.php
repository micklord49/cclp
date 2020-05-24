<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    //
    public $incrementing = false;
    protected $primaryKey = 'guid';
    protected $keyType = 'string';

    protected $fillable = [
         'guid', 'owner', 'name'
    ];

}

