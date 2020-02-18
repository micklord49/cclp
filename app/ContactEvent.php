<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContactEvent extends Model
{
    //
    protected $fillable = [
        'guid', 'contact', 'event', 
    ];

}
