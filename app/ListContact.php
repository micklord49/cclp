<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ListContact extends Model
{
    //
    protected $fillable = [
        'guid', 'contact', 'list',
    ];

}
