<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TagOwner extends Model
{
    //
    protected $fillable = [
        'tag', 'guid', 'owner',
    ];

}
