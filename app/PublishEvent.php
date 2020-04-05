<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PublishEvent extends Model
{
    //
    protected $fillable = [
        'guid', 'owner', 'publishto', 'executeat', 'status', 'executed'
    ];

}
