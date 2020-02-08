<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //
    protected $fillable = [
        'guid', 'title', 'subtitle', 'location', 'starttime', 'endtime', 'owner'
    ];


}
