<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Social extends Model
{
    //
    protected $fillable = [
        'owner', 'guid', 
        'facebook', 'youtube', 'twitter', 'instagram', 'tumblr',
    ];

    protected $attributes = [
        'facebook' => '',
        'youtube' => '',
        'twitter' => '',
        'instagram' => '',
        'tumblr' => '',
        
     ];

}
